import { Component, } from "@angular/core";

import { AppContentService } from "./../../app-content/app-content.service";
import * as App from "./../app";

import template from "./explorer.view.html!";

@Component( {
	selector: "cp-explorer-view",
	template: template,
	styles: [ ":host { display: block; }" ],
} )
export class ExplorerView {
	app:App.Class;
	canDisplay:boolean = true;

	constructor( appContentService:AppContentService ) {
		this.app = appContentService.activeApp;
		appContentService.onAppHasChanged.subscribe( ( app:App.Class )=> {
			this.app = app;
			this.canDisplay = false;
			setTimeout( ()=> { this.canDisplay = true;}, 0 );
		} );
	}

}

export default ExplorerView;
