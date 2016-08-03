import { Component } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ROUTER_DIRECTIVES } from "@angular/router-deprecated";

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
	private title:Title;

	constructor( title:Title ) {
		this.title = title;
	}

	routerOnActivate() {
		this.title.setTitle( "App Dev | Apps Catalog" );
		console.log( this.title );
	}


}

export default AppsCatalogView;
