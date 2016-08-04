import { Component, Inject, Host, forwardRef } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { RouteData, Router } from "@angular/router-deprecated";

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
	private routeData:RouteData;
	private router:Router;

	constructor( router:Router, routeData:RouteData, title:Title, @Host() @Inject( forwardRef( () => AppContentView ) ) appContentView:AppContentView ) {
		this.app = appContentView.app;
		this.title = title;
		this.routeData = routeData;
		this.router = router;
	}

	routerOnActivate() {
		let rootComponent = this.router.root.currentInstruction.component.routeData.data[ "displayName" ];
		let title:string = rootComponent +" | "+this.app.name+" > "+ this.routeData.data["displayName"];
		this.title.setTitle(title);
	}

}

export default ConfigurationView;
