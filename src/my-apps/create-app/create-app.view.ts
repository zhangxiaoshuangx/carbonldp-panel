import { Component } from "@angular/core";

import "semantic-ui/semantic";

import template from "./create-app.view.html!";

@Component( {
	selector: "cp-create-app-view",
	template: template,
	styles: [ ":host { display: block; }" ],
} )

export class CreateAppView {
}

export default CreateAppView;
