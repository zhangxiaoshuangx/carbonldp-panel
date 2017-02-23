import { Component } from "@angular/core";

import * as App from "carbonldp-panel/my-apps/app-content/app";

import { AppContentService } from "carbonldp-panel/my-apps/app-content/app-content.service";

import template from "./roles-browser.view.html!";

@Component( {
	selector: "cp-roles-browser-view",
	template: template,
	styles: [ ":host { display: block; }" ]
} )

export class RolesBrowserView {

	private app:App.Class;
	private canDisplay:boolean = true;

	constructor( appContentService:AppContentService ) {
		this.app = appContentService.activeApp;
		appContentService.onAppHasChanged.subscribe( ( app:App.Class ) => {
			this.app = app;
			this.canDisplay = false;
			setTimeout( () => { this.canDisplay = true;}, 0 );
		} );
	}

}

export default RolesBrowserView;