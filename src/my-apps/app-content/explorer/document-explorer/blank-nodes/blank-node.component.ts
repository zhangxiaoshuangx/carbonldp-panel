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
	copyOrAdded:string = "";
	tempBlankNode:RDFNode.Class;
	tempProperties:PropertyRow[];
	tempPropertiesNames:string[] = [];
	private _bNodeHasChanged:boolean;
	set bNodeHasChanged( hasChanged:boolean ) {
		this._bNodeHasChanged = hasChanged;
		if( hasChanged && ! ! this.blankNode.copy ) {
			this.blankNode.modified = this.tempBlankNode;
		} else {
			delete this.blankNode.modified;
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
			this.copyOrAdded = typeof this.blankNode.copy !== "undefined" ? "copy" : "added";
			this.tempBlankNode = Object.assign( {}, this.blankNode[ this.copyOrAdded ] );
			this.tempPropertiesNames = this.getPropertiesNames();
			this.tempProperties = this.getProperties( this.tempPropertiesNames );
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

	getPropertiesNames():string[] {
		return Object.keys( this.tempBlankNode );
	}

	getProperties( propertiesNames:string[] ):PropertyRow[] {
		let tempProperties:PropertyRow[] = [];
		propertiesNames.forEach( ( propName:string )=> {
			tempProperties.push( <PropertyRow>{
				copy: <Property>{
					id: propName,
					name: propName,
					value: this.tempBlankNode[ propName ]
				}
			} );
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
		this.tempPropertiesNames = this.getPropertiesNames();
	}
}
export interface BlankNodeRow {
	id?:string;
	bNodeIdentifier?:string;
	copy?:RDFNode.Class;
	added?:RDFNode.Class;
	modified?:RDFNode.Class;
	deleted?:RDFNode.Class;
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