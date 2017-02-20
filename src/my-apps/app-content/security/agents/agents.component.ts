import { Component, Input } from "@angular/core";

import * as App from "carbonldp/App";

@Component( {
	selector: "cp-agents",
	templateUrl: "./agents.component.html",
	styleUrls: [  "./agents.component.scss"  ],
} )

export class AgentsComponent {


	@Input() appContext:App.Context;


	constructor() { }

}

export default AgentsComponent;
