import Carbon from "carbonldp/Carbon";
import * as App from "carbonldp/App";
import * as Agent from "carbonldp/Auth/Agent";
import * as PersistedAgent from "carbonldp/Auth/PersistedAgent";
import * as HTTP from "carbonldp/HTTP";
export declare class AgentsService {
    private carbon;
    appContextsAgents: Map<string, Map<string, PersistedAgent.Class>>;
    constructor(carbon: Carbon);
    getAll(appContext: App.Context): Promise<PersistedAgent.Class[]>;
    saveAgent(appContext: App.Context, agent: PersistedAgent.Class): Promise<[PersistedAgent.Class, [HTTP.Response.Class, HTTP.Response.Class]]>;
    saveAndRefreshAgent(appContext: App.Context, agent: PersistedAgent.Class): Promise<[PersistedAgent.Class, [HTTP.Response.Class, HTTP.Response.Class]]>;
    createAgent(appContext: App.Context, agent: Agent.Class, slug?: string): Promise<[PersistedAgent.Class, [HTTP.Response.Class, HTTP.Response.Class]]>;
    deleteAgent(appContext: App.Context, agent: Agent.Class, slug?: string): Promise<HTTP.Response.Class>;
}
export default AgentsService;
