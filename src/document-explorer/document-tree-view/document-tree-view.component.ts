import { Component, ElementRef, Input, Output, EventEmitter, AfterViewInit, OnInit } from "@angular/core";

import * as Pointer from "carbonldp/Pointer";
import * as PersistedDocument from "carbonldp/PersistedDocument";
import * as HTTP from "carbonldp/HTTP";
import * as URI from "carbonldp/RDF/URI";
import * as SDKContext from "carbonldp/SDKContext";

import $ from "jquery";
import "semantic-ui/semantic";

import "jstree/dist/jstree.min";

import template from "./document-tree-view.component.html!";
import style from "./document-tree-view.component.css!text";

@Component( {
	selector: "cp-document-treeview",
	template: template,
	styles: [ style ],
} )

export class DocumentTreeViewComponent implements AfterViewInit, OnInit {
	element:ElementRef;
	$element:JQuery;

	jsTree:JSTree;
	$tree:JQuery;
	nodeChildren:JSTreeNode[] = [];

	@Input() documentContext:SDKContext.Class;
	@Input() refreshNode:EventEmitter<string> = new EventEmitter<string>();
	@Input() openNode:EventEmitter<string> = new EventEmitter<string>();
	@Output() onResolveUri:EventEmitter<string> = new EventEmitter<string>();
	@Output() onError:EventEmitter<HTTP.Errors.Error> = new EventEmitter<HTTP.Errors.Error>();
	@Output() onLoadingDocument:EventEmitter<boolean> = new EventEmitter<boolean>();

	constructor( element:ElementRef ) {
		this.element = element;
	}

	ngOnInit():void {
		let alreadyImported:boolean = document.querySelectorAll( "head [href='assets/node_modules/jstree/dist/themes/default/style.min.css']" ).length > 0;
		if( alreadyImported ) return;
		let link:HTMLLinkElement = document.createElement( "link" );
		link.rel = "stylesheet";
		link.href = "assets/node_modules/jstree/dist/themes/default/style.min.css";
		let head:Element = document.querySelector( "head" );
		head.appendChild( link );
	}

	ngAfterViewInit():void {
		this.$element = $( this.element.nativeElement );
		this.$tree = this.$element.find( ".document.treeview" );
		this.onLoadingDocument.emit( true );
		this.getDocumentTree().then( ()=> {
			this.onLoadingDocument.emit( false );
		} );
		this.refreshNode.subscribe( ( nodeId:string )=> {
			this.jsTree.deselect_node( nodeId );
			this.jsTree.select_node( nodeId );
		} );
		this.openNode.subscribe( ( nodeId:string )=> {
			this.jsTree.select_node( nodeId );
		} );
	}

	getDocumentTree():Promise<PersistedDocument.Class> {
		return this.documentContext.documents.get( "" ).then( ( [ resolvedRoot, response ]:[ PersistedDocument.Class, HTTP.Response.Class ] ) => {
			return resolvedRoot.refresh();
		} ).then( ( [updatedRoot, updatedResponse]:[PersistedDocument.Class, HTTP.Response.Class] ) => {
			this.nodeChildren.push( this.buildNode( this.documentContext.getBaseURI() ) );
			this.renderTree();
		} ).catch( ( error:HTTP.Errors.Error ) => {
			console.error( error );
			this.onError.emit( error );
		} );
	}

	buildNode( uri:string, isAccessPoint?:boolean ):JSTreeNode {
		let node:JSTreeNode = {
			id: uri,
			text: this.getSlug( uri ),
			state: { "opened": false },
			children: [
				{ "text": "Loading...", },
			],
			data: {},
		};
		if( isAccessPoint ) node.type = "accesspoint";
		return node;
	}

	renderTree():void {
		this.jsTree = this.$tree.jstree( {
			"core": {
				"data": this.nodeChildren,
				"check_callback": true,
				"multiple": false,
			},
			"types": {
				"default": {
					"icon": "file outline icon",
				},
				"loading": {
					"icon": "spinner loading icon",
				},
				"accesspoint": {
					"icon": "selected radio icon",
					"a_attr": {
						"class": "accesspoint",
						"title": "The element is an AccessPoint, not a direct child of the selected document."
					}
				}
			},
			"plugins": [ "types", "wholerow" ],
		} ).jstree( true );
		this.$tree.on( "before_open.jstree", ( e:Event, data:any ):void => {
			let parentId:any = data.node.id;
			let parentNode:any = data.node;
			let position:string = "last";
			this.onBeforeOpenNode( parentId, parentNode, position );
		} );
		this.$tree.on( "select_node.jstree", ( e:Event, data:any ):void => {} );
		this.$tree.on( "loaded.jstree", ()=> {
			this.jsTree.select_node( this.nodeChildren[ 0 ].id );
			if( this.nodeChildren && this.nodeChildren.length > 0 ) {
				this.onResolveUri.emit( <string>this.nodeChildren[ 0 ].id );
			}
		} );
		this.$tree.on( "dblclick.jstree", ".jstree-anchor", ( e:Event ) => {
			let node:JSTreeNode = this.jsTree.get_node( e.target );
			let parentId:any = node.id;
			let parentNode:any = node;
			let position:string = "last";
			this.onChange( parentId, parentNode, position );
		} );
		this.$tree.on( "dblclick.jstree", ".jstree-wholerow", ( e:Event ) => {
			e.stopImmediatePropagation();
			let tmpEvt:JQueryEventObject = $.Event( "dblclick" );
			$( e.currentTarget ).closest( ".jstree-node" ).children( ".jstree-anchor" ).first().trigger( tmpEvt ).focus();
		} );
	}

	onBeforeOpenNode( parentId:string, parentNode:any, position:string ):void {
		let oldIcon:string = parentNode.icon;

		this.jsTree.set_icon( parentNode, this.jsTree.settings.types.loading.icon );
		this.getNodeChildren( parentNode.id ).then( ( children:any[] ):void => {
			this.emptyNode( parentId );
			if( children.length > 0 ) {
				children.forEach( ( childNode:any ) => this.addChild( parentId, childNode, position ) );
			}
		} ).then( () => {
			this.jsTree.set_icon( parentNode, oldIcon );
		} );
	}

	onChange( parentId:string, node:any, position:string ):void {
		if( this.jsTree.is_open( node ) ) {
			this.onBeforeOpenNode( parentId, node, position );
		} else {
			this.jsTree.open_node( node );
		}
		this.onResolveUri.emit( node.id );
	}

	addChild( parentId:string, node:any, position:string ):void {
		this.jsTree.create_node( parentId, node, position );
	}

	emptyNode( nodeId:string ):void {
		let $children:JQuery = this.jsTree.get_children_dom( nodeId );
		let childElements:Element[] = jQuery.makeArray( $children );
		while( childElements.length > 0 ) {
			this.jsTree.delete_node( childElements[ 0 ] );
			childElements.splice( 0, 1 );
		}
	}

	getNodeChildren( uri:string ):Promise<JSTreeNode[]> {
		return this.documentContext.documents.get( uri ).then( ( [resolvedRoot, response]:[PersistedDocument.Class, HTTP.Response.Class] ) => {
			return resolvedRoot.refresh().then( ( [refreshedRoot, response]:[PersistedDocument.Class, HTTP.Response.Class] )=> {
				if( ! resolvedRoot.accessPoints && ! resolvedRoot.contains ) return [];
				let accessPoints:JSTreeNode[] = [],
					children:JSTreeNode[] = [];
				if( ! ! resolvedRoot.contains ) {
					children = resolvedRoot.contains.filter( ( pointer:Pointer.Class ):boolean => {
						return pointer.id.indexOf( "/agents/me/" ) === - 1;
					} ).map( ( pointer:Pointer.Class ):JSTreeNode => {
						return this.buildNode( pointer.id );
					} );
				}
				if( ! ! resolvedRoot.accessPoints ) {
					accessPoints = resolvedRoot.accessPoints.map( ( pointer:Pointer.Class ):JSTreeNode => {
						return this.buildNode( pointer.id, true );
					} );
				}
				return children.concat( accessPoints );
			} );
		} ).catch( ( error ) => {
			console.error( error );
			return [];
		} );
	}


	getSlug( pointer:Pointer.Class | string ):string {
		if( typeof pointer !== "string" ) return ( <Pointer.Class>pointer ).id;
		return URI.Util.getSlug( <string>pointer );
	}

}

export interface JSTreeNode {
	id:string,
	text:any,
	state:any,
	children:any,
	data:any,
	type?:any
}

export default DocumentTreeViewComponent;