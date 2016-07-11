import { Component } from "@angular/core";

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

	constructor() { }

}

export default CreateAppView;
