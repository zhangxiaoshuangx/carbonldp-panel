import { Component, Input } from "@angular/core";
//import { ROUTER_DIRECTIVES } from "@angular/router-deprecated";

//import { CollapsibleDirective, CollapsibleTitleDirective, CollapsibleContentDirective } from "carbon-panel/semantic/collapsible.directive";
//import { RouterService } from "carbon-panel/router.service";
import { SidebarItem } from "carbon-panel/sidebar.service";

import template from "./sidebar-items.component.html!";
import style from "./sidebar-items.component.css!text";

@Component( {
	selector: "cp-sidebar-items",
	template: template,
	styles: [ style ],
	//directives: [ ROUTER_DIRECTIVES, SidebarItemsComponent, CollapsibleDirective, CollapsibleTitleDirective, CollapsibleContentDirective ]
} )
export class SidebarItemsComponent {
	@Input( "items" ) items:SidebarItem[];

	//private routerService:RouterService;

	//constructor( routerService:RouterService ) {
	constructor() {
		//this.routerService = routerService;
	}
}

export default SidebarItemsComponent;
