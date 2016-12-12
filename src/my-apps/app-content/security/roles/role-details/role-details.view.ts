import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import * as PersistedRole from "carbonldp/Auth/PersistedRole";

import { AppContentService } from "carbonldp-panel/my-apps/app-content/app-content.service";
// import { Modes } from "./role-details.component";

import template from "./role-details.view.html!";

@Component( {
	selector: "cp-role-details-view",
	template: template,
	styles: [ ":host { display: block; }" ]
} )
export class RoleDetailsView {

	private router:Router;
	private activatedRoute:ActivatedRoute;

	private app:any;
	private role:PersistedRole.Class;
	private canDisplay:boolean = true;
	private mode:string = "READ";

	constructor( router:Router, route:ActivatedRoute, appContentService:AppContentService ) {
		this.router = router;
		this.activatedRoute = route;

		this.app = appContentService.activeApp;
		appContentService.onAppHasChanged.subscribe( ( app:any ) => {
			this.app = app;
			this.canDisplay = false;
			setTimeout( () => { this.canDisplay = true;}, 0 );
		} );
	}

	ngOnInit() {
		this.activatedRoute.data.forEach( ( data:{ role:PersistedRole.Class } ) => {
			this.role = data.role;
		} );
		this.activatedRoute.queryParams.subscribe( ( params ) => {
			this.mode = params[ "mode" ] ? params[ "mode" ] : "READ";
		} );
	}

	private goToRoles():void {
		this.router.navigate( [ "../" ] )
	}

}

export default RoleDetailsView;
