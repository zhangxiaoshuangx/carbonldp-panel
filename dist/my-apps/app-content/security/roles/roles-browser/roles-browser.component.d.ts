import { EventEmitter, NgZone } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import * as App from "carbonldp/App";
import * as PersistedRole from "carbonldp/App/PersistedRole";
import { Modes } from "../role-details/role-details.component";
import { RolesService } from "../roles.service";
import { Message } from "carbonldp-panel/messages-area/message.component";
export declare class RolesBrowserComponent {
    private rolesService;
    private zone;
    private router;
    private activatedRoute;
    private hasRoleOnRoute;
    activeRole: PersistedRole.Class;
    selectedRole: string;
    loading: boolean;
    messages: Message[];
    Modes: typeof Modes;
    mode: string;
    appContext: App.Context;
    onRefresh: EventEmitter<string>;
    onDelete: EventEmitter<string>;
    constructor(router: Router, route: ActivatedRoute, rolesService: RolesService, zone: NgZone);
    ngOnInit(): void;
    resolveRole(roleID: string): void;
    onSuccessDelete(roleID: string): void;
    onSuccessCreate(roleID: string): void;
    onSuccessEdit(roleID: string): void;
    handleError(error: any): void;
}
