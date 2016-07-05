import {Component, ElementRef, Input} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router-deprecated";

import {SidebarItem} from "carbon-panel/sidebar.service";

import template from "./sidebar-items.component.html!";
import style from "./sidebar-items.component.css!text";

@Component( {
	selector: "cp-sidebar-items",
	template: template,
	styles: [ style ],
	directives: [ ROUTER_DIRECTIVES, SidebarItemsComponent ]
} )
export class SidebarItemsComponent {
	@Input( "items" ) items:SidebarItem[];

	private $element:JQuery;

	constructor( private element:ElementRef ) {}

	ngAfterContentInit():void {
		this.$element = $( this.element.nativeElement );
	}

	ngAfterViewInit():void {
		this.initializeAccordion();
	}

	initializeAccordion():void {
		this.$element.accordion( {
			trigger: ".item.submenu, .item.submenu .title",
			title: ".title"
		} );
	}
}

export default SidebarItemsComponent;
