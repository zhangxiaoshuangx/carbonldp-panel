import { Component, Input } from "@angular/core";

import * as App from "carbonldp/App";

import template from "./agents.component.html!";
import style from "./agents.component.css!text";

@Component( {
	selector: "cp-agents",
	template: template,
	styles: [ style ],
} )

export class AgentsComponent {


	@Input() appContext:App.Context;


	constructor() { }

}

export default AgentsComponent;
