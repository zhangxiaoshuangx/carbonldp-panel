import { Component, Inject, Host, forwardRef } from "@angular/core";

import { AppContentView } from "./../../app-content/app-content.view";
//import { EditAppComponent } from "./edit-app.component";
import * as App from "./../app";

import "semantic-ui/semantic";

import template from "./edit-app.view.html!";

@Component( {
	selector: "cp-edit-app-view",
	template: template,
	styles: [ ":host { display: block; }" ],
	//directives: [ EditAppComponent ],
} )
export class EditAppView {
	app:App.Class;

	constructor( @Host() @Inject( forwardRef( () => AppContentView ) ) appContentView:AppContentView ) {
		this.app = appContentView.app;
	}

}

export default EditAppView;
