import { Component, Input, Output, EventEmitter } from "@angular/core";

import * as App from "../../app/app";
import { AppActionButtonsComponent } from "../app-action-buttons/app-action-buttons.component";
import { AppTileComponent } from "./app-tile.component";

import "semantic-ui/semantic";

import template from "./apps-tiles.component.html!";
import style from "./apps-tiles.component.css!text";

@Component( {
	selector: "cp-apps-tiles",
	template: template,
	styles: [ style ],
	directives: [ AppActionButtonsComponent, AppTileComponent ],
} )
export class AppsTilesComponent {
	@Input() apps:App.Class[];
	@Output() openApp:EventEmitter<App.Class> = new EventEmitter<App.Class>();
	@Output() deleteApp:EventEmitter<App.Class> = new EventEmitter<App.Class>();

	constructor() {}

	onOpenApp( appContext:App.Class ):void {
		this.openApp.emit( appContext );
	}

	onDeleteApp( appContext:App.Class ):void {
		this.deleteApp.emit( appContext );
	}
}

export default AppsTilesComponent;
