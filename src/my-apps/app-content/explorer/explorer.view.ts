import { Component } from "@angular/core";

import "semantic-ui/semantic";

// import template from "./create-app.view.html!";

@Component( {
	selector: "cp-explorer-view",
	template: "<h3>Explorer View</h3>",
	styles: [ ":host { display: block; }" ],
} )
export class ExplorerView {

	constructor() { }

}

export default ExplorerView;
