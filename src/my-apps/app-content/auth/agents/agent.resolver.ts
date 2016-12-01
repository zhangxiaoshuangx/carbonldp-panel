import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

import * as PersistedAgent from "carbonldp/Auth/PersistedAgent";

import { AgentsService } from "./agents.service";
import { AppContentService } from "carbonldp-panel/my-apps/app-content/app-content.service";

@Injectable()
export class AgentResolver implements Resolve<PersistedAgent.Class> {

	private router:Router;
	private activatedRoute:ActivatedRoute;
	private agentsService:AgentsService;
	private appContentService:AppContentService;


	constructor( router:Router, route:ActivatedRoute, agentsService:AgentsService, appContentService:AppContentService ) {
		this.router = router;
		this.activatedRoute = route;
		this.agentsService = agentsService;
		this.appContentService = appContentService;
	}


	resolve( route:ActivatedRouteSnapshot ):Promise<PersistedAgent.Class> | PersistedAgent.Class {
		let slug:string = route.params[ "agent-slug" ];
		return this.agentsService.get( slug, this.appContentService.activeApp.context ).then( ( agent:PersistedAgent.Class ) => {
			return agent;
		} ).catch( ( error:any ):boolean => {
			console.error( error );
			this.router.navigate( [ "my-apps", "app-not-found" ] );
			return false;
		} );
	}
}