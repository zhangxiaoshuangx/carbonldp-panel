import { Component, Host, Inject, forwardRef } from "@angular/core";
import { RouteData, Router } from "@angular/router-deprecated";
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
	private routeData:RouteData;
	private router:Router;

	constructor( router:Router, routeData:RouteData, title:Title, @Host() @Inject( forwardRef( () => AppContentView ) ) appContent:AppContentView ) {
		this.app = appContent.app;
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

export default DashboardView;
