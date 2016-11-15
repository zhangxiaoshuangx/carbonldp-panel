import { Component, Input } from "@angular/core";

import * as App from "carbonldp/App";

import template from "./agents.component.html!";

@Component( {
	selector: "cp-agents",
	template: template,
	styles: [ ":host{ display:block; }" ],
} )

export class AgentsComponent {


	@Input() appContext:App.Context;


	constructor() { }

}

export default AgentsComponent;
