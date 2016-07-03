import {Component, ElementRef, Input, AfterViewInit} from "@angular/core";
import {CORE_DIRECTIVES} from "@angular/common";
import {ROUTER_DIRECTIVES, Router, Instruction} from "@angular/router-deprecated";

import {HeaderItem} from "carbon-panel/header.service";

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

	private $element:JQuery;

	constructor( private element:ElementRef, private router:Router ) {}

	ngAfterViewInit():void {
		this.$element = $( this.element.nativeElement );
		this.createDropdownMenus();
	}

	isActive( route:string ):boolean {
		let instruction:Instruction = this.router.generate( [ route ] );
		return this.router.isRouteActive( instruction );
	}

	createDropdownMenus():void {
		if( ! this.item.children ) return;
		this.$element.find( ".ui.dropdown" ).dropdown( {
			on: "hover",
		} );
	}
}

export default HeaderItemComponent;
