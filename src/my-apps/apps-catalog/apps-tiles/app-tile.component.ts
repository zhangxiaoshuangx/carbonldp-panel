import { Component, Input, Output, EventEmitter } from "@angular/core";
import { ROUTER_DIRECTIVES } from "@angular/router-deprecated";

import * as App from "../../app-content/app";
import { AppActionButtonsComponent } from "../app-action-buttons/app-action-buttons.component";

import "semantic-ui/semantic";

import template from "./app-tile.component.html!";

@Component( {
	selector: "cp-app-tile",
	template: template,
	styles: [ ":host { display: block; }" ],
	directives: [ ROUTER_DIRECTIVES, AppActionButtonsComponent ],
} )
export class AppTileComponent {
	@Input() app:App.Class;
	@Output() deleteApp:EventEmitter<App.Class> = new EventEmitter<App.Class>();

	constructor() {}

	onDeleteApp( app:App.Class ):void {
		this.deleteApp.emit( app );
	}
}

export default AppTileComponent;
