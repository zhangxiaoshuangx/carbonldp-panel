import { Component, ElementRef, Input, Output, EventEmitter, SimpleChange, AfterViewInit, OnChanges } from "@angular/core";

import * as RDFNode from "carbonldp/RDF/RDFNode";

import { BlankNodeComponent, BlankNode, BlankNodeRecords, BlankNodeRow } from "./blank-node.component"

import $ from "jquery";
import "semantic-ui/semantic";

import template from "./blank-nodes.component.html!";
import style from "./blank-nodes.component.css!text";

@Component( {
	selector: "cp-blank-nodes",
	template: template,
	styles: [ style ],
	directives: [ BlankNodeComponent ],
} )

export class BlankNodesComponent implements AfterViewInit, OnChanges {

	element:ElementRef;
	$element:JQuery;

	nodesTab:JQuery;
	openedBlankNodes:BlankNodeRow[] = [];
	blankNodesRecords:BlankNodesRecords = new BlankNodesRecords();

	@Input() blankNodes:BlankNodeRow[] = [];
	@Input() namedFragments:RDFNode.Class[] = [];
	@Input() documentURI:string = "";

	@Output() onChanges:EventEmitter<BlankNodesRecords> = new EventEmitter<BlankNodesRecords>();
	@Output() onOpenBNode:EventEmitter<string> = new EventEmitter<string>();
	@Output() onOpenNamedFragment:EventEmitter<string> = new EventEmitter<string>();

	constructor( element:ElementRef ) {
		this.element = element;
	}

	ngAfterViewInit():void {
		this.$element = $( this.element.nativeElement );
		this.nodesTab = this.$element.find( ".tabular.blank-nodes.menu" ).tab();
	}

	ngOnChanges( changes:{[propName:string]:SimpleChange} ):void {
		if( ( changes[ "blankNodes" ].currentValue !== changes[ "blankNodes" ].previousValue ) ) {
			console.log( this.blankNodes );
			this.openedBlankNodes = [];
			this.goToBlankNode( "all" );
			this.blankNodesRecords.clear();
		}
	}

	notifyBlankNodesHaveChanged() {
		// 	if( typeof records === "undefined" || records === null ) {
		// 		this.bNodesChanges.delete( bNode[ "@id" ] );
		// 		this.onChanges.emit( this.bNodesChanges );
		// 		return;
		// 	}
		// 	if( records.changes.size > 0 || records.additions.size > 0 || records.deletions.size > 0 ) {
		// 		this.bNodesChanges.set( bNode[ "@id" ], records );
		// 	} else {
		// 		this.bNodesChanges.delete( bNode[ "@id" ] );
		// 	}
		this.onChanges.emit( this.blankNodesRecords );
	}

	openBlankNode( nodeOrId:RDFNode.Class|string ):void {
		let node:BlankNodeRow;
		if( typeof nodeOrId === "string" ) {
			node = this.blankNodes.find( ( node )=> { return node.id === nodeOrId} );
		} else {
			node = nodeOrId;
		}
		if( this.openedBlankNodes.indexOf( node ) === - 1 ) this.openedBlankNodes.push( node );
		setTimeout( () => {
			this.refreshTabs();
			this.goToBlankNode( "blankNode_" + this.escape( node.id ) );
		}, 50 );
	}

	openNamedFragment( id:string ):void {
		this.onOpenNamedFragment.emit( id );
	}

	goToBlankNode( id:string ) {
		if( ! this.nodesTab ) return;
		this.nodesTab.find( "> [data-tab='" + id + "']" ).click();
		this.onOpenBNode.emit( "bNodes" );
	}

	closeBlankNode( bNode:RDFNode.Class ):void {
		let idx:number = this.openedBlankNodes.indexOf( bNode );
		this.openedBlankNodes.splice( idx, 1 );
		this.goToBlankNode( "all" );
		// if( this.bNodesChanges.has( bNode[ "@id" ] ) )this.notifyDocumentBNodeHasChanged( null, bNode );
	}

	refreshTabs():void {
		this.nodesTab.find( ">.item" ).tab();
	}

	escape( value:string ):string {
		return value === "all" ? value : value.substr( value.indexOf( "_:" ) + 2 );
	}

	// Here comes the CRUD of blank nodes
	changeBlankNode( blankNodeRow:BlankNodeRow, index:number ):void {
		if( typeof this.blankNodesRecords === "undefined" ) this.blankNodesRecords = new BlankNodesRecords();
		if( typeof blankNodeRow.modified !== "undefined" ) {
			this.blankNodesRecords.changes.set( blankNodeRow.modified[ "@id" ], blankNodeRow );
		} else {
			this.blankNodesRecords.changes.delete( blankNodeRow.copy[ "@id" ] );
		}
		this.notifyBlankNodesHaveChanged();
	}

	// deleteBlankNode( blankNodeRow:BlankNodeRow, index:number ):void {
	// 	if( typeof this.blankNodesRecords === "undefined" ) this.blankNodesRecords = new BlankNodeRecords();
	// 	if( typeof blankNodeRow.added !== "undefined" ) {
	// 		this.blankNodesRecords.additions.delete( blankNodeRow.added.id );
	// 		this.bNodes.splice( index, 1 );
	// 	} else if( typeof blankNodeRow.deleted !== "undefined" ) {
	// 		this.blankNodesRecords.deletions.set( blankNodeRow.deleted.id, blankNodeRow );
	// 	}
	// }
	//
	// addBlankNode( blankNodeRow:BlankNodeRow, index:number ):void {
	// 	if( typeof this.blankNodesRecords === "undefined" ) this.blankNodesRecords = new BlankNodeRecords();
	// 	if( typeof blankNodeRow.added !== "undefined" ) {
	// 		this.blankNodesRecords.additions.set( blankNodeRow.added[ "@id" ], blankNodeRow );
	// 	}
	// }
	//
	// createBlankNode( blankNode:BlankNodeRow, blankNodeRow:BlankNodeRow ):void {
	// 	let newBlankNode:BlankNodeRow = <BlankNodeRow>{
	// 		added: { "@id": "" }
	// 	};
	// 	this.blankNodes.splice( 0, 0, newBlankNode );
	// }


	updateExistingBlankNodes():void {
		// if( ! this.records ) return;
		// this.records.additions.forEach( ( value, key )=> {
		// 	this.existingProperties.push( key );
		// } );
		// this.records.changes.forEach( ( value, key )=> {
		// 	if( value.modified.id !== value.modified.name ) {
		// 		this.existingProperties.splice( this.existingProperties.indexOf( value.modified.id ), 1, value.modified.name );
		// 	}
		// } );
		// this.records.deletions.forEach( ( value, key )=> {
		// 	this.existingProperties.splice( this.existingProperties.indexOf( value.deleted.id ), 1 );
		// } );
	}

}

export class BlankNodesRecords {
	changes:Map<string,BlankNodeRow> = new Map<string, BlankNodeRow>();
	deletions:Map<string,BlankNodeRow> = new Map<string, BlankNodeRow>();
	additions:Map<string,BlankNodeRow> = new Map<string, BlankNodeRow>();

	clear():void {
		this.changes.clear();
		this.deletions.clear();
		this.additions.clear();
	}
}

export default BlankNodesComponent;