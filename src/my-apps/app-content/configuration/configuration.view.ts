import { Component } from "@angular/core";

import { AppContentService } from "./../../app-content/app-content.service";
import * as App from "./../app";

import "semantic-ui/semantic";

import template from "./configuration.view.html!";

@Component( {
	selector: "cp-configuration-view",
	template: template,
	styles: [ ":host { display: block; }" ],
} )
export class ConfigurationView {
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

export default ConfigurationView;
