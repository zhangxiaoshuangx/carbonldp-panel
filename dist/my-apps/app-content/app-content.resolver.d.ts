import { Router, Resolve, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import * as App from "./app";
import { AppContextService } from "./../app-context.service";
export declare class AppContentResolver implements Resolve<App.Class> {
    private router;
    private activatedRoute;
    private appContextService;
    constructor(router: Router, route: ActivatedRoute, appContextService: AppContextService);
    resolve(route: ActivatedRouteSnapshot): Promise<App.Class> | App.Class;
}
