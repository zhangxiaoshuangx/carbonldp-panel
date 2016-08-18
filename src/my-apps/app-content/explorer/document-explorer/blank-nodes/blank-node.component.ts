import { Component, ElementRef, Input, Output, EventEmitter, AfterViewInit } from "@angular/core";

import * as RDFNode from "carbonldp/RDF/RDFNode";

import { PropertyComponent, Property, PropertyRow, Modes } from "./../property/property.component";

import $ from "jquery";
import "semantic-ui/semantic";

import template from "./blank-node.component.html!";

@Component( {
	selector: "cp-blank-node",
	template: template,
	styles: [ ":host { display:block; }" ],
	directives: [ PropertyComponent ],
} )

export class BlankNodeComponent implements AfterViewInit {

	element:ElementRef;
	$element:JQuery;
	modes:Modes = Modes;
	records:BlankNodeRecords;
	nonEditableProperties:string[] = [ "@id", "https://carbonldp.com/ns/v1/platform#bNodeIdentifier" ];
	copyOrAdded:string = "";
	tempPropertiesNames:string[] = [];

	rootNode:RDFNode.Class;
	properties:PropertyRow[];
	existingPropertiesNames:string[] = [];
	id:string;
	bNodeIdentifier:string;

	private _bNodeHasChanged:boolean;
	set bNodeHasChanged( hasChanged:boolean ) {
		this._bNodeHasChanged = hasChanged;
		if( ! hasChanged ) {
			delete this.blankNode.records;
			if( ! this.blankNode.added ) delete this.blankNode.modified;
		} else {
			this.blankNode.records = this.records;
			if( ! this.blankNode.added ) this.blankNode.modified = hasChanged;
		}
		this.onChanges.emit( this.blankNode );
	}

	get bNodeHasChanged() {
		return this._bNodeHasChanged;
	}

	@Input() blankNodes:BlankNodeRow[] = [];
	@Input() namedFragments:RDFNode.Class[] = [];
	@Input() canEdit:boolean = true;
	@Input() documentURI:string = "";
	// @Input() blankNode:BlankNodeRow;

	private _blankNode:BlankNodeRow;
	@Input() set blankNode( blankNode:BlankNodeRow ) {
		this._blankNode = blankNode;
		this.rootNode = blankNode.rootNode;
		if( ! ! blankNode.records ) this.records = blankNode.records;
		this.getProperties();
	}

	get blankNode():BlankNodeRow { return this._blankNode; }

	@Output() onOpenBNode:EventEmitter<string> = new EventEmitter<string>();
	@Output() onOpenNamedFragment:EventEmitter<string> = new EventEmitter<string>();
	@Output() onChanges:EventEmitter<BlankNodeRow> = new EventEmitter<BlankNodeRow>();


	constructor( element:ElementRef ) {
		this.element = element;
	}

	ngAfterViewInit():void {
		this.$element = $( this.element.nativeElement );
	}

	openBNode( id:string ):void {
		this.onOpenBNode.emit( id );
	}

	openNamedFragment( id:string ):void {
		this.onOpenNamedFragment.emit( id );
	}

	changeProperty( property:PropertyRow, index:number ):void {
		if( typeof this.records === "undefined" ) this.records = new BlankNodeRecords();
		if( typeof property.modified !== "undefined" ) {
			this.records.changes.set( property.modified.id, property );
		} else if( typeof property.added === "undefined" ) {
			this.records.changes.delete( property.copy.id );
		}
		if( typeof property.added !== "undefined" ) {
			this.records.additions.delete( property.added.id );
			property.added.id = property.added.name;
			this.records.additions.set( property.added.id, property );
		}
		this.updateExistingProperties();
	}

	deleteProperty( property:PropertyRow, index:number ):void {
		if( typeof this.records === "undefined" ) this.records = new BlankNodeRecords();
		if( typeof property.added !== "undefined" ) {
			this.records.additions.delete( property.added.id );
			this.properties.splice( index, 1 );
		} else if( typeof property.deleted !== "undefined" ) {
			this.records.deletions.set( property.deleted.id, property );
		}
		this.updateExistingProperties();
	}

	addProperty( property:PropertyRow, index:number ):void {
		if( typeof this.records === "undefined" ) this.records = new BlankNodeRecords();
		if( typeof property.added !== "undefined" ) {
			if( property.added.id === property.added.name ) {
				this.records.additions.set( property.added.id, property );
			} else {
				this.records.additions.delete( property.added.id );
				property.added.id = property.added.name;
				this.records.additions.set( property.added.name, property );
			}
		}
		this.updateExistingProperties();
	}

	createProperty( property:Property, propertyRow:PropertyRow ):void {
		let newProperty:PropertyRow = <PropertyRow>{
			added: <Property>{
				id: "",
				name: "http://www.example.com#New Property",
				value: []
			},
			isBeingCreated: true,
			isBeingModified: false,
			isBeingDeleted: false
		};
		this.properties.splice( 2, 0, newProperty );
		// Animates created property
		setTimeout( ()=> {
			let createdPropertyComponent:JQuery = this.$element.find( "cp-property.added-property" ).first();
			createdPropertyComponent.addClass( "transition hidden" );
			createdPropertyComponent.transition( { animation: "drop" } );
		} );
	}

	canEditProperty( property:PropertyRow ):boolean {
		let copyOrAdded:string = ! ! property.added ? "added" : "copy";
		return ( this.nonEditableProperties.indexOf( property[ copyOrAdded ].name ) === - 1 ) && this.canEdit;
	}

	getProperties():void {
		this.updateExistingProperties();
	}

	updateExistingProperties():void {
		this.properties = [];
		this.existingPropertiesNames = Object.keys( this.rootNode );
		this.existingPropertiesNames.forEach( ( propName:string )=> {
			this.properties.push( {
				copy: {
					id: propName,
					name: propName,
					value: this.rootNode[ propName ]
				}
			} );
		} );
		if( ! this.records ) return;
		this.records.additions.forEach( ( value, key )=> {
			this.existingPropertiesNames.push( key );
			this.properties.splice( 2, 0, value );
		} );
		let idx:number;
		this.records.changes.forEach( ( value, key )=> {
			if( value.modified.id !== value.modified.name ) {
				idx = this.existingPropertiesNames.indexOf( value.modified.id );
				if( idx !== - 1 ) this.existingPropertiesNames.splice( idx, 1, value.modified.name );
			}
			idx = this.properties.findIndex( ( property:PropertyRow )=> { return property.copy.id === key} );
			if( idx !== - 1 ) this.properties.splice( idx, 1, value );
		} );
		this.records.deletions.forEach( ( value, key )=> {
			idx = this.existingPropertiesNames.indexOf( key );
			if( idx !== - 1 ) this.existingPropertiesNames.splice( idx, 1 );

			idx = this.properties.findIndex( ( property:PropertyRow )=> { return property.copy.id === key} );
			if( idx !== - 1 ) this.properties.splice( idx, 1 );
		} );
		this.bNodeHasChanged = this.records.changes.size > 0 || this.records.additions.size > 0 || this.records.deletions.size > 0;
	}
}
export interface BlankNodeRow {
	id?:string;
	bNodeIdentifier?:string;

	added?:boolean;
	modified?:boolean;
	deleted?:boolean;

	rootNode?:RDFNode.Class;
	records?:BlankNodeRecords;
}
export class BlankNodeRecords {
	changes:Map<string,PropertyRow> = new Map<string, PropertyRow>();
	deletions:Map<string,PropertyRow> = new Map<string, PropertyRow>();
	additions:Map<string,PropertyRow> = new Map<string, PropertyRow>();
}

export default BlankNodeComponent;