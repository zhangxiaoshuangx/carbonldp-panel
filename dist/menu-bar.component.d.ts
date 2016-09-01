import { Router, ActivatedRoute } from "@angular/router";
import { RouterService } from "carbon-panel/router.service";
import { SidebarService } from "carbon-panel/sidebar.service";
import "semantic-ui/semantic";
export declare class MenuBarComponent {
    breadCrumbs: Array<any>;
    private router;
    private routerService;
    private sidebarService;
    private route;
    constructor(router: Router, routerService: RouterService, sidebarService: SidebarService, route: ActivatedRoute);
    ngOnInit(): void;
    private getURL(routeSnapshot);
    toggleSidebar(): void;
}
export default MenuBarComponent;
