import { Component } from "@angular/core";
import { Title } from "@angular/platform-browser";

import "semantic-ui/semantic";

import { CreateAppComponent } from "./create-app.component";

import template from "./create-app.view.html!";

@Component( {
	selector: "cp-create-app-view",
	template: template,
	styles: [ ":host { display: block; }" ],
	directives: [ CreateAppComponent ],
} )
export class CreateAppView {
	private title:Title;

	constructor( title:Title ) {
		this.title = title;
	}

	routerOnActivate() {
		this.title.setTitle( "AppDev | Create App" );
	}
}

export default CreateAppView;
