import { Injectable } from "@angular/core";

import Carbon from "carbonldp/Carbon";
import * as App from "carbonldp/App";
import * as Agent from "carbonldp/Auth/Agent";
import * as Agents from "carbonldp/Auth/Agents";
import * as PersistedAgent from "carbonldp/Auth/PersistedAgent";
import * as HTTP from "carbonldp/HTTP";
import * as Utils from "carbonldp/Utils";

@Injectable()
export class AgentsService {

	private carbon:Carbon;
	public appContextsAgents:Map<string, Map<string, PersistedAgent.Class>>;

	constructor( carbon:Carbon ) {
		this.carbon = carbon;
		this.appContextsAgents = new Map<string, Map<string, PersistedAgent.Class>>();
	}

	public getAll( appContext:App.Context ):Promise<PersistedAgent.Class[]> {
		let uri:string = appContext.getBaseURI() + "agents/";
		let existingAgents:Map <string, PersistedAgent.Class> = this.appContextsAgents.get( appContext.getBaseURI() );
		existingAgents = typeof existingAgents === "undefined" ? new Map<string, PersistedAgent.Class>() : existingAgents;
		return this.carbon.documents.getChildren<PersistedAgent.Class>( uri ).then( ( [agents, response]:[PersistedAgent.Class[], HTTP.Response.Class] ) => {
			agents.filter( ( agent:PersistedAgent.Class ) => ! existingAgents.has( agent.id ) )
				.forEach( ( agent:PersistedAgent.Class ) => existingAgents.set( agent.id, agent ) );
			return Utils.A.from( existingAgents.values() );
		} );
	}

	public saveAgent( appContext:App.Context, agent:PersistedAgent.Class ):Promise<[PersistedAgent.Class, [HTTP.Response.Class,HTTP.Response.Class]]> {
		return agent.save();
	}

	public saveAndRefreshAgent( appContext:App.Context, agent:PersistedAgent.Class ):Promise<[PersistedAgent.Class, [HTTP.Response.Class,HTTP.Response.Class]]> {
		return agent.saveAndRefresh();
	}

	public createAgent( appContext:App.Context, agent:Agent.Class, slug?:string ):Promise<[PersistedAgent.Class, [HTTP.Response.Class,HTTP.Response.Class]]> {
		class MockedAgents extends Agents.Class {}
		let agents:Agents.Class = new MockedAgents( appContext );
		return agents.register( agent, slug );
	}

}

export default AgentsService;