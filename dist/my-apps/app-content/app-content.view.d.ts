import { Router, ActivatedRoute, Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { MyAppsSidebarService } from "./../my-apps-sidebar.service";
import { AppContextService } from "./../app-context.service";
import * as App from "./app";
export declare class AppContentView implements Resolve<App.Class> {
    app: App.Class;
    private router;
    private activatedRoute;
    private myAppsSidebarService;
    private appContextService;
    private timer;
    constructor(router: Router, route: ActivatedRoute, myAppsSidebarService: MyAppsSidebarService, appContextService: AppContextService);
    resolve(route: ActivatedRouteSnapshot): any;
}
export default AppContentView;
