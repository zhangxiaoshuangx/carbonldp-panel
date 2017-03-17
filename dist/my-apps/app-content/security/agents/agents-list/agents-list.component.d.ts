import { OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import * as App from "carbonldp/App";
import * as Agent from "carbonldp/Auth/Agent";
import * as PersistedAgent from "carbonldp/Auth/PersistedAgent";
import { AgentsService } from "../agents.service";
import { Message } from "carbonldp-panel/messages-area/message.component";
export declare class AgentsListComponent implements OnInit {
    private router;
    private route;
    private agentsService;
    private activePage;
    private totalAgents;
    private agentsPerPage;
    private headers;
    private sortedColumn;
    private ascending;
    errorMessage: Message;
    agents: PersistedAgent.Class[];
    loading: boolean;
    deletingAgent: Agent.Class;
    appContext: App.Context;
    constructor(router: Router, route: ActivatedRoute, agentsService: AgentsService);
    ngOnInit(): void;
    private loadAgents();
    private getAgents();
    private openAgent(event, agent);
    private onClickEditAgent(event, agent);
    private goToAgent(agent, edit?);
    refreshAgents(): void;
    private onClickDeleteAgent(event, agent);
    private getNumberOfAgents();
    private changePage(page);
    private changeAgentsPerPage(agentsPerPage);
    private sortColumn(header);
}
export interface Header {
    name: string;
    value: string;
}
