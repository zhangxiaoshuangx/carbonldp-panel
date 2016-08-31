import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

import * as CarbonApp from "carbonldp/App";
import * as App from "./app";

import { AppContextService } from "./../app-context.service";

@Injectable()
export class AppContentResolver implements Resolve<App.Class> {

	private router:Router;
	private activatedRoute:ActivatedRoute;
	private appContextService:AppContextService;


	constructor( router:Router, route:ActivatedRoute, appContextService:AppContextService ) {
		this.router = router;
		this.activatedRoute = route;
		this.appContextService = appContextService;
	}


	resolve( route:ActivatedRouteSnapshot ):Promise<App.Class> | App.Class {
		let slug:string = route.params[ "slug" ];
		return this.appContextService.get( slug ).then( ( appContext:CarbonApp.Context ) => {
			return App.Factory.createFrom( appContext );
		} ).catch( ( error:any ):boolean => {
			console.error( error );
			this.router.navigate( [ "my-apps", "app-not-found" ] );
			return false;
		} );
	}
}