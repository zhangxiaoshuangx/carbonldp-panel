import { Injectable } from "@angular/core";

import Carbon from "carbonldp/Carbon";
import * as App from "carbonldp/App";
import * as PersistedAgent from "carbonldp/Auth/PersistedAgent";
import * as HTTP from "carbonldp/HTTP";
import * as Utils from "carbonldp/Utils";

@Injectable()
export class AgentsService {

	private carbon:Carbon;
	public appContextsRoles:Map<string, Map<string, PersistedAgent.Class>>;

	constructor( carbon:Carbon ) {
		this.carbon = carbon;
		this.appContextsRoles = new Map<string, Map<string, PersistedAgent.Class>>();
	}

	public getAll( appContext:App.Context ):Promise<PersistedAgent.Class[]> {
		let uri:string = appContext.getBaseURI() + "agents/";
		let existingRoles:Map <string, PersistedAgent.Class> = this.appContextsRoles.get( appContext.getBaseURI() );
		existingRoles = typeof existingRoles === "undefined" ? new Map<string, PersistedAgent.Class>() : existingRoles;
		return this.carbon.documents.getChildren<PersistedAgent.Class>( uri ).then( ( [roles, response]:[PersistedAgent.Class[], HTTP.Response.Class] ) => {
			roles.filter( ( role:PersistedAgent.Class ) => ! existingRoles.has( role.id ) )
				.forEach( ( role:PersistedAgent.Class ) => existingRoles.set( role.id, role ) );
			return Utils.A.from( existingRoles.values() );
		} );
	}

}

export default AgentsService;