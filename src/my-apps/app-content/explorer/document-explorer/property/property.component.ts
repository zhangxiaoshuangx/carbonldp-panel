import { Component, ElementRef, Input, Output, EventEmitter, AfterViewInit, OnInit } from "@angular/core";
import { Control, AbstractControl, Validators } from '@angular/common';

import * as SDKRDFNode from "carbonldp/RDF/RDFNode";
import * as SDKLiteral from "carbonldp/RDF/Literal";
import * as URI from "carbonldp/RDF/URI";
import * as RDFNode from "carbonldp/RDF/RDFNode";
import * as Utils from "carbonldp/Utils";

import { LiteralsComponent } from "./../literals/literals.component";
import { LiteralRow } from "./../literals/literal.component";
import { PointersComponent } from "./../pointers/pointers.component";
import { PointerRow } from "./../pointers/pointer.component";
import { NamedFragmentRow } from "./../named-fragments/named-fragment.component";

import $ from "jquery";
import "semantic-ui/semantic";

import template from "./property.component.html!";
import style from "./property.component.css!text";

@Component( {
	selector: "cp-property",
	template: template,
	styles: [ style ],
	directives: [ LiteralsComponent, PointersComponent ],
	host: { "[class.has-changed]": "property.modified", "[class.deleted-property]": "property.deleted", "[class.added-property]": "property.added" },
} )

export class PropertyComponent implements AfterViewInit, OnInit {

	element:ElementRef;
	$element:JQuery;
	literals:LiteralRow[] = [];
	pointers:PointerRow[] = [];
	tempLiterals:LiteralRow[];
	tempPointers:PointerRow[];
	tempProperty:Property = <Property>{};
	copyOrAdded:string;
	existingFragments:string[] = [];

	id:string;
	name:string;
	value:any[]|string = [];

	addNewLiteral:EventEmitter<boolean> = new EventEmitter<boolean>();
	addNewPointer:EventEmitter<boolean> = new EventEmitter<boolean>();
	commonToken:string[] = [ "@id", "@type", "@value" ];
	modes:Modes = Modes;
	nameInput:AbstractControl = new Control( this.name, Validators.compose( [ Validators.required, this.nameValidator.bind( this ) ] ) );
	idInput:AbstractControl = new Control( this.value, Validators.compose( [ Validators.required, this.idValidator.bind( this ) ] ) );

	@Input() mode:string = Modes.READ;
	@Input() documentURI:string = "";
	@Input() bNodes:RDFNode.Class[] = [];
	@Input() namedFragments:NamedFragmentRow[] = [];
	@Input() isPartOfNamedFragment:boolean = false;
	@Input() canEdit:boolean = true;
	@Input() existingProperties:string[] = [];
	private _property:PropertyRow;
	@Input() set property( prop:PropertyRow ) {
		this.copyOrAdded = ! ! prop.copy ? (! ! prop.modified ? "modified" : "copy") : "added";
		this._property = prop;
		this.id = prop[ this.copyOrAdded ].id;
		this.tempProperty.id = prop[ this.copyOrAdded ].id;
		this.name = prop[ this.copyOrAdded ].name;
		this.tempProperty.name = prop[ this.copyOrAdded ].name;
		(<Control>this.nameInput).updateValue( this.name );
		if( Utils.isArray( prop[ this.copyOrAdded ].value ) ) {
			this.value = [];
			prop[ this.copyOrAdded ].value.forEach( ( literalOrRDFNode )=> { (<[]>this.value).push( Object.assign( literalOrRDFNode ) ) } )
		} else {
			this.value = prop[ this.copyOrAdded ].value;
			(<Control>this.idInput).updateValue( this.value );
		}
	}

	get property():PropertyRow { return this._property; }

	@Output() onGoToBlankNode:EventEmitter<string> = new EventEmitter<string>();
	@Output() onGoToNamedFragment:EventEmitter<string> = new EventEmitter<string>();
	@Output() onChangeProperty:EventEmitter<Property> = new EventEmitter<Property>();
	@Output() onDeleteProperty:EventEmitter<PropertyRow> = new EventEmitter<PropertyRow>();
	@Output() onDeleteNewProperty:EventEmitter<PropertyRow> = new EventEmitter<PropertyRow>();
	@Output() onSaveNewProperty:EventEmitter<PropertyRow> = new EventEmitter<PropertyRow>();
	@Output() onChangeNewProperty:EventEmitter<PropertyRow> = new EventEmitter<PropertyRow>();
	@Output() onRefreshDocument:EventEmitter<string> = new EventEmitter<string>();

	nameHasChanged:boolean = false;
	valueHasChanged:boolean = false;
	literalsHaveChanged:boolean = false;
	pointersHaveChanged:boolean = false;

	get propertyHasChanged():boolean { return this.nameHasChanged || this.valueHasChanged || this.literalsHaveChanged || this.pointersHaveChanged; }

	// TODO: Add @lists and @sets support
	constructor( element:ElementRef ) {
		this.element = element;
	}

	ngOnInit():void {
		if( Utils.isArray( this.value ) ) this.fillLiteralsAndPointers();
	}

	ngAfterViewInit():void {
		this.$element = $( this.element.nativeElement );
		this.initializeAccordions();
		this.initializePropertyButtons();
		this.initializeDeletionDimmer();
	}

	getDisplayName( uri:string ):string {
		if( this.commonToken.indexOf( uri ) > - 1 )return uri;
		if( URI.Util.hasFragment( uri ) )return this.unescape( this.getFragment( uri ) );
		return this.unescape( URI.Util.getSlug( uri ) );
	}

	getParentURI( uri:string ):string {
		let slug:string = this.getSlug( uri );
		return uri.substr( 0, uri.indexOf( slug ) );
	}

	getSlug( uri:string ) {
		return URI.Util.getSlug( uri );
	}

	getFragment( uri:string ):string {
		return URI.Util.getFragment( uri );
	}

	isArray( property:any ):boolean {
		return Utils.isArray( property );
	}

	isUrl( uri:string ):boolean {
		let r = /^(ftp|http|https):\/\/[^ "]+$/;
		return r.test( uri );
	}

	goToBNode( id:string ):void {
		this.onGoToBlankNode.emit( id );
	}

	goToNamedFragment( id:string ):void {
		this.onGoToNamedFragment.emit( id );
	}

	getTypeIcon( type:string ):string {
		switch( this.getDisplayName( type ) ) {
			case "RDFSource":
				return "file outline";
			case "Container":
				return "cubes";
			case "BasicContainer":
				return "cube";
			default:
				return "file excel outline";
		}
	}

	initializeAccordions():void {
		this.$element.find( ".ui.accordion" ).accordion();
	}

	initializePropertyButtons():void {
		this.$element.find( ".ui.options.dropdown.button" ).dropdown( {
			transition: "swing up"
		} );
	}

	initializeDeletionDimmer():void {
		this.$element.find( ".confirm-deletion.dimmer" ).dimmer( { closable: false } );
	}

	onEditName():void {
		this.mode = Modes.EDIT;
		(<Control>this.nameInput).updateValue( this.unescape( this.name ) );
	}

	onEditId():void {
		this.mode = Modes.EDIT;
		this.existingFragments = [];
		this.namedFragments.forEach( ( nameFragment:NamedFragmentRow ) => { this.existingFragments.push( nameFragment.name ); } );
		( <Control>this.idInput ).updateValue( this.unescape( this.value ) );
	}

	cancelDeletion():void {
		this.$element.find( ".confirm-deletion.dimmer" ).dimmer( "hide" );
	}

	cancelEdition():void {
		if( this.nameInput.valid ) {
			this.mode = Modes.READ;
			(<Control>this.nameInput).updateValue( this.name );
		}
	}

	cancelIdEdition():void {
		if( this.idInput.valid ) {
			this.mode = Modes.READ;
			(<Control>this.idInput).updateValue( this.value );
		}
	}

	askToConfirmDeletion():void {
		this.$element.find( ".confirm-deletion.dimmer" ).dimmer( "show" );
	}

	deleteProperty():void {
		if( typeof this.property.added !== "undefined" ) {
			this.onDeleteNewProperty.emit( this.property );
		} else {
			this.property.deleted = this.property.copy;
			this.onDeleteProperty.emit( this.property );
		}
	}

	save():void {
		this.checkForChangesOnName( this.sanitize( this.nameInput.value ) );
		this.mode = Modes.READ;
	}

	saveId():void {
		this.checkForChangesOnId( this.sanitize( this.idInput.value ) );
		this.mode = Modes.READ;
	}

	sanitize( value:string ):string {
		let sanitized:string = value;
		let slug:string = this.getSlug( value );
		let parts:string[] = value.split( slug );
		if( parts.length > 0 ) sanitized = parts[ 0 ] + this.escape( slug );
		return sanitized;
	}

	fillLiteralsAndPointers():void {
		this.literals = [];
		this.tempLiterals = [];
		this.pointers = [];
		this.tempPointers = [];
		if( typeof this.property.modifiedLiterals !== "undefined" ) {
			this.literals = this.property.modifiedLiterals;
			this.tempLiterals = this.property.modifiedLiterals;
		} else {
			this.property[ this.copyOrAdded ].value.forEach( ( literalOrRDFNode )=> {
				if( SDKLiteral.Factory.is( literalOrRDFNode ) ) {
					this.literals.push( <LiteralRow>{ copy: literalOrRDFNode } );
					this.tempLiterals.push( <LiteralRow>{ copy: literalOrRDFNode } );
				}
			} );
		}
		if( typeof this.property.modifiedPointers !== "undefined" ) {
			this.pointers = this.property.modifiedPointers;
			this.tempPointers = this.property.modifiedPointers;
		} else {
			this.property[ this.copyOrAdded ].value.forEach( ( literalOrRDFNode )=> {
				if( SDKRDFNode.Factory.is( literalOrRDFNode ) ) {
					this.pointers.push( <PointerRow>{ copy: literalOrRDFNode } );
					this.tempPointers.push( <PointerRow>{ copy: literalOrRDFNode } );
				}
			} );
		}
	}

	addLiteral():void {
		// Notify LiteralsComponent to add literal
		this.addNewLiteral.emit( true );
	}

	addPointer():void {
		// Notify PointersComponent to add pointer
		this.addNewPointer.emit( true );
	}

	checkForChangesOnName( newName:string ):void {
		this.name = newName;
		if( typeof this.name !== "undefined" && (this.name !== this.property[ this.copyOrAdded ].name || this.name !== this.tempProperty.name ) ) {
			this.tempProperty.name = this.name;
			this.changePropertyContent();
		}
	}

	checkForChangesOnId( newId:string ):void {
		this.value = newId;
		if( typeof this.value !== "undefined" && (this.value !== this.property[ this.copyOrAdded ].value || this.value !== this.tempProperty.value ) ) {
			this.tempProperty.value = this.value;
			this.changePropertyContent();
		}
	}

	checkForChangesOnLiterals( literals:LiteralRow[] ):void {
		this.tempLiterals = literals;
		this.changePropertyContent();
	}

	checkForChangesOnPointers( pointers:PointerRow[] ):void {
		this.tempPointers = pointers;
		this.changePropertyContent();
	}

	changePropertyContent():void {
		this.tempProperty.id = this.id;
		this.tempProperty.name = this.name;
		this.tempProperty.value = this.value;

		this.nameHasChanged = false;
		this.valueHasChanged = false;

		// Change name
		if( (! ! this.property.copy) ) {
			if( (this.tempProperty.name !== this.property.copy.name ) ) {
				this.property.modified = this.tempProperty;
				this.nameHasChanged = true;
			} else { this.nameHasChanged = false; }
		}

		// Change literals and pointers
		if( Utils.isArray( this.value ) ) {
			this.tempProperty.value = [];
			[].concat( this.tempLiterals ).concat( this.tempPointers ).forEach( ( literalOrPointerRow )=> {
				if( ! literalOrPointerRow.deleted ) this.tempProperty.value.push( ! ! literalOrPointerRow.added ? literalOrPointerRow.added : ! ! literalOrPointerRow.modified ? literalOrPointerRow.modified : literalOrPointerRow.copy );
			} );
			this.literalsHaveChanged = ! ! this.tempLiterals.find( ( literalRow )=> {return ! ! literalRow.modified || ! ! literalRow.added || ! ! literalRow.deleted } );
			this.pointersHaveChanged = ! ! this.tempPointers.find( ( pointerRow )=> {return ! ! pointerRow.modified || ! ! pointerRow.added || ! ! pointerRow.deleted } );

			if( this.literalsHaveChanged ) { this.property.modifiedLiterals = this.tempLiterals; }
			else { delete this.property.modifiedLiterals; }

			if( this.pointersHaveChanged ) { this.property.modifiedPointers = this.tempPointers; }
			else { delete this.property.modifiedPointers; }

		} else {

			// Change value because it is a single string
			if( (! ! this.property.copy) ) {
				if( (this.tempProperty.value !== this.property.copy.value ) ) {
					this.property.modified = this.tempProperty;
					this.valueHasChanged = true;
				} else { this.valueHasChanged = false; }
			}
		}

		this.property.isBeingCreated = false;

		if( ! ! this.property.copy ) {
			if( this.propertyHasChanged ) this.property.modified = this.tempProperty;
			else delete this.property.modified;
			this.onChangeProperty.emit( this.tempProperty );
		} else if( ! ! this.property.added ) {
			if( (this.tempProperty.name !== this.property.added.name ) ) {
				this.id = this.name;
				// this.tempProperty.id = this.id;
			}
			this.property.added = this.tempProperty;
			if( this.existingProperties.indexOf( this.tempProperty.id ) === - 1 )
				this.onSaveNewProperty.emit( this.tempProperty );
			else
				this.onChangeNewProperty.emit( this.tempProperty );
		}
	}

	private refreshDocument():void {
		this.onRefreshDocument.emit( this.documentURI );
	}

	private escape( uri:string ):string {
		return encodeURI( uri );
	}

	private unescape( uri:string ):string {
		return decodeURI( uri );
	}

	private nameValidator( control:AbstractControl ):any {
		if( ! ! control ) {
			if( typeof control.value === "undefined" || control.value === null || ! control.value ) return null;
			if( this.existingProperties.indexOf( control.value ) !== - 1 && (this.property.added ? this.id !== control.value : this.name !== control.value) ) return { "duplicatedPropertyName": true };
			let url = new RegExp( "(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})", "g" );
			if( ! url.test( control.value ) ) return { "invalidName": true };
			if( control.value.split( "#" ).length > 2 ) return { "duplicatedHashtag": true };
		}
		return null;
	}

	private idValidator( control:AbstractControl ):any {
		if( ! ! control ) {
			if( typeof control.value === "undefined" || control.value === null || ! control.value ) return null;
			if( typeof control.value === "string" && ! control.value.startsWith( this.documentURI ) ) return { "invalidParent": true };
			if( this.existingFragments.indexOf( control.value ) !== - 1 && (this.property.added ? this.id !== control.value : this.value !== control.value) ) return { "duplicatedNamedFragmentName": true };
			let url = new RegExp( "(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})", "g" );
			if( ! url.test( control.value ) ) return { "invalidValue": true };
			if( control.value.split( "#" ).length > 2 ) return { "duplicatedHashtag": true };
		}
		return null;
	}
}

export interface PropertyRow {
	copy?:any;
	added?:any;
	modified?:any;
	deleted?:any;

	isBeingCreated?:boolean;
	isBeingModified?:boolean;
	isBeingDeleted?:boolean;

	modifiedLiterals?:LiteralRow[];
	modifiedPointers?:PointerRow[];
}
export interface Property {
	id:string;
	name:string;
	value:any;
}

export class Modes {
	static EDIT:string = "EDIT";
	static READ:string = "READ";
}

export default PropertyComponent;
