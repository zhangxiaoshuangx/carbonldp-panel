import { Component, Input } from "@angular/core";

import * as App from "carbonldp/App";

import "semantic-ui/semantic";

@Component( {
	selector: "cp-configuration",
	templateUrl: "./configuration.component.html",
	styleUrls: [ "./configuration.component.scss" ],
} )

export class ConfigurationComponent {

	@Input() appContext:App.Context;

	constructor() { }

}

export default ConfigurationComponent;
