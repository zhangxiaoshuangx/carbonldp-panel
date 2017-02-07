import { Component, Input } from "@angular/core";

import { RouterService } from "carbonldp-panel/router.service";
import { SidebarItem } from "carbonldp-panel/sidebar.service";

@Component( {
	selector: "cp-sidebar-items",
	template: require( "./sidebar-items.component.html" ),
	styles: [ require( "./sidebar-items.component.css" ) ],
} )
export class SidebarItemsComponent {
	@Input( "items" ) items:SidebarItem[];

	private routerService:RouterService;

	constructor( routerService:RouterService ) {
		this.routerService = routerService;
	}
}

export default SidebarItemsComponent;
