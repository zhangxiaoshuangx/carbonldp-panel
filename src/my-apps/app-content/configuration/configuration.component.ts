import { Component, Input } from "@angular/core";

import * as App from "carbonldp/App";

import "semantic-ui/semantic";

@Component( {
	selector: "cp-configuration",
	template: require( "./configuration.component.html" ),
	styles: [ require( "./configuration.component.css" ) ],
} )

export class ConfigurationComponent {

	@Input() appContext:App.Context;

	constructor() { }

}

export default ConfigurationComponent;
