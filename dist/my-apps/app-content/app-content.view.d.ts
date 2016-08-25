import { Router } from "@angular/router";
import { MyAppsSidebarService } from "./../my-apps-sidebar.service";
import { AppContextService } from "./../app-context.service";
import * as App from "./app";
export declare class AppContentView {
    app: App.Class;
    private router;
    private myAppsSidebarService;
    private appContextService;
    private timer;
    constructor(router: Router, myAppsSidebarService: MyAppsSidebarService, appContextService: AppContextService);
    routerOnActivate(): void;
}
export default AppContentView;
