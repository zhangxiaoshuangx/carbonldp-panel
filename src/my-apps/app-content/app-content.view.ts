import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import * as CarbonApp from "carbonldp/App";

import { MyAppsSidebarService } from "./../my-apps-sidebar.service";
import * as App from "./app";

import template from "./app-content.view.html!";
import style from "./app-content.view.css!text";

@Component( {
	selector: "cp-app-content",
	template: template,
	styles: [ style ],
} )
export class AppContentView {

	private app:App.Class;

	private router:Router;
	private activatedRoute:ActivatedRoute;
	private myAppsSidebarService:MyAppsSidebarService;


	constructor( router:Router, route:ActivatedRoute, myAppsSidebarService:MyAppsSidebarService ) {
		this.router = router;
		this.activatedRoute = route;
		this.myAppsSidebarService = myAppsSidebarService;
	}

	ngOnInit() {
		this.activatedRoute.data.forEach( ( data:{ app:App.Class } ) => {
			this.app = data.app;
			this.myAppsSidebarService.addApp( this.app );
			this.myAppsSidebarService.openApp( this.app );
		} );
	}

	// resolve( route:ActivatedRouteSnapshot ):any {
	// 	let slug:string = route.params[ "slug" ];
	// 	return this.appContextService.get( slug ).then( ( appContext:CarbonApp.Context ):boolean => {
	// 		this.app = App.Factory.createFrom( appContext );
	// 		this.myAppsSidebarService.addApp( this.app );
	// 		this.myAppsSidebarService.openApp( this.app );
	// 		return true;
	//
	// 	} ).catch( ( error:any ):boolean => {
	// 		this.timer = 5;
	// 		let countDown:any = setInterval( ():boolean => {
	// 			this.timer --;
	// 			if( this.timer === 0 ) {
	// 				this.router.navigate( [ "/my-apps/" ] );
	// 				clearInterval( countDown );
	// 				return false;
	// 			}
	// 		}, 1000 );
	// 		return false;
	// 	} );
	// }
}

export default AppContentView;
