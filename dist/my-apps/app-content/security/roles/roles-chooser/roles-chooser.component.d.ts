import { ElementRef, AfterViewInit, EventEmitter } from "@angular/core";
import * as App from "carbonldp/App";
import * as PersistedRole from "carbonldp/Auth/PersistedRole";
import { RolesService } from "../roles.service";
export declare class RolesChooserComponent implements AfterViewInit {
    private element;
    private $element;
    private rolesService;
    private availableRoles;
    private _selectedRoles;
    selectedRoles: PersistedRole.Class[];
    appContext: App.Context;
    bordered: boolean;
    single: boolean;
    onChangeSelection: EventEmitter<PersistedRole.Class[]>;
    constructor(element: ElementRef, rolesService: RolesService);
    ngAfterViewInit(): void;
    private hasRole(role, list);
    private onClickRole(role, evt);
    private selectRole(role);
    private addRoleAsMulti(role);
    private addRoleAsSingle(role);
}
export default RolesChooserComponent;
