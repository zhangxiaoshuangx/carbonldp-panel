import { Component } from "@angular/core";
//import { ROUTER_DIRECTIVES, RouteConfig, Router, RouterOutlet, RouteParams } from "@angular/router-deprecated";
import { Router } from "@angular/router";

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
export class AppContentView {
	app:App.Class;

	private router:Router;
	//private routeParams:RouteParams;

	private myAppsSidebarService:MyAppsSidebarService;
	private appContextService:AppContextService;

	private timer:number;

	//constructor( router:Router, routeParams:RouteParams, myAppsSidebarService:MyAppsSidebarService, appContextService:AppContextService ) {
	constructor( router:Router, myAppsSidebarService:MyAppsSidebarService, appContextService:AppContextService ) {
		this.router = router;
		//this.routeParams = routeParams;
		this.myAppsSidebarService = myAppsSidebarService;
		this.appContextService = appContextService;

	}

	routerOnActivate():void {
		//let slug:string = this.routeParams.get( "slug" );
		let slug:string = "test-slug";
		this.appContextService.get( slug ).then( ( appContext:CarbonApp.Context ):void => {
			this.app = App.Factory.createFrom( appContext );
			this.myAppsSidebarService.addApp( this.app );
			this.myAppsSidebarService.openApp( this.app );
		} ).catch( ( error:any ):void => {
			this.timer = 5;
			let countDown:any = setInterval( ():void => {
				this.timer --;
				if( this.timer === 0 ) {
					this.router.navigate( [ "List" ] );
					clearInterval( countDown );
				}
			}, 1000 );
		} );
	}
}

export default AppContentView;
