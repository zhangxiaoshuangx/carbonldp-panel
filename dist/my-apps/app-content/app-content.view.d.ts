import { Router, ActivatedRoute } from "@angular/router";
import { MyAppsSidebarService } from "./../my-apps-sidebar.service";
import { AppContentService } from "./app-content.service";
import * as App from "./app";
export declare class AppContentView {
    app: App.Class;
    private router;
    private activatedRoute;
    private appContentService;
    private myAppsSidebarService;
    constructor(router: Router, route: ActivatedRoute, myAppsSidebarService: MyAppsSidebarService, appContentService: AppContentService);
    ngOnInit(): void;
}
export default AppContentView;
