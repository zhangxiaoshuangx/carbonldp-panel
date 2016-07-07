import { Component, ElementRef, Input, AfterViewInit } from "@angular/core";
import { CORE_DIRECTIVES } from "@angular/common";
import { ROUTER_DIRECTIVES, Router, Instruction } from "@angular/router-deprecated";

import { RouterService } from "carbon-panel/router.service";
import { HeaderItem } from "carbon-panel/header.service";

import $ from "jquery";
import "semantic-ui/semantic";

import template from "./header-item.component.html!";
import style from "./header-item.component.css!text";

@Component( {
	selector: "cp-header-item",
	template: template,
	styles: [ style ],
	directives: [ CORE_DIRECTIVES, ROUTER_DIRECTIVES ]
} )
export class HeaderItemComponent implements AfterViewInit {
	@Input( "item" ) item:HeaderItem;

	private element:ElementRef;
	private $element:JQuery;
	private routerService:RouterService;

	constructor( element:ElementRef, routerService:RouterService ) {
		this.element = element;
		this.routerService = routerService;
	}

	ngAfterViewInit():void {
		this.$element = $( this.element.nativeElement );
		this.createDropdownMenus();
	}

	createDropdownMenus():void {
		if( ! this.item.children ) return;
		this.$element.find( ".ui.dropdown" ).dropdown( {
			on: "hover",
		} );
	}
}

export default HeaderItemComponent;
