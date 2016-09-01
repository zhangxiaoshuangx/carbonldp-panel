import { Component, Input } from "@angular/core";

import * as App from "carbonldp/App";

import "semantic-ui/semantic";

import template from "./configuration.component.html!";
import style from "./configuration.component.css!text";

@Component( {
	selector: "cp-configuration",
	template: template,
	styles: [ style ],
} )

export class ConfigurationComponent {

	@Input() appContext:App.Context;

	constructor() { }

}

export default ConfigurationComponent;
