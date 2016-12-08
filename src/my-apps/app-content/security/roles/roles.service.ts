import { Injectable } from "@angular/core";

import Carbon from "carbonldp/Carbon";
import * as App from "carbonldp/App";
import * as Roles from "carbonldp/Auth/Roles";
import * as PersistedRole from "carbonldp/Auth/PersistedRole";
import * as HTTP from "carbonldp/HTTP";
import * as Utils from "carbonldp/Utils";

@Injectable()
export class RolesService {

	carbon:Carbon;
	appContextsRoles:Map<string, Map<string, PersistedRole.Class>>;

	constructor( carbon:Carbon ) {
		this.carbon = carbon;
		this.appContextsRoles = new Map<string, Map<string, PersistedRole.Class>>();
	}

	getAll( appContext:App.Context ):Promise<PersistedRole.Class[]> {
		let uri:string = appContext.getBaseURI() + "roles/";
		let existingRoles:Map <string, PersistedRole.Class> = this.appContextsRoles.get( appContext.getBaseURI() );
		existingRoles = typeof existingRoles === "undefined" ? new Map<string, PersistedRole.Class>() : existingRoles;
		return this.carbon.documents.getChildren<PersistedRole.Class>( uri ).then( ( [roles, response]:[PersistedRole.Class[], HTTP.Response.Class] ) => {
			roles.filter( ( role:PersistedRole.Class ) => ! existingRoles.has( role.id ) )
				.forEach( ( role:PersistedRole.Class ) => existingRoles.set( role.id, role ) );
			return Utils.A.from( existingRoles.values() );
		} );
	}

	registerAgent( appContext:App.Context, agentID:string, roleID:string ):Promise<HTTP.Response.Class> {
		class MockedRoles extends Roles.Class {}
		let roles:Roles.Class = new MockedRoles( appContext );
		return roles.addAgent( roleID, agentID )
	}

	removeAgent( appContext:App.Context, agentID:string, roleID:string ):Promise<HTTP.Response.Class> {
		class MockedRoles extends Roles.Class {}
		let roles:Roles.Class = new MockedRoles( appContext );
		return roles.removeAgent( roleID, agentID )
	}

}

export default RolesService;