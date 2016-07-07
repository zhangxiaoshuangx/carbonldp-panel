import { Component, ElementRef } from "@angular/core";
import { Location } from "@angular/common";
import { ROUTER_DIRECTIVES, Router } from "@angular/router-deprecated";

import $ from "jquery";
import "semantic-ui/semantic";

import { SidebarService } from "carbon-panel/sidebar.service"
import { SidebarItemsComponent } from "carbon-panel/sidebar-items.component";

import template from "./sidebar.component.html!";
import style from "./sidebar.component.css!text";

@Component( {
	selector: "cp-sidebar",
	template: template,
	styles: [ style ],
	directives: [ ROUTER_DIRECTIVES, SidebarItemsComponent ],
	host: {
		class: "ui inverted vertical menu accordion"
	}
} )
export class SidebarComponent {
	private element:ElementRef;
	private $element:JQuery;
	private router:Router;
	private location:Location;
	private sidebarService:SidebarService;

	constructor( router:Router, element:ElementRef, location:Location, sidebarService:SidebarService ) {
		this.element = element;
		this.router = router;
		this.location = location;
		this.sidebarService = sidebarService;

		this.sidebarService.toggleEmitter.subscribe( ( event:any ) => {
			this.toggle();
		} );
		this.sidebarService.toggledEmitter.emit( true );
	}

	ngAfterViewInit():void {
		this.$element = $( this.element.nativeElement );
		this.refreshAccordion();
	}

	toggle():void {
		if( this.$element.is( ":visible" ) ) {
			this.$element.animate( { "width": "0" }, 400, () => {
				this.$element.hide();
				this.sidebarService.toggledEmitter.emit( false );
			} );
		} else {
			this.$element.show();
			this.$element.animate( { "width": "300px" }, 400 );
			this.sidebarService.toggledEmitter.emit( true );
		}
	}

	refreshAccordion():void {
		this.$element.accordion( {
			selector: {
				trigger: ".item.app, .item.app .title",
				title: ".title",
			},
			exclusive: false
		} );
	}
}

export default SidebarComponent;
