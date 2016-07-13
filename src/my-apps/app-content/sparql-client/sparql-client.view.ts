import { Component, Host, Inject, forwardRef } from "@angular/core";

import * as App from "carbonldp/App";

import { AppContentView } from "carbon-panel/my-apps/app-content/app-content.view";
import { ErrorsAreaService } from "carbon-panel/errors-area/errors-area.service";
import { SPARQLClientComponent } from "carbon-panel/sparql-client/sparql-client.component";

import "semantic-ui/semantic";

import template from "./sparql-client.view.html!";

@Component( {
	selector: "cp-sparql-client-view",
	template: template,
	styles: [ ":host { display: block; }" ],
	directives: [ SPARQLClientComponent ],
} )
export class SPARQLClientView {
	$element:JQuery;
	appContext:App.Context;
	private errorsAreaService:ErrorsAreaService;

	constructor( errorsAreaService:ErrorsAreaService, @Host() @Inject( forwardRef( () => AppContentView ) ) appContent:AppContentView ) {
		this.appContext = appContent.app.context;
		this.errorsAreaService = errorsAreaService;
	}


}

export default SPARQLClientView;
