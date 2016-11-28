import { Component, Input } from "@angular/core";

import * as App from "carbonldp/App";
import * as Agent from "carbonldp/Auth/Agent";
import * as PersistedAgent from "carbonldp/Auth/PersistedAgent";
import * as URI from "carbonldp/RDF/URI";

import { AgentsService } from "../agents.service";
import { Modes as AgentDetailsModes } from "../agent-details/agent-details.component";

import template from "./agents-list.component.html!";
import style from "./agents-list.component.css!text";

@Component( {
	selector: "cp-agents-list",
	template: template,
	styles: [ style ],
} )

export class AgentsListComponent {

	private agentsService:AgentsService;

	private agents:PersistedAgent.Class[] = [];
	private loading:boolean = false;
	private inspectingAgent:PersistedAgent.Class;
	private mode:string = AgentDetailsModes.READ;
	private AgentDetailsModes:AgentDetailsModes = AgentDetailsModes;


	@Input() appContext:App.Context;


	constructor( agentsService:AgentsService ) {
		this.agentsService = agentsService;
	}

	ngOnInit():void {
		this.loadAgents();
	}

	private loadAgents():void {
		this.loading = true;
		this.agentsService.getAll( this.appContext ).then( ( agents:PersistedAgent.Class[] ) => {
			agents = agents.filter( ( agent:PersistedAgent.Class ) => { return agent.id.indexOf( "/agents/me/" ) === - 1 } );
			this.loading = false;
			this.agents = agents;
		} );
	}

	private openAgent( event:Event, agent:PersistedAgent.Class ):void {
		event.stopPropagation();
		this.inspectingAgent = agent;
	}

	private edit( event:Event, agent:PersistedAgent.Class ):void {
		event.stopPropagation();
		this.inspectingAgent = agent;
	}

	private avoidRowClick( event:Event ):void {
		event.stopPropagation();
	}

	private getSlug( slug:string ):string {
		return URI.Util.getSlug( slug );
	}

	private refreshAgents():void {
		this.loadAgents();
	}

	private closeDetails():void {
		this.inspectingAgent = null;
		this.mode = AgentDetailsModes.READ;
	}

	private createAgent():void {
		this.mode = AgentDetailsModes.CREATE;
	}
}

export default AgentsListComponent;
