import { Component } from "@angular/core";

import { AppContentService } from "carbonldp-panel/my-apps/app-content/app-content.service";
import * as App from "carbonldp-panel/my-apps/app-content/app";

import template from "./agents.view.html!";

@Component( {
	selector: "cp-agents-view",
	template: template,
	styles: [ ":host { display: block; }" ]
} )
export class AgentsView {
	app:App.Class;
	canDisplay:boolean = true;

	constructor( appContentService:AppContentService ) {
		this.app = appContentService.activeApp;
		appContentService.onAppHasChanged.subscribe( ( app:App.Class ) => {
			this.app = app;
			this.canDisplay = false;
			setTimeout( () => { this.canDisplay = true;}, 0 );
		} );
	}

}

export default AgentsView;
