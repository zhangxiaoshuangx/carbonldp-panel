import { Component } from "@angular/core";

import "semantic-ui/semantic";

// import template from "./create-app.view.html!";

@Component( {
	selector: "cp-configuration-view",
	template: "<h3>Configuration View</h3>",
	styles: [ ":host { display: block; }" ],
} )
export class ConfigurationView {

	constructor() { }

}

export default ConfigurationView;
