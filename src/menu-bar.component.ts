import { Component, ElementRef } from "@angular/core";
import { ROUTER_DIRECTIVES, Router, Instruction } from "@angular/router-deprecated";

import { RouterService } from "carbon-panel/router.service";
import { SidebarService } from "carbon-panel/sidebar.service";

import $ from "jquery";
import "semantic-ui/semantic";

import template from "./menu-bar.component.html!";
import style from "./menu-bar.component.css!text";

@Component( {
	selector: "cp-menu-bar",
	template: template,
	styles: [ style ],
	directives: [ ROUTER_DIRECTIVES ]
} )
export class MenuBarComponent {
	breadCrumbs:Array<any> = [];
	instructions:Instruction[] = [];

	private element:ElementRef;
	private router:Router;
	private routerService:RouterService;
	private sidebarService:SidebarService;

	constructor( element:ElementRef, router:Router, routerService:RouterService, sidebarService:SidebarService ) {
		this.element = element;
		this.router = router;
		this.routerService = routerService;
		this.sidebarService = sidebarService;

		this.router.parent.subscribe( ( url )=> {
			this.updateBreadcrumbs( url );
		} );
	}

	updateBreadcrumbs( url:string ):void {
		this.instructions = [];
		this.breadCrumbs = [];

		let workingInstruction:Instruction;
		this.router.recognize( url ).then( ( instruction )=> {
			if( ! instruction ) return;

			workingInstruction = instruction;
			while ( workingInstruction.child ) {
				this.addInstruction( workingInstruction );
				workingInstruction = workingInstruction.child;
			}
			if( ! workingInstruction.child && ! ! workingInstruction.urlPath ) {
				this.addInstruction( workingInstruction );
			}
		} );
	}

	getRouteAlias():any {
		let alias:any[] = [], params:{name:string} = { name: "" };
		this.instructions.forEach( ( instruction )=> {
			if( ! instruction ) return;

			alias.push( instruction.component.routeData.data[ "alias" ] );
			params = instruction.component.routeData.data[ "params" ];
			if( params ) alias.push( { [params.name]: instruction.urlPath } );
		} );
		return alias;
	}

	addInstruction( workingInstruction:Instruction ):void {
		this.instructions.push( workingInstruction );
		this.breadCrumbs.push( {
			url: workingInstruction.urlPath,
			displayName: workingInstruction.component.routeData.data[ "displayName" ],
			alias: this.getRouteAlias(),
			friendlyAlias: this.getFriendlyAlias()
		} );
	}

	getFriendlyAlias():any {
		let friendlyURL:string = "";
		this.instructions.forEach( ( instruction )=> {
			if( ! instruction ) return;

			friendlyURL += instruction.component.routeData.data[ "alias" ];
			friendlyURL += instruction.child ? "/" : "";
		} );
		return friendlyURL;
	}

	toggleSidebar():void {
		this.sidebarService.toggle();
	}
}

export default MenuBarComponent;
