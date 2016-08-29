import { ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { RouterService } from "carbon-panel/router.service";
import { SidebarService } from "carbon-panel/sidebar.service";
import "semantic-ui/semantic";
export declare class MenuBarComponent {
    breadCrumbs: Array<any>;
    private element;
    private router;
    private routerService;
    private sidebarService;
    constructor(element: ElementRef, router: Router, routerService: RouterService, sidebarService: SidebarService);
    getRouteAlias(): any;
    addInstruction(workingInstruction: any): void;
    getFriendlyAlias(): any;
    toggleSidebar(): void;
}
export default MenuBarComponent;
