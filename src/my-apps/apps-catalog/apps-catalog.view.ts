import { Component } from "@angular/core";
import { ROUTER_DIRECTIVES, RouteData, Router } from "@angular/router-deprecated";
import { Title } from "@angular/platform-browser";

import { AppsCatalogComponent } from "./apps-catalog.component";

import "semantic-ui/semantic";

import template from "./apps-catalog.view.html!";

@Component( {
	selector: "cp-apps-catalog-view",
	template: template,
	styles: [ ":host { display: block; }" ],
	directives: [ ROUTER_DIRECTIVES, AppsCatalogComponent ],
} )
export class AppsCatalogView {
	private routeData:RouteData;
	private title:Title;
	private router:Router;

	constructor( router:Router, routeData:RouteData, title:Title ) {
		this.title = title;
		this.routeData = routeData;
		this.router =router;
	}

	routerOnActivate(){
		let rootComponent = this.router.root.currentInstruction.component.routeData.data[ "displayName" ];
		let title:string = rootComponent +" | "+ this.routeData.data["displayName"];
		this.title.setTitle(title);
		//let title:string = this.title.getTitle() +" | "+ this.routeData.data["displayName"];

	}


}

export default AppsCatalogView;
