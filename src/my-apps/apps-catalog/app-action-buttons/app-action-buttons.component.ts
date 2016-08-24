import { Component, Input, Output, EventEmitter } from "@angular/core";
//import { ROUTER_DIRECTIVES } from "@angular/router-deprecated";

import * as App from "../../app-content/app";

import "semantic-ui/semantic";

import template from "./app-action-buttons.component.html!";

@Component( {
	selector: "cp-app-action-buttons",
	template: template,
	styles: [ ":host { display:block; }" ],
	//directives: [ ROUTER_DIRECTIVES ],
} )
export class AppActionButtonsComponent {
	@Input() app:App.Class;
	@Output() deleteApp:EventEmitter<App.Class> = new EventEmitter<App.Class>();

	constructor() { }

	onDeleteApp( event:Event ):void {
		event.stopPropagation();
		this.deleteApp.emit( this.app );
	}

	avoidRowClick( event:Event ):void {
		event.stopPropagation();
	}
}

export default AppActionButtonsComponent;
