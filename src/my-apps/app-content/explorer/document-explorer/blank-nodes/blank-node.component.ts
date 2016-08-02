import { Component, ElementRef, Input, Output, EventEmitter, AfterViewInit, SimpleChange, OnChanges } from "@angular/core";

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

export class BlankNodeComponent implements AfterViewInit, OnChanges {

	element:ElementRef;
	$element:JQuery;
	modes:Modes = Modes;
	records:BlankNodeRecords;
	copyOrModifiedOrAdded:string = "";
	tempBlankNode:BlankNodeRow;
	tempProperties:PropertyRow[];
	tempPropertiesNames:string[] = [];
	private _bNodeHasChanged:boolean;
	set bNodeHasChanged( hasChanged:boolean ) {
		this._bNodeHasChanged = hasChanged;
		if( hasChanged ) {
			if( ! ! this.blankNode.copy ) {
				this.blankNode.modified = this.tempBlankNode;
			} else {
				this.blankNode.added = this.tempBlankNode;
			}
			this.blankNode.records = this.records;
		} else {
			delete this.blankNode.modified;
			delete this.blankNode.added;
		}
		this.updateTempProperties();
		this.onChanges.emit( this.blankNode );
	}

	get bNodeHasChanged() {
		return this._bNodeHasChanged;
	}

	@Input() blankNodes:BlankNodeRow[] = [];
	@Input() namedFragments:RDFNode.Class[] = [];
	@Input() canEdit:boolean = true;
	@Input() documentURI:string = "";
	@Input() blankNode:BlankNodeRow;

	@Output() onOpenBNode:EventEmitter<string> = new EventEmitter<string>();
	@Output() onOpenNamedFragment:EventEmitter<string> = new EventEmitter<string>();
	@Output() onChanges:EventEmitter<BlankNodeRow> = new EventEmitter<BlankNodeRow>();


	constructor( element:ElementRef ) {
		this.element = element;
	}

	ngAfterViewInit():void {
		this.$element = $( this.element.nativeElement );
	}

	ngOnChanges( changes:{[propName:string]:SimpleChange} ):void {
		if( ( changes[ "blankNode" ].currentValue !== changes[ "blankNode" ].previousValue ) ) {
			console.log( "Blank Node: %o", this.blankNode );
			this.copyOrModifiedOrAdded = ! ! this.blankNode.copy ? ( ! ! this.blankNode.modified ? "modified" : "copy" ) : "added";
			if( ! ! this.blankNode.records ) this.records = this.blankNode.records;
			this.tempBlankNode = Object.assign( {}, this.blankNode[ this.copyOrModifiedOrAdded ] );
			this.tempPropertiesNames = Object.keys( this.tempBlankNode );
			this.tempProperties = this.getProperties( this.blankNode );
		}
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
		} else {
			this.records.changes.delete( property.copy.id );
		}
		this.bNodeHasChanged = this.records.changes.size > 0 || this.records.additions.size > 0 || this.records.deletions.size > 0;
	}

	deleteProperty( property:PropertyRow, index:number ):void {
		if( typeof this.records === "undefined" ) this.records = new BlankNodeRecords();
		if( typeof property.added !== "undefined" ) {
			this.records.additions.delete( property.added.id );
			this.tempProperties.splice( index, 1 );
		} else if( typeof property.deleted !== "undefined" ) {
			this.records.deletions.set( property.deleted.id, property );
		}
		this.bNodeHasChanged = this.records.changes.size > 0 || this.records.additions.size > 0 || this.records.deletions.size > 0;
	}

	addProperty( property:PropertyRow, index:number ):void {
		if( typeof this.records === "undefined" ) this.records = new BlankNodeRecords();
		if( typeof property.added !== "undefined" ) {
			if( property.added.id === property.added.name ) {
				this.records.additions.set( property.added.id, property );
			} else {
				this.records.additions.delete( property.added.id );
				this.records.additions.set( property.added.name, property );
			}
		}
		this.bNodeHasChanged = this.records.changes.size > 0 || this.records.additions.size > 0 || this.records.deletions.size > 0;
	}

	createProperty( property:Property, propertyRow:PropertyRow ):void {
		let newProperty:PropertyRow = <PropertyRow>{
			added: <Property>{
				id: "",
				name: "New Property",
				value: []
			}
		};
		this.tempProperties.splice( 1, 0, newProperty );
		if( ! ! this.$element ) setTimeout( ()=>this.$element.find( "cp-property.added-property" ).first().transition( "drop" ) );
	}

	getPropertiesNames( object:any ):string[] {
		let tempNames:string[] = Object.keys( object );
		// console.log( "Original without records: %o", tempNames );
		// if( ! this.records ) return tempNames;
		//
		// let idx:number;
		// this.records.deletions.forEach( ( property:PropertyRow, key:string )=> {
		// 	idx = tempNames.indexOf( key );
		// 	if( idx !== - 1 ) tempNames.splice( idx, 1 );
		// } );
		// this.records.changes.forEach( ( property:PropertyRow, key:string )=> {
		// 	idx = tempNames.indexOf( key );
		// 	if( idx !== - 1 ) tempNames.splice( idx, 1, property.modified[ "@id" ] );
		// } );
		// this.records.additions.forEach( ( property:PropertyRow, key:string )=> {
		// 	tempNames.splice( 0, 0, key );
		// } );
		// console.log( "Original with records: %o", tempNames );
		return tempNames;
	}

	getProperties( blankNode:BlankNodeRow ):PropertyRow[] {
		let tempProperties:PropertyRow[] = [],
			copyOrAdded:string = blankNode.added ? "added" : "copy";
		let propertiesNames:string[] = Object.keys( blankNode[ copyOrAdded ] );
		propertiesNames.forEach( ( propName:string )=> {
			tempProperties.push( <PropertyRow>{
				copy: <Property>{
					id: propName,
					name: propName,
					value: blankNode[ copyOrAdded ][ propName ]
				}
			} );
		} );


		if( ! this.records ) return tempProperties;
		let idx:number;
		this.records.deletions.forEach( ( property, key )=> {
			idx = tempProperties.findIndex( ( propertyRow:PropertyRow )=> { return propertyRow.copy.id === key;} );
			tempProperties.splice( idx, 1 );
		} );
		this.records.changes.forEach( ( property, key )=> {
			idx = tempProperties.findIndex( ( propertyRow:PropertyRow )=> { return propertyRow.copy.id === key;} );
			tempProperties.splice( idx, 1, property );
		} );
		this.records.additions.forEach( ( property, key )=> {
			tempProperties.splice( 0, 0, property );
		} );
		return tempProperties;
	}

	updateTempProperties():void {
		if( ! this.records ) return;
		this.records.deletions.forEach( ( property, key )=> {
			delete this.tempBlankNode[ key ];
		} );
		this.records.changes.forEach( ( property, key )=> {
			if( property.modified.id !== property.modified.name ) {
				delete this.tempBlankNode[ key ];
				this.tempBlankNode[ property.modified.name ] = property.modified.value;
			} else {
				this.tempBlankNode[ key ] = property.modified.value;
			}
		} );
		this.records.additions.forEach( ( property, key )=> {
			this.tempBlankNode[ key ] = property.added.value;
		} );
		this.tempPropertiesNames = Object.keys( this.tempBlankNode );
	}
}
export interface BlankNodeRow {
	id?:string;
	bNodeIdentifier?:string;
	copy?:RDFNode.Class;
	added?:RDFNode.Class;
	modified?:RDFNode.Class;
	deleted?:RDFNode.Class;
	records?:BlankNodeRecords;
}
export class BlankNode {
	id:string;
	properties:PropertyRow[];
}
export class BlankNodeRecords {
	changes:Map<string,PropertyRow> = new Map<string, PropertyRow>();
	deletions:Map<string,PropertyRow> = new Map<string, PropertyRow>();
	additions:Map<string,PropertyRow> = new Map<string, PropertyRow>();
}

export default BlankNodeComponent;