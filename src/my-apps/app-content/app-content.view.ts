import { Component } from "@angular/core";
//import { ROUTER_DIRECTIVES, RouteConfig, Router, RouterOutlet, RouteParams } from "@angular/router-deprecated";
import { Router, ActivatedRoute, Resolve, ActivatedRouteSnapshot} from "@angular/router";

import * as CarbonApp from "carbonldp/App";

import { MyAppsSidebarService } from "./../my-apps-sidebar.service";
import { AppContextService } from "./../app-context.service";
import * as App from "./app";

import template from "./app-content.view.html!";
import style from "./app-content.view.css!text";

@Component( {
	selector: "cp-app-content",
	template: template,
	styles: [ style ],
	//directives: [ ROUTER_DIRECTIVES, RouterOutlet ],
	//providers: [ AppContextService, ],
} )
export class AppContentView implements Resolve<App.Class> {
	app:App.Class;

	private router:Router;
	//private routeParams:RouteParams;
	private activatedRoute:ActivatedRoute;
	private myAppsSidebarService:MyAppsSidebarService;
	private appContextService:AppContextService;

	private timer:number;

	constructor( router:Router, route:ActivatedRoute, myAppsSidebarService:MyAppsSidebarService, appContextService:AppContextService ) {
		this.router = router;
		//this.routeParams = routeParams;
		this.activatedRoute = route;
		this.myAppsSidebarService = myAppsSidebarService;
		this.appContextService = appContextService;

	}

	resolve( route: ActivatedRouteSnapshot ):any {
		let slug:string =route.params["slug"];
		return this.appContextService.get( slug ).then( ( appContext:CarbonApp.Context ):boolean => {
			this.app = App.Factory.createFrom( appContext );
			this.myAppsSidebarService.addApp( this.app );
			this.myAppsSidebarService.openApp( this.app );
			return true;

		} ).catch( ( error:any ):boolean => {
			this.timer = 5;
			let countDown:any = setInterval( ():boolean => {
				this.timer --;
				if( this.timer === 0 ) {
					this.router.navigate( [ "/my-apps/" ] );
					clearInterval( countDown );
					return false;
				}
			}, 1000 );
			return false;
		} );
	}
}

export default AppContentView;
