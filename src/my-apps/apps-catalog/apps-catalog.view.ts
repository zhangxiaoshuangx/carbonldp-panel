import { Component } from "@angular/core";

import "semantic-ui/semantic";

@Component( {
	selector: "cp-apps-catalog-view",
	template: require( "./apps-catalog.view.html" ),
	styles: [ ":host { display: block; }" ],
} )
export class AppsCatalogView {
}

export default AppsCatalogView;
