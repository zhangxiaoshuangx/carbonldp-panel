import { Component } from "@angular/core";

import "semantic-ui/semantic";

// import template from "./create-app.view.html!";

@Component( {
	selector: "cp-dashboard-view",
	template: "<h3>Dashboard View</h3>",
	styles: [ ":host { display: block; }" ],
} )
export class DashboardView {

	constructor() { }

}

export default DashboardView;
