import { Component, Input, ElementRef, AfterViewInit } from "@angular/core";

import * as App from "carbonldp/App";

import "semantic-ui/semantic";

import template from "./security.component.html!";

@Component( {
	selector: "cp-security",
	template: template,
	// styles: [ style ],
} )

export class SecurityComponent implements AfterViewInit {

	private element:ElementRef;
	private $element:JQuery;

	@Input() appContext:App.Context;


	constructor( element:ElementRef ) {
		this.element = element;
		this.$element = $( this.element.nativeElement );
	}

	ngAfterViewInit():void {
		this.$element.find( ".security.menu .item" ).tab();
	}
}

export default SecurityComponent;
