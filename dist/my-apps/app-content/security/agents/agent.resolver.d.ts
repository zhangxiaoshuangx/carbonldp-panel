import { Location } from '@angular/common';
import { Router, Resolve, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import * as PersistedAgent from "carbonldp/Auth/PersistedAgent";
import { AgentsService } from "./agents.service";
import { AppContentService } from "carbonldp-panel/my-apps/app-content/app-content.service";
export declare class AgentResolver implements Resolve<PersistedAgent.Class> {
    private location;
    private router;
    private activatedRoute;
    private agentsService;
    private appContentService;
    constructor(router: Router, route: ActivatedRoute, agentsService: AgentsService, appContentService: AppContentService, location: Location);
    resolve(route: ActivatedRouteSnapshot): Promise<PersistedAgent.Class> | PersistedAgent.Class;
}
