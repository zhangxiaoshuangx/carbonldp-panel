import { Component, Input, Output, EventEmitter } from "@angular/core";

import * as App from "../../app-content/app";
//import { AppActionButtonsComponent } from "../app-action-buttons/app-action-buttons.component";
//import { AppTileComponent } from "./app-tile.component";

import "semantic-ui/semantic";

import template from "./apps-tiles.component.html!";
@Component( {
	selector: "cp-apps-tiles",
	template: template,
	styles: [ ":host { display: block; }" ],
	//directives: [ AppActionButtonsComponent, AppTileComponent ],
} )
export class AppsTilesComponent {
	@Input() apps:App.Class[];
	@Output() deleteApp:EventEmitter<App.Class> = new EventEmitter<App.Class>();

	constructor() {}

	onDeleteApp( app:App.Class ):void {
		this.deleteApp.emit( app );
	}
}

export default AppsTilesComponent;
