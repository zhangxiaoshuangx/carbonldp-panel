import { Component } from "@angular/core";
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

	constructor( ) {

	}

}

export default AppsCatalogView;
