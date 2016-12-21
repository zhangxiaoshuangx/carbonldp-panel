import { Component, Input, EventEmitter } from "@angular/core";

import * as App from "carbonldp/App";

import template from "./roles-browser.component.html!";
import style from "./roles-browser.component.css!text";


@Component( {
	selector: "cp-roles-browser",
	template: template,
	styles: [ style ],
} )
export class RolesBrowserComponent {

	@Input() appContext:App.Context;

	constructor() {}
}

export default RolesBrowserComponent;