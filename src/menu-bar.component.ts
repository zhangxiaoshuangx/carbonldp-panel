import { Component } from "@angular/core";
import { Router, NavigationEnd, ActivatedRoute, ActivatedRouteSnapshot } from "@angular/router";

import { RouterService } from "carbonldp-panel/router.service";
import { SidebarService } from "carbonldp-panel/sidebar.service";

import "semantic-ui/semantic";

@Component( {
	selector: "cp-menu-bar",
	templateUrl: "./menu-bar.component.html",
	styleUrls: [  "./menu-bar.component.scss"  ],
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
			let url:string = "",
				currentRoute = this.route.root;
			do {
				let childrenRoutes = currentRoute.children;
				currentRoute = null;
				childrenRoutes.forEach( ( route:ActivatedRoute ) => {
					if( route.outlet === "primary" ) {
						let routeSnapshot:ActivatedRouteSnapshot = route.snapshot;
						if( typeof routeSnapshot === "undefined" ) return;
						url += this.getURL( routeSnapshot );
						if( ! ! routeSnapshot.data[ "displayName" ] && ! routeSnapshot.data[ "hide" ] ) {
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

	private getURL( routeSnapshot:ActivatedRouteSnapshot ):string {
		let url:string = "";
		if( routeSnapshot.data[ "param" ] )
			url += "/" + routeSnapshot.params[ routeSnapshot.data[ "param" ] ];
		else if( routeSnapshot.data[ "alias" ] )
			url += "/" + routeSnapshot.data[ "alias" ];
		return url;
	}

	toggleSidebar():void {
		this.sidebarService.toggle();
	}
}

export default MenuBarComponent;
