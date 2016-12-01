import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { PersistedAgent } from "carbonldp/Auth";

import { AppContentService } from "carbonldp-panel/my-apps/app-content/app-content.service";

import template from "./agent-details.view.html!";

@Component( {
	selector: "cp-agent-details-view",
	template: template,
	styles: [ ":host { display: block; }" ]
} )
export class AgentDetailsView {

	private router:Router;
	private activatedRoute:ActivatedRoute;

	private app:any;
	private agent:PersistedAgent.Class;
	private canDisplay:boolean = true;

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
		this.activatedRoute.data.forEach( ( data:{ agent:PersistedAgent.Class } ) => {
			this.agent = data.agent;
		} );
	}

	private goToAgent():void {
		this.router.navigate( [ "../" ] )
	}

}

export default AgentDetailsView;
