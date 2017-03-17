import { ElementRef, SimpleChange, EventEmitter } from "@angular/core";
import * as App from "carbonldp/App";
import * as PersistedRole from "carbonldp/App/PersistedRole";
import * as PersistedAgent from "carbonldp/App/PersistedAgent";
import { RolesService } from "./../roles.service";
import { Message } from "carbonldp-panel/messages-area/message.component";
import { MessagesAreaService } from "carbonldp-panel/messages-area/messages-area.service";
export declare class RoleDetailsComponent {
    private element;
    private $element;
    private rolesService;
    private messagesAreaService;
    private roleAgents;
    private parentRole;
    Modes: typeof Modes;
    roleFormModel: RoleFormModel;
    activeTab: string;
    errorMessage: Message;
    displaySuccessMessage: boolean;
    mustAddParent: boolean;
    embedded: boolean;
    mode: string;
    role: PersistedRole.Class;
    appContext: App.Context;
    selectedRole: string | PersistedRole.Class;
    onClose: EventEmitter<boolean>;
    onSuccess: EventEmitter<string>;
    onError: EventEmitter<boolean>;
    constructor(element: ElementRef, rolesService: RolesService, messagesAreaService: MessagesAreaService);
    ngAfterViewInit(): void;
    ngOnChanges(changes: {
        [propName: string]: SimpleChange;
    }): void;
    private changeRole(role);
    private changeMode(mode);
    onSubmit(data: RoleFormModel, $event: any): void;
    private editRole(role, roleData);
    private createRole(role, roleData);
    private getAgents(role);
    private getRole(roleID);
    private editRoleAgents(role, selectedAgents);
    private getRemovedAgents(selectedAgents);
    private registerAgentToRole(agentID, roleID);
    private removeAgentFromRole(agentID, roleID);
    getSanitizedSlug(slug: string): string;
    private slugLostFocus(evt);
    private changeAgents(selectedAgents);
    private changeParentRole(parentRoles);
    private cancelForm();
    private close();
    private closeError();
}
export declare class Modes {
    static READ: string;
    static EDIT: string;
    static CREATE: string;
}
export interface RoleFormModel {
    slug: string;
    name: string;
    description?: string;
    parentRole?: string;
    agents: PersistedAgent.Class[];
}
