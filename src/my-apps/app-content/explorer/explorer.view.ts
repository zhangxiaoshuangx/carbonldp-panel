import { Component, } from "@angular/core";

import { AppContentService } from "./../../app-content/app-content.service";
import * as App from "./../app";

import template from "./explorer.view.html!";

@Component( {
	selector: "cp-explorer-view",
	template: template,
	styles: [ ":host { display: block; }" ],
} )
export class ExplorerView {
	app:App.Class;

	constructor( appContentService:AppContentService ) {
		this.app = appContentService.activeApp;
	}

}

export default ExplorerView;
