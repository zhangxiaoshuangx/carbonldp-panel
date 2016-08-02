import { Component, Inject, Host, forwardRef } from "@angular/core";
import { Title } from "@angular/platform-browser";

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
	private title:Title;
	constructor( title:Title, @Host() @Inject( forwardRef( () => AppContentView ) ) appContentView:AppContentView ) {
		this.app = appContentView.app;
		this.title = title;
	}

	routerOnActivate(){
		let title:string = "AppDev | "+this.app.name+" | Edit";
		this.title.setTitle(title);
	}
}

export default EditAppView;
