import { Router, ActivatedRoute } from "@angular/router";
import { RouterService } from "carbonldp-panel/router.service";
import { SidebarService } from "carbonldp-panel/sidebar.service";
import "semantic-ui/semantic";
export declare class MenuBarComponent {
    breadCrumbs: Array<any>;
    private router;
    private routerService;
    sidebarService: SidebarService;
    private route;
    constructor(router: Router, routerService: RouterService, sidebarService: SidebarService, route: ActivatedRoute);
    ngOnInit(): void;
    private getURL(routeSnapshot);
    toggleSidebar(): void;
}
