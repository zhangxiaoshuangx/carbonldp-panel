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

	constructor( appContentService:AppContentService ) {
		this.app = appContentService.activeApp;
	}

}

export default ConfigurationView;
