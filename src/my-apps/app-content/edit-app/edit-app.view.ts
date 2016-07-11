import { Component } from "@angular/core";

import "semantic-ui/semantic";

// import template from "./create-app.view.html!";

@Component( {
	selector: "cp-edit-app-view",
	template: "<h3>Edit App View</h3>",
	styles: [ ":host { display: block; }" ],
} )
export class EditAppView {

	constructor() { }

}

export default EditAppView;
