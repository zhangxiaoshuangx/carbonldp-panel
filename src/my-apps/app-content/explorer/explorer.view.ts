import { Component, Host, Inject, forwardRef } from "@angular/core";

import { AppContentView } from "./../app-content.view";
import * as App from "./../app";

import "semantic-ui/semantic";

import template from "./explorer.view.html!";

@Component( {
	selector: "cp-explorer-view",
	template: template,
	styles: [ ":host { display: block; }" ],
} )
export class ExplorerView {
	app:App.Class;

	constructor( @Host() @Inject( forwardRef( () => AppContentView ) ) appContent:AppContentView ) {
		this.app = appContent.app;
		console.log( this.app );
	}

}

export default ExplorerView;
