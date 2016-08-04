import { Component, Inject, Host, forwardRef } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { RouteData, Router } from "@angular/router-deprecated";

import { AppContentView } from "./../../app-content/app-content.view";
import { EditAppComponent } from "./edit-app.component";
import * as App from "./../app";

import "semantic-ui/semantic";

import template from "./edit-app.view.html!";

@Component( {
	selector: "cp-edit-app-view",
	template: template,
	styles: [ ":host { display: block; }" ],
	directives: [ EditAppComponent ],
} )
export class EditAppView {
	app:App.Class;
	title:Title;
	routeData:RouteData;
	private router:Router;

	constructor( router:Router, routeData:RouteData, title:Title, @Host() @Inject( forwardRef( () => AppContentView ) ) appContentView:AppContentView ) {
		this.app = appContentView.app;
		this.title = title;
		this.routeData = routeData;
		this.router = router;
	}

	routerOnActivate() {
		//this.title.setTitle( "AppDev | Edit App" );
		//let title:string = this.title.getTitle() +" | "+this.app.name+" > "+ this.routeData.data["displayName"];
		let rootComponent = this.router.root.currentInstruction.component.routeData.data[ "displayName" ];
		let title:string = rootComponent + " | " + this.app.name + " > " + this.routeData.data[ "displayName" ];
		this.title.setTitle( title );
	}
}

export default EditAppView;
