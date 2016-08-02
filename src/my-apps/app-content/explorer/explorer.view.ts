import { Component, Host, Inject, forwardRef } from "@angular/core";
import { Title } from "@angular/platform-browser";

import { AppContentView } from "./../app-content.view";
import * as App from "./../app";
import { DocumentExplorerComponent } from "./document-explorer/document-explorer.component";

import "semantic-ui/semantic";

import template from "./explorer.view.html!";

@Component( {
	selector: "cp-explorer-view",
	template: template,
	styles: [ ":host { display: block; }" ],
	directives: [ DocumentExplorerComponent ],
} )
export class ExplorerView {
	app:App.Class;
	private title:Title;

	constructor( title:Title, @Host() @Inject( forwardRef( () => AppContentView ) ) appContent:AppContentView ) {
		this.app = appContent.app;
		this.title = title;
	}

	routerOnActivate() {
		let title:string = "AppDev | " + this.app.name + " | Explorer";
		this.title.setTitle( title );
	}

}

export default ExplorerView;
