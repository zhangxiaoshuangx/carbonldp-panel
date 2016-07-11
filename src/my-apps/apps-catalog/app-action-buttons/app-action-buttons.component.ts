import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Router, ROUTER_DIRECTIVES } from "@angular/router-deprecated";

import * as App from "../../app/app";

import "semantic-ui/semantic";

import template from "./app-action-buttons.component.html!";

@Component( {
	selector: "cp-app-action-buttons",
	template: template,
	directives: [ ROUTER_DIRECTIVES ],
} )
export class AppActionButtonsComponent {
	router:Router;
	@Input() app:App.Class;
	@Output() deleteApp:EventEmitter<App.Class> = new EventEmitter<App.Class>();

	constructor( router:Router ) {
		this.router = router;
	}

	onDeleteApp( event:Event ):void {
		event.stopPropagation();
		this.deleteApp.emit( this.app );
	}

	avoidRowClick( event:Event ):void {
		event.stopPropagation();
	}
}

export default AppActionButtonsComponent;
