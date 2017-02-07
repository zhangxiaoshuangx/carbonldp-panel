import { Component, Input } from "@angular/core";

import * as App from "carbonldp/App";

@Component( {
	selector: "cp-agents",
	template: require( "./agents.component.html" ),
	styles: [ require( "./agents.component.css" ) ],
} )

export class AgentsComponent {


	@Input() appContext:App.Context;


	constructor() { }

}

export default AgentsComponent;
