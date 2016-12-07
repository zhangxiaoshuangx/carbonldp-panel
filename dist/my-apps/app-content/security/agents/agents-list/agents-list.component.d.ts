import * as App from "carbonldp/App";
import * as Agent from "carbonldp/Auth/Agent";
import { AgentsService } from "../agents.service";
export declare class AgentsListComponent {
    private agentsService;
    private agents;
    private loading;
    private inspectingAgent;
    private mode;
    private AgentDetailsModes;
    private deletingAgent;
    appContext: App.Context;
    constructor(agentsService: AgentsService);
    ngOnInit(): void;
    private loadAgents();
    private openAgent(event, agent);
    private edit(event, agent);
    private getSlug(slug);
    private refreshAgents();
    private closeDetails();
    private createAgent();
    onClickDeleteAgent(event: Event, agent: Agent.Class): void;
}
export default AgentsListComponent;
