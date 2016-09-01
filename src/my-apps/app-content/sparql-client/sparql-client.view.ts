import { Component } from "@angular/core";

import * as App from "carbonldp/App";

import { AppContentService } from "./../../app-content/app-content.service";
import { ErrorsAreaService } from "carbon-panel/errors-area/errors-area.service";

import template from "./sparql-client.view.html!";

@Component( {
	selector: "cp-sparql-client-view",
	template: template,
	styles: [ ":host { display: block; }" ],
} )
export class SPARQLClientView {
	$element:JQuery;
	appContext:App.Context;
	private errorsAreaService:ErrorsAreaService;

	constructor( errorsAreaService:ErrorsAreaService, appContentService:AppContentService ) {
		this.appContext = appContentService.activeApp.context;
		this.errorsAreaService = errorsAreaService;
	}

	notifyErrorAreaService( error:any ):void {
		this.errorsAreaService.addError(
			error.title,
			error.content,
			error.statusCode,
			error.statusMessage,
			error.endpoint
		);
	}

}

export default SPARQLClientView;
