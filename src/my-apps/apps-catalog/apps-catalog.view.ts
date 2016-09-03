import { Component } from "@angular/core";

import "semantic-ui/semantic";

import template from "./apps-catalog.view.html!";

@Component( {
	selector: "cp-apps-catalog-view",
	template: template,
	styles: [ ":host { display: block; }" ],
} )
export class AppsCatalogView {
}

export default AppsCatalogView;
