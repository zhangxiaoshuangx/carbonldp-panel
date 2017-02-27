import { Component } from "@angular/core";

import * as App from "carbonldp/App";

import { AppContentService } from "./../../app-content/app-content.service";
import { MessagesAreaService } from "carbonldp-panel/messages-area/messages-area.service";

@Component( {
	selector: "cp-sparql-client-view",
	templateUrl: "./sparql-client.view.html",
	styles: [ ":host { display: block; }" ],
} )
export class SPARQLClientView {
	$element:JQuery;
	appContext:App.Context;
	canDisplay:boolean = true;
	private messagesAreaService:MessagesAreaService;

	constructor( messagesAreaService:MessagesAreaService, appContentService:AppContentService ) {
		this.appContext = appContentService.activeApp.context;
		this.messagesAreaService = messagesAreaService;
		appContentService.onAppHasChanged.subscribe( ( app:App.Class ) => {
			this.appContext = appContentService.activeApp.context;
			this.canDisplay = false;
			setTimeout( () => { this.canDisplay = true;}, 0 );
		} );
	}

	notifyErrorAreaService( error:any ):void {
		this.messagesAreaService.addMessage(
			error.title,
			error.content,
			error.type,
			error.statusCode,
			error.statusMessage,
			error.endpoint
		);
	}

}

export default SPARQLClientView;
