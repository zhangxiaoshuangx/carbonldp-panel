import { Component } from "@angular/core";
import { Router, ROUTER_DIRECTIVES } from "@angular/router-deprecated";

import * as App from "./../app/app";
import { MyAppsSidebarService } from "./../my-apps-sidebar.service";
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

	constructor() {}

}

export default AppsCatalogView;
