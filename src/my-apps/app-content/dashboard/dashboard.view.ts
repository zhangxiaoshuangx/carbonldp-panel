import { Component, Host, Inject, forwardRef } from "@angular/core";
import { Title } from "@angular/platform-browser";

import { AppContentView } from "./../../app-content/app-content.view";

import * as App from "./../app";
import "semantic-ui/semantic";

// import template from "./create-app.view.html!";

@Component( {
	selector: "cp-dashboard-view",
	template: "<h3>Dashboard View</h3>",
	styles: [ ":host { display: block; }" ],
} )
export class DashboardView {
	app:App.Class;
	private title:Title;

	constructor( title:Title, @Host() @Inject( forwardRef( () => AppContentView ) ) appContent:AppContentView ) {
		this.app = appContent.app;
		this.title = title;
	}

	routerOnActivate() {
		let title:string = "AppDev | " + this.app.name + " | Dashboard";
		this.title.setTitle( title );
	}
}

export default DashboardView;
