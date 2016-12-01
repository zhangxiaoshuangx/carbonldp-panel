import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { PersistedAgent } from "carbonldp/Auth";

import { AppContentService } from "carbonldp-panel/my-apps/app-content/app-content.service";
import { Modes } from "carbonldp-panel/my-apps/app-content/auth/agents/agent-details/agent-details.component";

import template from "./agent-creator.view.html!";

@Component( {
	selector: "cp-agent-creator-view",
	template: template,
	styles: [ ":host { display: block; }" ]
} )
export class AgentCreatorView {

	private router:Router;
	private activatedRoute:ActivatedRoute;

	private app:any;
	private agent:PersistedAgent.Class;
	private canDisplay:boolean = true;
	private modes:Modes = Modes;

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

}

export default AgentCreatorView;
