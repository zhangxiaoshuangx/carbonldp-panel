import {Component, ElementRef} from "@angular/core";
import {Location} from "@angular/common";
import {ROUTER_DIRECTIVES, Router} from "@angular/router-deprecated";

import $ from "jquery";
import "semantic-ui/semantic";

import {SidebarService} from "carbon-panel/sidebar.service"
import {SidebarItemsComponent} from "carbon-panel/sidebar-items.component";

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
	router:Router;
	element:ElementRef;
	$element:JQuery;
	sidebarService:SidebarService;
	location:Location;

	constructor( router:Router, element:ElementRef, location:Location, sidebarService:SidebarService ) {
		this.router = router;
		this.element = element;
		this.sidebarService = sidebarService;
		this.location = location;

		this.sidebarService.toggleEmitter.subscribe(
			() => {
				this.toggle();
			}
		);
	}

	ngAfterViewInit():void {
		this.$element = $( this.element.nativeElement );
		this.refreshAccordion();
	}

	toggle():void {
		this.sidebarService.toggleMenuButtonEmitter.emit( null );
		if( this.$element.is( ":visible" ) ) {
			this.$element.animate( {"width": "0"}, 400, () => {
				this.$element.hide();
			} );
		} else {
			this.$element.show();
			this.$element.animate( {"width": "300px"}, 400 );
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

	isActive( slug:any, fullRoute?:boolean ):boolean {
		switch( typeof slug ) {
			case "string":
				let url:string[] = this.location.path().split( "/" );
				if( fullRoute ) {
					return url.indexOf( slug ) > - 1;
				} else {
					return url[ url.length - 1 ].indexOf( slug ) > - 1;
				}
			case "object":
				// TODO: Change this to use a non private variables implementation.
				let instruction = this.router.generate( slug );
				let router = this.router;
				if( ! fullRoute ) {
					while( instruction.child ) {
						instruction = instruction.child;
						if( typeof router._childRouter === "undefined" || router._childRouter === null ) continue;
						if( typeof router._childRouter._currentInstruction === "undefined" || router._childRouter._currentInstruction === null ) continue;
						router = router._childRouter;
					}
				}
				return router.isRouteActive( instruction );
			default:
				return false;
		}
	}
}

export default SidebarComponent;
