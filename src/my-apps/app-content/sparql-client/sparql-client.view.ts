import { Component, Host, Inject, forwardRef } from "@angular/core";
import { Title } from "@angular/platform-browser";

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
	app:App.Class;
	appContext:App.Context;
	private title:Title;
	private errorsAreaService:ErrorsAreaService;

	constructor( title:Title, errorsAreaService:ErrorsAreaService, @Host() @Inject( forwardRef( () => AppContentView ) ) appContent:AppContentView ) {
		this.app = appContent.app;
		this.appContext = appContent.app.context;
		this.errorsAreaService = errorsAreaService;
		this.title = title;
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

	routerOnActivate() {
		let title:string = "AppDev | " + this.app.name + " | SPARQL";
		this.title.setTitle( title );
	}

}

export default SPARQLClientView;
