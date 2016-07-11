import { Component } from "@angular/core";

import "semantic-ui/semantic";

// import template from "./create-app.view.html!";

@Component( {
	selector: "cp-sparql-client-view",
	template: "<h3>SPARQL Client View</h3>",
	styles: [ ":host { display: block; }" ],
} )
export class SPARQLClientView {

	constructor() { }

}

export default SPARQLClientView;
