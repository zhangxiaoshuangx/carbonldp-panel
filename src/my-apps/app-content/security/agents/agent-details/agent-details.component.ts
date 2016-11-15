import { Component, Input, AfterViewInit } from "@angular/core";

import * as Agent from "carbonldp/Auth/Agent";

import template from "./agent-details.component.html!";

@Component( {
	selector: "cp-agent-details",
	template: template,
	host: {
		"class": "ui segment"
	},
	styles: [ ":host{ display:block; }" ],
} )

export class AgentDetailsComponent implements AfterViewInit {


	@Input() agent:Agent.Class;


	constructor() {}

	ngAfterViewInit():void {
		console.log( this.agent );
	}
}

export default AgentDetailsComponent;
