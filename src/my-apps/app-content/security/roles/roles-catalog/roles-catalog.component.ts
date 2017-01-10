import { Component, Input, EventEmitter } from "@angular/core";

import * as App from "carbonldp/App";

import template from "./roles-catalog.component.html!";


@Component( {
	selector: "cp-roles-catalog",
	template: template,
} )
export class RolesCatalogComponent {

	private refresher:EventEmitter<boolean> = new EventEmitter();

	@Input() appContext:App.Context;

	constructor() {}

}

export default RolesCatalogComponent;