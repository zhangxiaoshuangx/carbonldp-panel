import { Router, Resolve, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import * as App from "./app";
import { AppContextService } from "./../app-context.service";
import { AppContentService } from "./app-content.service";
export declare class AppContentResolver implements Resolve<App.Class> {
    private router;
    private activatedRoute;
    private appContextService;
    private appContentService;
    constructor(router: Router, route: ActivatedRoute, appContextService: AppContextService, appContentService: AppContentService);
    resolve(route: ActivatedRouteSnapshot): Promise<App.Class> | App.Class;
}
