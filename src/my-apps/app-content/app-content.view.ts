import { Component, ElementRef } from "@angular/core";
import { ROUTER_DIRECTIVES, RouteConfig, Router, RouterOutlet, RouteParams } from "@angular/router-deprecated";
import{ Title } from "@angular/platform-browser";

import * as CarbonApp from "carbonldp/App";

import { MyAppsSidebarService } from "./../my-apps-sidebar.service";
import { AppContextService } from "./../app-context.service";
import * as App from "./app";

import { DashboardView } from "./dashboard/dashboard.view";
import { SPARQLClientView } from "./sparql-client/sparql-client.view";
import { EditAppView } from "./edit-app/edit-app.view";
import { ExplorerView } from "./explorer/explorer.view";
import { ConfigurationView } from "./configuration/configuration.view";

import template from "./app-content.view.html!";
import style from "./app-content.view.css!text";

@Component( {
	selector: "cp-app-content",
	template: template,
	styles: [ style ],
	directives: [ ROUTER_DIRECTIVES, RouterOutlet ],
	providers: [ AppContextService, ],
} )
@RouteConfig( [
	{
		path: "/",
		as: "AppDashboard",
		component: DashboardView,
		useAsDefault: true,
		data: {
			alias: "AppDashboard",
			displayName: "App Dashboard",
		},
	},
	{
		path: "/sparql-client",
		as: "SPARQLClient",
		component: SPARQLClientView,
		data: {
			alias: "SPARQLClient",
			displayName: "SPARQL Client",
		},
	},
	{
		path: "/edit",
		as: "Edit",
		component: EditAppView,
		data: {
			alias: "Edit",
			displayName: "Edit",
		},
	},
	{
		path: "/explore",
		as: "Explorer",
		component: ExplorerView,
		data: {
			alias: "Explorer",
			displayName: "Explorer",
		},
	},
	{
		path: "/configure",
		as: "Configuration",
		component: ConfigurationView,
		data: {
			alias: "Configuration",
			displayName: "Configuration",
		},
	},
] )
export class AppContentView {
	app:App.Class;

	private router:Router;
	private routeParams:RouteParams;

	private myAppsSidebarService:MyAppsSidebarService;
	private appContextService:AppContextService;

	private timer:number;
	private title:Title;

	constructor( router:Router, routeParams:RouteParams, myAppsSidebarService:MyAppsSidebarService, appContextService:AppContextService ) {
		this.router = router;
		this.routeParams = routeParams;
		this.myAppsSidebarService = myAppsSidebarService;
		this.appContextService = appContextService;

	}

	routerOnActivate():void {
		let slug:string = this.routeParams.get( "slug" );

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
