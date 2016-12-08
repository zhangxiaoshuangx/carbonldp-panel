import Carbon from "carbonldp/Carbon";
import * as App from "carbonldp/App";
import * as PersistedRole from "carbonldp/Auth/PersistedRole";
import * as HTTP from "carbonldp/HTTP";
export declare class RolesService {
    carbon: Carbon;
    appContextsRoles: Map<string, Map<string, PersistedRole.Class>>;
    constructor(carbon: Carbon);
    getAll(appContext: App.Context, limit?: number, page?: number, orderBy?: string, ascending?: boolean): Promise<PersistedRole.Class[]>;
    registerAgent(appContext: App.Context, agentID: string, roleID: string): Promise<HTTP.Response.Class>;
    removeAgent(appContext: App.Context, agentID: string, roleID: string): Promise<HTTP.Response.Class>;
    getNumberOfRoles(appContext: App.Context): Promise<number>;
    private getSortedRoles(roles, orderBy, ascending);
}
export default RolesService;
