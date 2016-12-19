import { EventEmitter } from "@angular/core";
import * as App from "carbonldp/App";
import * as PersistedRole from "carbonldp/Auth/PersistedRole";
import { RolesService } from "./../roles.service";
export declare class RoleDetailsComponent {
    private rolesService;
    private Modes;
    private roleFormModel;
    private availableRoles;
    mode: string;
    role: PersistedRole.Class;
    appContext: App.Context;
    onClose: EventEmitter<boolean>;
    onSuccess: EventEmitter<boolean>;
    onError: EventEmitter<boolean>;
    constructor(rolesService: RolesService);
    ngAfterViewInit(): void;
    private changeMode(mode);
    private onSubmit(data, $event);
    private getSanitizedSlug(slug);
    private slugLostFocus(evt);
    private getAllRoles();
    private changeRoles(selectedRoles);
    private cancelForm();
    private close();
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
}
export default RoleDetailsComponent;
