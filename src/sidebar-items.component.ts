import { Component, Input } from "@angular/core";

import { RouterService } from "carbonldp-panel/router.service";
import { SidebarItem } from "carbonldp-panel/sidebar.service";

@Component( {
	selector: "cp-sidebar-items",
	templateUrl: "./sidebar-items.component.html",
	styleUrls: [ "./sidebar-items.component.scss" ],
} )
export class SidebarItemsComponent {
	@Input( "items" ) items:SidebarItem[];

	private routerService:RouterService;

	constructor( routerService:RouterService ) {
		this.routerService = routerService;
	}
}

export default SidebarItemsComponent;
