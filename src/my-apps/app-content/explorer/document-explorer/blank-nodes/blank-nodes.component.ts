import { Component, ElementRef, Input, Output, EventEmitter, SimpleChange, AfterViewInit, OnChanges } from "@angular/core";

import * as RDFNode from "carbonldp/RDF/RDFNode";
import * as Utils from "carbonldp/Utils";

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
	askingDeletionBlankNode:BlankNodeRow;

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
		this.initializeDeletionDimmer();
	}

	ngOnChanges( changes:{[propName:string]:SimpleChange} ):void {
		if( ( changes[ "blankNodes" ].currentValue !== changes[ "blankNodes" ].previousValue ) ) {
			console.log( this.blankNodes );
			this.openedBlankNodes = [];
			this.goToBlankNode( "all" );
			this.blankNodesRecords.clear();
		}
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

	closeBlankNode( blankNode:BlankNodeRow, index?:number ):void {
		// if( blankNode.added ) {
		// 	this.deleteBlankNode( blankNode, index );
		// 	delete blankNode.added;
		// } else {
		// 	delete blankNode.modified;
		// 	this.changeBlankNode( blankNode );
		// }
		this.openedBlankNodes.splice( index, 1 );
		this.goToBlankNode( "all" );
	}

	refreshTabs():void {
		this.nodesTab.find( ">.item" ).tab();
	}

	escape( value:string ):string {
		return value === "all" ? value : value.substr( value.indexOf( "_:" ) + 2 );
	}

	// Here comes the CRUD of blank nodes
	changeBlankNode( blankNodeRow:BlankNodeRow, index?:number ):void {
		if( typeof this.blankNodesRecords === "undefined" ) this.blankNodesRecords = new BlankNodesRecords();
		if( typeof blankNodeRow.modified !== "undefined" ) {
			this.blankNodesRecords.changes.set( blankNodeRow.modified[ "@id" ], blankNodeRow );
		} else if( typeof blankNodeRow.added === "undefined" ) {
			this.blankNodesRecords.changes.delete( blankNodeRow.copy[ "@id" ] );
		}
		this.onChanges.emit( this.blankNodesRecords );
	}

	deleteBlankNode( blankNodeRow:BlankNodeRow, index?:number ):void {
		if( typeof this.blankNodesRecords === "undefined" ) this.blankNodesRecords = new BlankNodesRecords();
		if( typeof blankNodeRow.added !== "undefined" ) {
			this.blankNodesRecords.additions.delete( blankNodeRow.added[ "@id" ] );
		} else if( typeof blankNodeRow.modified !== "undefined" ) {
			this.blankNodesRecords.changes.delete( blankNodeRow.modified[ "@id" ] );
			this.blankNodesRecords.deletions.set( blankNodeRow.modified[ "@id" ], blankNodeRow );
		} else {
			// this.blankNodesRecords.changes.delete( blankNodeRow.modified[ "@id" ] );
			this.blankNodesRecords.deletions.set( blankNodeRow.copy[ "@id" ], blankNodeRow );
		}
		index = this.blankNodes.indexOf( blankNodeRow );
		this.blankNodes.splice( index, 1 );
		this.onChanges.emit( this.blankNodesRecords );
	}

	createBlankNode():void {
		let id:string = "_:" + this.generateUUID(),
			bNodeIdentifier:string = this.generateUUID();
		let newBlankNode:BlankNodeRow = <BlankNodeRow>{
			id: id,
			bNodeIdentifier: bNodeIdentifier,
			added: {
				"@id": id,
				"https://carbonldp.com/ns/v1/platform#bNodeIdentifier": [ { "@value": bNodeIdentifier } ],
			}
		};
		this.blankNodes.splice( 0, 0, newBlankNode );
		this.blankNodesRecords.additions.set( id, newBlankNode );
		this.onChanges.emit( this.blankNodesRecords );
		this.openBlankNode( id );
	}

	generateUUID():string {
		return Utils.UUID.generate();
	}

	initializeDeletionDimmer():void {
		this.$element.find( ".confirm-deletion.dimmer" ).dimmer( { closable: false } );
	}

	askToConfirmDeletion( clickEvent:Event, blankNode:BlankNodeRow ):void {
		clickEvent.stopPropagation();
		this.askingDeletionBlankNode = blankNode;
		this.$element.find( ".confirm-deletion.dimmer" ).dimmer( "show" );
	}

	confirmDeletion():void {
		this.deleteBlankNode( this.askingDeletionBlankNode );
		this.$element.find( ".confirm-deletion.dimmer" ).dimmer( "hide" );
	}

	cancelDeletion():void {
		this.askingDeletionBlankNode = null;
		this.$element.find( ".confirm-deletion.dimmer" ).dimmer( "hide" );
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