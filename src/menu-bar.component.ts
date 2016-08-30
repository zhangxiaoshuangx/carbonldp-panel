import { Component } from "@angular/core";
import { Router, NavigationEnd, ActivatedRoute, ActivatedRouteSnapshot } from "@angular/router";

import { RouterService } from "carbon-panel/router.service";
import { SidebarService } from "carbon-panel/sidebar.service";

import "semantic-ui/semantic";

import template from "./menu-bar.component.html!";
import style from "./menu-bar.component.css!text";

@Component( {
	selector: "cp-menu-bar",
	template: template,
	styles: [ style ],
} )
export class MenuBarComponent {
	breadCrumbs:Array<any> = [];

	private router:Router;
	private routerService:RouterService;
	private sidebarService:SidebarService;
	private route:ActivatedRoute;

	constructor( router:Router, routerService:RouterService, sidebarService:SidebarService, route:ActivatedRoute ) {
		this.route = route;
		this.router = router;
		this.routerService = routerService;
		this.sidebarService = sidebarService;
	}

	ngOnInit():void {
		this.router.events.subscribe( ( event ) => {
			if( ! (event instanceof NavigationEnd ) ) return;
			this.breadCrumbs = [];
			let currentRoute = this.route.root;
			do {
				let url:string = "",
					childrenRoutes = currentRoute.children;
				currentRoute = null;
				childrenRoutes.forEach( ( route:ActivatedRoute ) => {
					if( route.outlet === "primary" ) {
						let routeSnapshot:ActivatedRouteSnapshot = route.snapshot;
						url += "/" + routeSnapshot.data[ "alias" ];
						if( ! ! routeSnapshot.data[ "displayName" ] ) {
							this.breadCrumbs.push( {
								alias: url,
								displayName: routeSnapshot.data[ "displayName" ],
							} );
						}
						currentRoute = route;
					}
				} )
			} while( currentRoute );
		} )
	}

	toggleSidebar():void {
		this.sidebarService.toggle();
	}
}

export default MenuBarComponent;
