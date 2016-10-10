import { Component, ElementRef, AfterContentInit } from "@angular/core";

import { HeaderService } from "carbonldp-panel/header.service";

import $ from "jquery";
import "semantic-ui/semantic";

import template from "./header.component.html!";
import style from "./header.component.css!text";

@Component( {
	selector: "cp-header",
	template: template,
	styles: [ style ],
} )
export class HeaderComponent implements AfterContentInit {
	private element:ElementRef;
	private $element:JQuery;
	private headerService:HeaderService;

	constructor( element:ElementRef, headerService:HeaderService ) {
		this.element = element;
		this.headerService = headerService;
	}

	ngAfterContentInit():void {
		this.$element = $( this.element.nativeElement );
		this.createCollapsableMenus();
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
