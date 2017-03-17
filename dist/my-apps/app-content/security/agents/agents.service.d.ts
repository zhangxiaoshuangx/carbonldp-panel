import { EventEmitter } from "@angular/core";
import { Carbon } from "carbonldp/Carbon";
import * as App from "carbonldp/App";
import * as Agent from "carbonldp/Auth/Agent";
import * as PersistedAgent from "carbonldp/Auth/PersistedAgent";
import * as HTTP from "carbonldp/HTTP";
import { AppContentService } from "carbonldp-panel/my-apps/app-content/app-content.service";
export declare class AgentsService {
    private carbon;
    appContextsAgents: Map<string, Map<string, PersistedAgent.Class>>;
    private appContentService;
    private _activeAgent;
    activeAgent: PersistedAgent.Class;
    onAgentHasChanged: EventEmitter<PersistedAgent.Class>;
    constructor(carbon: Carbon, appContentService: AppContentService);
    get(slugOrURI: string, appContext: App.Context): Promise<PersistedAgent.Class>;
    getAll(appContext: App.Context, limit?: number, page?: number, orderBy?: string, ascending?: boolean): Promise<PersistedAgent.Class[]>;
    getNumberOfAgents(appContext: App.Context): Promise<number>;
    saveAgent(appContext: App.Context, agent: PersistedAgent.Class): Promise<[PersistedAgent.Class, HTTP.Response.Class]>;
    saveAndRefreshAgent(appContext: App.Context, agent: PersistedAgent.Class): Promise<[PersistedAgent.Class, [HTTP.Response.Class, HTTP.Response.Class]]>;
    createAgent(appContext: App.Context, agent: Agent.Class, slug?: string): Promise<[PersistedAgent.Class, HTTP.Response.Class]>;
    deleteAgent(appContext: App.Context, agent: Agent.Class, slug?: string): Promise<HTTP.Response.Class>;
    private getSortedAgents(agents, orderBy, ascending);
}
