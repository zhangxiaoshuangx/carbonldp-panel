import { Component, Inject, Host, forwardRef } from "@angular/core";
import { Title } from "@angular/platform-browser";

import { AppContentView } from "./../../app-content/app-content.view";
import { ConfigurationComponent } from "./configuration.component";
import * as App from "./../app";

import "semantic-ui/semantic";

import template from "./configuration.view.html!";

@Component( {
	selector: "cp-configuration-view",
	template: template,
	styles: [ ":host { display: block; }" ],
	directives: [ ConfigurationComponent ],
} )
export class ConfigurationView {
	app:App.Class;
	private title:Title;

	constructor( title:Title, @Host() @Inject( forwardRef( () => AppContentView ) ) appContentView:AppContentView ) {
		this.app = appContentView.app;
		this.title = title;
	}

	routerOnActivate() {
		let title:string = "AppDev | " + this.app.name + " | Configuration";
		this.title.setTitle( title );
	}

}

export default ConfigurationView;
