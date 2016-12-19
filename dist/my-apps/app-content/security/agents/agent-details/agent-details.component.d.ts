import { ElementRef, EventEmitter, OnChanges, SimpleChanges } from "@angular/core";
import * as App from "carbonldp/App";
import * as PersistedAgent from "carbonldp/Auth/PersistedAgent";
import { AgentsService } from "../agents.service";
import { RolesService } from "../../roles/roles.service";
export declare class AgentDetailsComponent implements OnChanges {
    private element;
    private $element;
    private Modes;
    private agentRoles;
    private availableRoles;
    private errorMessage;
    private displaySuccessMessage;
    private agentsService;
    private rolesService;
    mode: string;
    agent: PersistedAgent.Class;
    appContext: App.Context;
    canClose: boolean;
    onClose: EventEmitter<boolean>;
    onSuccess: EventEmitter<boolean>;
    onError: EventEmitter<boolean>;
    private agentFormModel;
    constructor(element: ElementRef, agentsService: AgentsService, rolesService: RolesService);
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    private changeAgent(newAgent);
    private getRoles();
    private getRoles(agent?);
    private changeMode(mode);
    private changeRoles(selectedRoles);
    private cancelForm();
    private onSubmit(data, $event);
    private editAgent(agent, agentData);
    private createAgent(agent, agentData);
    private getSanitizedSlug(slug);
    private slugLostFocus(evt);
    private editAgentRoles(agent, selectedRoles);
    private getRemovedRoles(selectedRoles);
    private registerAgentToRole(agentID, roleID);
    private removeAgentFromRole(agentID, roleID);
    private close();
    private closeError();
    private closeSuccessMessage(event, messageDiv);
}
export declare class Modes {
    static READ: string;
    static EDIT: string;
    static CREATE: string;
}
export interface AgentFormModel {
    slug: string;
    name: string;
    email: string;
    roles: string[];
    password: string;
    repeatPassword: string;
    enabled: boolean;
}
export default AgentDetailsComponent;
