import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router, Resolve, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

import * as PersistedRole from "carbonldp/Auth/PersistedRole";

import { RolesService } from "./roles.service";
import { AppContentService } from "carbonldp-panel/my-apps/app-content/app-content.service";

@Injectable()
export class RoleResolver implements Resolve<PersistedRole.Class> {

	private router:Router;
	private activatedRoute:ActivatedRoute;
	private rolesService:RolesService;
	private appContentService:AppContentService;


	constructor( router:Router, route:ActivatedRoute, rolesService:RolesService, appContentService:AppContentService, private location:Location ) {
		this.router = router;
		this.activatedRoute = route;
		this.rolesService = rolesService;
		this.appContentService = appContentService;
	}


	// TODO: Change the use of location to the righ way of navigate with an activatedRoute, check if this 'bug' has been resolved on further angular versions
	resolve( route:ActivatedRouteSnapshot ):Promise<PersistedRole.Class> | PersistedRole.Class {
		let slug:string = route.params[ "role-slug" ];
		return this.rolesService.get( slug, this.appContentService.activeApp.context ).then( ( role:PersistedRole.Class ) => {
			return role;
		} ).catch( ( error:any ):boolean => {
			let url:string = this.location.path(),
				lastSlashIdx:number = url.lastIndexOf( "/" ),
				finalURL:string = url.substr( 0, lastSlashIdx ) + "/role-not-found";
			this.router.navigate( [ finalURL ] );
			return false;
		} );
	}
}