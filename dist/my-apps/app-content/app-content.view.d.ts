import { Router, ActivatedRoute } from "@angular/router";
import { MyAppsSidebarService } from "./../my-apps-sidebar.service";
export declare class AppContentView {
    private app;
    private router;
    private activatedRoute;
    private myAppsSidebarService;
    constructor(router: Router, route: ActivatedRoute, myAppsSidebarService: MyAppsSidebarService);
    ngOnInit(): void;
}
export default AppContentView;
