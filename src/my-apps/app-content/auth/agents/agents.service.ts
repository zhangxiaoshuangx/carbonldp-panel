import { Injectable, EventEmitter } from "@angular/core";

import Carbon from "carbonldp/Carbon";
import * as App from "carbonldp/App";
import * as Agent from "carbonldp/Auth/Agent";
import * as Agents from "carbonldp/Auth/Agents";
import * as PersistedAgent from "carbonldp/Auth/PersistedAgent";
import * as HTTP from "carbonldp/HTTP";
import * as Utils from "carbonldp/Utils";
import * as URI from "carbonldp/RDF/URI";
import { AppContentService } from "carbonldp-panel/my-apps/app-content/app-content.service";

@Injectable()
export class AgentsService {

	private carbon:Carbon;
	public appContextsAgents:Map<string, Map<string, PersistedAgent.Class>>;
	private appContentService:AppContentService;
	private _activeAgent:PersistedAgent.Class;
	public set activeAgent( app:PersistedAgent.Class ) {
		this._activeAgent = app;
		this.onAgentHasChanged.emit( this.activeAgent );
	}

	public get activeAgent():PersistedAgent.Class {
		return this._activeAgent;
	}

	public onAgentHasChanged:EventEmitter<PersistedAgent.Class> = new EventEmitter<App.Class>();

	constructor( carbon:Carbon, appContentService:AppContentService ) {
		this.carbon = carbon;
		this.appContextsAgents = new Map<string, Map<string, PersistedAgent.Class>>();
		this.appContentService = appContentService;
	}

	public get( slugOrURI:string, appContext:App.Context ):Promise<PersistedAgent.Class> {
		let uri:string = appContext.getBaseURI() + `agents/${slugOrURI}/`;
		if( URI.Util.isAbsolute( slugOrURI ) ) uri = slugOrURI;
		let existingAgents:Map <string, PersistedAgent.Class> = this.appContextsAgents.get( appContext.getBaseURI() );
		existingAgents = typeof existingAgents === "undefined" ? new Map<string, PersistedAgent.Class>() : existingAgents;
		return appContext.documents.get<PersistedAgent.Class>( uri ).then( ( [agent, response]:[PersistedAgent.Class, HTTP.Response.Class] ) => {
			existingAgents.set( agent.id, agent );
			return agent;
		} );
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
		let agents:Agents.Class = appContext.auth.agents;
		return agents.register( agent, slug );
	}

	public deleteAgent( appContext:App.Context, agent:Agent.Class, slug?:string ):Promise<HTTP.Response.Class> {
		let agents:Agents.Class = appContext.auth.agents;
		return agents.delete( agent.id );
	}
}

export default AgentsService;