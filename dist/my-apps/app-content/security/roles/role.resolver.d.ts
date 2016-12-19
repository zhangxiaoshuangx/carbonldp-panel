import { Location } from '@angular/common';
import { Router, Resolve, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import * as PersistedRole from "carbonldp/Auth/PersistedRole";
import { RolesService } from "./roles.service";
import { AppContentService } from "carbonldp-panel/my-apps/app-content/app-content.service";
export declare class RoleResolver implements Resolve<PersistedRole.Class> {
    private location;
    private router;
    private activatedRoute;
    private rolesService;
    private appContentService;
    constructor(router: Router, route: ActivatedRoute, rolesService: RolesService, appContentService: AppContentService, location: Location);
    resolve(route: ActivatedRouteSnapshot): Promise<PersistedRole.Class> | PersistedRole.Class;
}
