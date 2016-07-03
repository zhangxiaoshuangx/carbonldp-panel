import {Component, ElementRef, AfterContentInit} from "@angular/core";
import {CORE_DIRECTIVES} from "@angular/common";
import {ROUTER_DIRECTIVES, Router, Instruction} from "@angular/router-deprecated";

import {HeaderService} from "carbon-panel/header.service";
import {HeaderItemComponent} from "carbon-panel/header-item.component";

import $ from "jquery";
import "semantic-ui/semantic";

import template from "./header.component.html!";
import style from "./header.component.css!text";

@Component( {
	selector: "cp-header",
	template: template,
	styles: [ style ],
	directives: [ CORE_DIRECTIVES, ROUTER_DIRECTIVES, HeaderItemComponent ]
} )
export class HeaderComponent implements AfterContentInit {
	router:Router;
	element:ElementRef;
	$element:JQuery;

	private headerService:HeaderService;

	constructor( router:Router, element:ElementRef, headerService:HeaderService ) {
		this.router = router;
		this.element = element;
		this.headerService = headerService;
	}

	ngAfterContentInit():void {
		this.$element = $( this.element.nativeElement );
		this.createCollapsableMenus();
	}

	isActive( route:string ):boolean {
		let instruction:Instruction = this.router.generate( [ route ] );
		return this.router.isRouteActive( instruction );
	}

	createCollapsableMenus():void {
		let verticalMenu:JQuery = this.$element.find( ".ui.vertical.menu" );
		this.$element.find( ".item.open" ).on( "click", function( e ) {
			e.preventDefault();
			verticalMenu.toggle();
		} );
		verticalMenu.toggle();
	}
}

export default HeaderComponent;
