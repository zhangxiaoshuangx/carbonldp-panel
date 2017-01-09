import Carbon from "carbonldp/Carbon";
import * as App from "carbonldp/App";
import * as PersistedRole from "carbonldp/App/PersistedRole";
import * as HTTP from "carbonldp/HTTP";
export declare class RolesService {
    carbon: Carbon;
    appContextsRoles: Map<string, Map<string, PersistedRole.Class>>;
    constructor(carbon: Carbon);
    get(slugOrURI: string, appContext: App.Context): Promise<PersistedRole.Class>;
    getAll(appContext: App.Context, limit?: number, page?: number, orderBy?: string, ascending?: boolean): Promise<PersistedRole.Class[]>;
    create(appContext: App.Context, parentRole: string | PersistedRole.Class, role: PersistedRole.Class, slug?: string): Promise<PersistedRole.Class>;
    delete(appContext: App.Context, role: PersistedRole.Class): Promise<HTTP.Response.Class>;
    saveAndRefresh(appContext: App.Context, role: PersistedRole.Class): Promise<[PersistedRole.Class, [HTTP.Response.Class, HTTP.Response.Class]]>;
    registerAgent(appContext: App.Context, agentID: string, roleID: string): Promise<HTTP.Response.Class>;
    removeAgent(appContext: App.Context, agentID: string, roleID: string): Promise<HTTP.Response.Class>;
    getNumberOfRoles(appContext: App.Context): Promise<number>;
    getChildren(appContext: App.Context, roleID?: string): Promise<PersistedRole.Class[]>;
    private getSortedRoles(roles, orderBy, ascending);
}
export default RolesService;
