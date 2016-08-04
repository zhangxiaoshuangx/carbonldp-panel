import { Component } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router, RouteData } from "@angular/router-deprecated";

import "semantic-ui/semantic";

import { CreateAppComponent } from "./create-app.component";

import template from "./create-app.view.html!";

@Component( {
	selector: "cp-create-app-view",
	template: template,
	styles: [ ":host { display: block; }" ],
	directives: [ CreateAppComponent ],
} )
export class CreateAppView {
	private title:Title;
	private router:Router;
	private routeData:RouteData;

	constructor( title:Title, router:Router, routeData:RouteData ) {
		this.title = title;
		this.router =router;
		this.routeData =routeData;
	}

	routerOnActivate() {
		let rootComponent = this.router.root.currentInstruction.component.routeData.data[ "displayName" ];
		let title:string = rootComponent +" | "+this.routeData.data["displayName"];
		this.title.setTitle(title);
	}
}

export default CreateAppView;
