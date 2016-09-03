import { Component, Input } from "@angular/core";

import { RouterService } from "carbonldp-panel/router.service";
import { SidebarItem } from "carbonldp-panel/sidebar.service";

import template from "./sidebar-items.component.html!";
import style from "./sidebar-items.component.css!text";

@Component( {
	selector: "cp-sidebar-items",
	template: template,
	styles: [ style ],
} )
export class SidebarItemsComponent {
	@Input( "items" ) items:SidebarItem[];

	private routerService:RouterService;

	constructor( routerService:RouterService ) {
		this.routerService = routerService;
	}
}

export default SidebarItemsComponent;
