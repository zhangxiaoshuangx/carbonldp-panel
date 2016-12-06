import { Component, Input, OnInit } from "@angular/core";

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

export class AgentsListComponent implements OnInit {

	private agentsService:AgentsService;

	private agents:PersistedAgent.Class[] = [];
	private loading:boolean = false;
	private inspectingAgent:PersistedAgent.Class;
	private mode:string = AgentDetailsModes.READ;
	private agentDetailsModes:AgentDetailsModes = AgentDetailsModes;
	private deletingAgent:Agent.Class;
	private activePage:number;
	private totalAgents:number = 0;
	private _agentsPerPage:number = 5;
	private set agentsPerPage( value:number ) {
		this._agentsPerPage = value;
		this.updateAgents();
	};

	private get agentsPerPage():number {
		return this._agentsPerPage;
	};

	private headers:Header[] = [ { name: "Name", value: "name" }, { name: "Created", value: "created" }, { name: "Modified", value: "modified" } ];
	private sortedColumn:string = "name";
	private ascending:boolean = false;


	@Input() appContext:App.Context;


	constructor( agentsService:AgentsService ) {
		this.agentsService = agentsService;
	}

	ngOnInit():void {
		this.loadAgents();
	}

	private loadAgents():void {
		this.activePage = 0;
		this.loading = true;
		this.getNumberOfAgents().then( ( amount:number ) => {
			this.totalAgents = amount;
		} );
		this.updateAgents()
	}

	private updateAgents():void {
		this.loading = true;
		this.getAgents().then( ( agents:PersistedAgent.Class[] ) => {
			this.agents = agents;
			this.loading = false;
		} );
	}

	private getAgents():Promise<PersistedAgent.Class[]> {
		return this.agentsService.getAll( this.appContext, this.agentsPerPage, this.activePage, this.sortedColumn, this.ascending ).then( ( agents:PersistedAgent.Class[] ) => {
			return agents.filter( ( agent:PersistedAgent.Class ) => { return agent.id.indexOf( "/agents/me/" ) === - 1 } );
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

	private onClickDeleteAgent( event:Event, agent:Agent.Class ):void {
		event.stopPropagation();
		this.deletingAgent = agent;
	}

	private getNumberOfAgents():Promise<number> {
		return this.agentsService.getNumberOfAgents( this.appContext );
	}

	private changePage( page:number ):void {
		this.activePage = page;
		this.updateAgents();
	}

	private sortColumn( header:Header ):void {
		if( this.sortedColumn === header.value ) this.ascending = ! this.ascending;
		this.sortedColumn = header.value;
		this.updateAgents();
	}
}

export interface Header {
	name:string;
	value:string;
}

export default AgentsListComponent;
