import { Router, RouteParams } from "@angular/router-deprecated";
import { MyAppsSidebarService } from "./../my-apps-sidebar.service";
import { AppContextService } from "./../app-context.service";
import * as App from "./app";
export declare class AppContentView {
    app: App.Class;
    private router;
    private routeParams;
    private myAppsSidebarService;
    private appContextService;
    private timer;
    private title;
    constructor(router: Router, routeParams: RouteParams, myAppsSidebarService: MyAppsSidebarService, appContextService: AppContextService);
    routerOnActivate(): void;
}
export default AppContentView;
