import { Component } from "@angular/core";

import { AppContentService } from "./../../app-content/app-content.service";
import * as App from "./../app";

import template from "./edit-app.view.html!";

@Component( {
	selector: "cp-edit-app-view",
	template: template,
	styles: [ ":host { display: block; }" ]
} )
export class EditAppView {
	app:App.Class;

	constructor( appContentService:AppContentService ) {
		this.app = appContentService.activeApp;
	}

}

export default EditAppView;
