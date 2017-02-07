import { Component } from "@angular/core";

import "semantic-ui/semantic";

@Component( {
	selector: "cp-create-app-view",
	template: require( "./create-app.view.html" ),
	styles: [ ":host { display: block; }" ],
} )

export class CreateAppView {
}

export default CreateAppView;
