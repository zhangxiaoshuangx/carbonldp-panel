import { Component, Host, Inject, forwardRef } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router, RouteData } from "@angular/router-deprecated";

import { AppContentView } from "./../app-content.view";
import * as App from "./../app";
import { DocumentExplorerComponent } from "./document-explorer/document-explorer.component";

import "semantic-ui/semantic";

import template from "./explorer.view.html!";

@Component( {
	selector: "cp-explorer-view",
	template: template,
	styles: [ ":host { display: block; }" ],
	directives: [ DocumentExplorerComponent ],
} )
export class ExplorerView {
	app:App.Class;
	private title:Title;
	private router:Router;
	private routeData:RouteData;

	constructor( routeData:RouteData, router:Router, title:Title, @Host() @Inject( forwardRef( () => AppContentView ) ) appContent:AppContentView ) {
		this.app = appContent.app;
		this.title = title;
		this.router =router;
		this.routeData =routeData;
	}

	routerOnActivate() {
		let rootComponent = this.router.root.currentInstruction.component.routeData.data[ "displayName" ];
		let title:string = rootComponent +" | "+this.app.name+" > "+ this.routeData.data["displayName"];
		this.title.setTitle(title);
	}

}

export default ExplorerView;
