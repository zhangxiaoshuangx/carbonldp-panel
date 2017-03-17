import { ElementRef, AfterViewInit, EventEmitter } from "@angular/core";
import * as App from "carbonldp/App";
import * as PersistedAgent from "carbonldp/App/PersistedAgent";
import { AgentsService } from "../agents.service";
export declare class AgentsChooserComponent implements AfterViewInit {
    private element;
    private $element;
    private agentsService;
    private activePage;
    private totalAgents;
    private agentsPerPage;
    private headers;
    private sortedColumn;
    private ascending;
    loading: boolean;
    availableAgents: PersistedAgent.Class[];
    appContext: App.Context;
    single: boolean;
    selectedAgents: PersistedAgent.Class[];
    onChangeSelection: EventEmitter<PersistedAgent.Class[]>;
    constructor(element: ElementRef, agentsService: AgentsService);
    ngAfterViewInit(): void;
    private hasAgent(agent, list);
    private onClickAgent(evt, agent);
    private selectAgent(agent);
    private addAgentAsMulti(agent);
    private addAgentAsSingle(agent);
    private loadAgents();
    private getNumberOfAgents();
    private getAgents();
    private changePage(page);
    private changeAgentsPerPage(agentsPerPage);
    private sortColumn(header);
}
export interface Header {
    name: string;
    value: string;
}
