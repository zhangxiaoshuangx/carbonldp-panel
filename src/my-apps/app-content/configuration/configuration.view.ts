import { Component, Inject, Host, forwardRef } from "@angular/core";

import { AppContentView } from "./../../app-content/app-content.view";
//import { ConfigurationComponent } from "./configuration.component";
import * as App from "./../app";

import "semantic-ui/semantic";

import template from "./configuration.view.html!";

@Component( {
	selector: "cp-configuration-view",
	template: template,
	styles: [ ":host { display: block; }" ],
	//directives: [ ConfigurationComponent ],
} )
export class ConfigurationView {
	app:App.Class;

	constructor( @Host() @Inject( forwardRef( () => AppContentView ) ) appContentView:AppContentView ) {
		this.app = appContentView.app;
	}

}

export default ConfigurationView;
