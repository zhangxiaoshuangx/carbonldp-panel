import { Component, Input, Output, EventEmitter } from "@angular/core";

import * as App from "../../app-content/app";
import { AppActionButtonsComponent } from "../app-action-buttons/app-action-buttons.component";

import "semantic-ui/semantic";

import template from "./app-tile.component.html!";
import style from "./app-tile.component.css!text";

@Component( {
	selector: "cp-app-tile",
	template: template,
	styles: [ style ],
	directives: [ AppActionButtonsComponent ],
} )
export class AppTileComponent {
	@Input() app:App.Class;
	@Output() openApp:EventEmitter<App.Class> = new EventEmitter<App.Class>();
	@Output() deleteApp:EventEmitter<App.Class> = new EventEmitter<App.Class>();

	constructor() {}

	onOpenApp( app:App.Class ):void {
		this.openApp.emit( app );
	}

	onDeleteApp( app:App.Class ):void {
		this.deleteApp.emit( app );
	}
}

export default AppTileComponent;
