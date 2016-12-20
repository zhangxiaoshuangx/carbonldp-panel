import { OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import * as App from "carbonldp/App";
import { AgentsService } from "../agents.service";
export declare class AgentsListComponent implements OnInit {
    private router;
    private route;
    private agentsService;
    private agents;
    private loading;
    private deletingAgent;
    private activePage;
    private totalAgents;
    private agentsPerPage;
    private headers;
    private sortedColumn;
    private ascending;
    private errorMessage;
    appContext: App.Context;
    constructor(router: Router, route: ActivatedRoute, agentsService: AgentsService);
    ngOnInit(): void;
    private loadAgents();
    private getAgents();
    private openAgent(event, agent);
    private onClickEditAgent(event, agent);
    private goToAgent(agent, edit?);
    private refreshAgents();
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
export default AgentsListComponent;
