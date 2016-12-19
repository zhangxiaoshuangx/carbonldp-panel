import { EventEmitter, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import * as App from "carbonldp/App";
import { RolesService } from "../roles.service";
export declare class RolesListComponent implements OnInit {
    private router;
    private route;
    private rolesService;
    private roles;
    private _loading;
    private loading;
    private deletingRole;
    private activePage;
    private totalRoles;
    private rolesPerPage;
    private headers;
    private sortedColumn;
    private ascending;
    private errorMessage;
    appContext: App.Context;
    refresher: EventEmitter<boolean>;
    onLoading: EventEmitter<boolean>;
    constructor(router: Router, route: ActivatedRoute, rolesService: RolesService);
    ngOnInit(): void;
    private loadRoles();
    private getRoles();
    private openRole(event, role);
    private onClickEditRole(event, role);
    private goToRole(role, edit?);
    private refreshRoles();
    private onClickDeleteRole(event, role);
    private getNumberOfRoles();
    private changePage(page);
    private changeRolesPerPage(rolesPerPage);
    private sortColumn(header);
}
export interface Header {
    name: string;
    value: string;
}
export declare class RoleDetailsModes {
    static READ: string;
    static EDIT: string;
    static CREATE: string;
}
export default RolesListComponent;
