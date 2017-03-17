import { ElementRef, EventEmitter, AfterViewInit } from "@angular/core";
import * as App from "carbonldp/App";
import { Message } from "carbonldp-panel/messages-area/message.component";
import { RolesService } from "../roles.service";
import "semantic-ui/semantic";
export declare class RoleDeleterComponent implements AfterViewInit {
    private element;
    private $element;
    private rolesService;
    private $deleteRoleModal;
    errorMessages: Message[];
    deletingRole: boolean;
    appContext: App.Context;
    role: string;
    onSuccess: EventEmitter<string>;
    onError: EventEmitter<any>;
    constructor(element: ElementRef, rolesService: RolesService);
    ngAfterViewInit(): void;
    onSubmitDeleteRole(): void;
    private deleteRole(roleID);
    clearErrorMessage(): void;
    removeErrorMessage(index: number): void;
    show(): void;
    hide(): void;
    hideDeleteRoleForm(): void;
    toggle(): void;
}
