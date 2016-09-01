import { Component, Input, Output, EventEmitter } from "@angular/core";

import * as App from "../../app-content/app";

import "semantic-ui/semantic";

import template from "./app-tile.component.html!";

@Component( {
	selector: "cp-app-tile",
	template: template,
	styles: [ ":host { display: block; }" ],
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
