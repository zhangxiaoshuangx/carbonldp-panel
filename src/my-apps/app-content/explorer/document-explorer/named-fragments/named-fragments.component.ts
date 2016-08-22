import { Component, ElementRef, Input, Output, EventEmitter, SimpleChange, OnChanges, AfterViewInit } from "@angular/core";

import * as RDFNode from "carbonldp/RDF/RDFNode";
import * as URI from "carbonldp/RDF/URI";

import { NamedFragmentComponent, NamedFragmentRow } from "./named-fragment.component";
import { BlankNodeRow } from "./../blank-nodes/blank-node.component";

import $ from "jquery";
import "semantic-ui/semantic";

import template from "./named-fragments.component.html!";
import style from "./named-fragments.component.css!text";

@Component( {
	selector: "cp-named-fragments",
	template: template,
	styles: [ style ],
	directives: [ NamedFragmentComponent ],
} )

export class NamedFragmentsComponent implements AfterViewInit, OnChanges {

	element:ElementRef;
	$element:JQuery;

	nodesTab:JQuery;
	openedNamedFragments:NamedFragmentRow[] = [];
	namedFragmentsRecords:NamedFragmentsRecords = new NamedFragmentsRecords();
	askingDeletionNamedFragment:NamedFragmentRow;

	@Input() blankNodes:BlankNodeRow[] = [];
	@Input() namedFragments:NamedFragmentRow[] = [];
	@Input() documentURI:string = "";

	@Output() onChanges:EventEmitter<NamedFragmentsRecords> = new EventEmitter<NamedFragmentsRecords>();
	@Output() onOpenBlankNode:EventEmitter<string> = new EventEmitter<string>();
	@Output() onOpenNamedFragment:EventEmitter<string> = new EventEmitter<string>();

	constructor( element:ElementRef ) {
		this.element = element;
	}

	ngAfterViewInit():void {
		this.$element = $( this.element.nativeElement );
		this.nodesTab = this.$element.find( ".tabular.named-fragments.menu" ).tab();
		this.initializeDeletionDimmer();
	}

	ngOnChanges( changes:{[propName:string]:SimpleChange} ):void {
		if( ( changes[ "namedFragments" ].currentValue !== changes[ "namedFragments" ].previousValue ) ) {
			this.openedNamedFragments = [];
			this.goToNamedFragment( "all-namedFragments" );
			this.namedFragmentsRecords.clear();
		}
	}

	openNamedFragment( nodeOrId:NamedFragmentRow|string ):void {
		let node:NamedFragmentRow;
		if( typeof nodeOrId === "string" ) {
			node = this.namedFragments.find( ( node )=> { return node.id === nodeOrId} );
		} else {
			node = nodeOrId;
		}
		if( this.openedNamedFragments.indexOf( node ) === - 1 )this.openedNamedFragments.push( node );
		setTimeout( () => {
			this.refreshTabs();
			this.goToNamedFragment( "namedfragment_" + this.getNormalizedUri( node.id ) );
		}, 50 );
	}

	openBlankNode( id:string ):void {
		this.onOpenBlankNode.emit( id );
	}

	goToNamedFragment( id:string ) {
		if( ! this.nodesTab )
			return;
		this.nodesTab.find( "> [data-tab='" + id + "']" ).click();
		this.onOpenNamedFragment.emit( "namedFragments" );
	}

	closeNamedFragment( namedFragment:NamedFragmentRow, index?:number ):void {
		this.openedNamedFragments.splice( index, 1 );
		this.goToNamedFragment( "all-namedFragments" );
	}

	refreshTabs():void {
		this.nodesTab.find( ">.item" ).tab();
	}

	getNormalizedUri( uri:string ):string {
		return uri.replace( /[^\w\s]/gi, "" );
	}

	getSlug( uri:string ) {
		return URI.Util.getSlug( uri );
	}

	changeNamedFragment( namedFragmentRow:NamedFragmentRow, index?:number ):void {
		if( typeof this.namedFragmentsRecords === "undefined" ) this.namedFragmentsRecords = new NamedFragmentsRecords();
		if( typeof namedFragmentRow.modified !== "undefined" ) {
			this.namedFragmentsRecords.changes.set( namedFragmentRow.id, namedFragmentRow );
		} else if( typeof namedFragmentRow.added === "undefined" ) {
			this.namedFragmentsRecords.changes.delete( namedFragmentRow.id );
		}
		this.onChanges.emit( this.namedFragmentsRecords );
	}

	deleteNamedFragment( namedFragmentRow:NamedFragmentRow, index?:number ):void {
		if( typeof this.namedFragmentsRecords === "undefined" ) this.namedFragmentsRecords = new NamedFragmentsRecords();
		if( typeof namedFragmentRow.added !== "undefined" ) {
			this.namedFragmentsRecords.additions.delete( namedFragmentRow.id );
		} else if( typeof namedFragmentRow.modified !== "undefined" ) {
			this.namedFragmentsRecords.changes.delete( namedFragmentRow.id );
			this.namedFragmentsRecords.deletions.set( namedFragmentRow.id, namedFragmentRow );
		} else {
			// this.namedFragmentsRecords.changes.delete( namedFragmentRow.id );
			this.namedFragmentsRecords.deletions.set( namedFragmentRow.id, namedFragmentRow );
		}
		index = this.namedFragments.indexOf( namedFragmentRow );
		this.namedFragments.splice( index, 1 );
		this.onChanges.emit( this.namedFragmentsRecords );
	}

	createNamedFragment():void {
		let newlyFragments:NamedFragmentRow[] = this.namedFragments.filter( ( namedFragment:NamedFragmentRow ) => { return namedFragment.id === "http://www.example.com/ns#My-Fragment-Name" } );
		let id:string = "http://www.example.com/ns#My-Fragment-Name-" + (newlyFragments.length + 1);
		let newNamedFragment:NamedFragmentRow = <NamedFragmentRow>{
			id: id,
			copy: {
				"@id": id
			}
		};
		newNamedFragment.added = newNamedFragment.copy;
		this.namedFragments.splice( 0, 0, newNamedFragment );
		this.namedFragmentsRecords.additions.set( id, newNamedFragment );
		this.onChanges.emit( this.namedFragmentsRecords );
		this.openNamedFragment( id );
	}

	initializeDeletionDimmer():void {
		this.$element.find( ".confirm-deletion.dimmer" ).dimmer( { closable: false } );
	}

	askToConfirmDeletion( clickEvent:Event, blankNode:BlankNodeRow ):void {
		clickEvent.stopPropagation();
		this.askingDeletionNamedFragment = blankNode;
		this.$element.find( ".confirm-deletion.dimmer" ).dimmer( "show" );
	}

	confirmDeletion():void {
		this.deleteNamedFragment( this.askingDeletionNamedFragment );
		this.$element.find( ".confirm-deletion.dimmer" ).dimmer( "hide" );
	}

	cancelDeletion():void {
		this.askingDeletionNamedFragment = null;
		this.$element.find( ".confirm-deletion.dimmer" ).dimmer( "hide" );
	}

}

export class NamedFragmentsRecords {
	changes:Map<string,NamedFragmentRow> = new Map<string, NamedFragmentRow>();
	deletions:Map<string,NamedFragmentRow> = new Map<string, NamedFragmentRow>();
	additions:Map<string,NamedFragmentRow> = new Map<string, NamedFragmentRow>();

	clear():void {
		this.changes.clear();
		this.deletions.clear();
		this.additions.clear();
	}
}
export default NamedFragmentsComponent;