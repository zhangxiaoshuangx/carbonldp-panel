import { Component, Input, ElementRef, AfterViewInit, OnInit, EventEmitter } from "@angular/core";

import * as App from "carbonldp/App";

import template from "./roles-tree-view.component.html!";
import style from "./roles-tree-view.component.css!text";


@Component( {
	selector: "cp-roles-tree-view",
	template: template,
	styles: [ style ],
} )
export class RolesTreeViewComponent implements AfterViewInit, OnInit {

	private element:ElementRef;
	private $element:JQuery;
	private jsTree:JSTree;
	private $tree:JQuery;


	@Input() appContext:App.Context;

	constructor( element:ElementRef ) {
		this.element = element;
	}

	ngOnInit():void {
		let head:Element,
			link:HTMLLinkElement = document.createElement( "link" ),
			alreadyImported:boolean = document.querySelectorAll( "head [href='assets/node_modules/jstree/dist/themes/default/style.min.css']" ).length > 0;
		if( alreadyImported ) return;
		link.rel = "stylesheet";
		link.href = "assets/node_modules/jstree/dist/themes/default/style.min.css";
		head = document.querySelector( "head" );
		head.appendChild( link );
	}

	ngAfterViewInit():void {
		this.$element = $( this.element.nativeElement );
		this.$tree = this.$element.find( ".tree.content" );
	}
}

export default RolesTreeViewComponent;