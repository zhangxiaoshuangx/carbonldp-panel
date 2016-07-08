import { ElementRef } from "@angular/core";
import { Router, Instruction } from "@angular/router-deprecated";
import { RouterService } from "carbon-panel/router.service";
import { SidebarService } from "carbon-panel/sidebar.service";
import "semantic-ui/semantic";
export declare class MenuBarComponent {
    breadCrumbs: Array<any>;
    instructions: Instruction[];
    private element;
    private router;
    private routerService;
    private sidebarService;
    constructor(element: ElementRef, router: Router, routerService: RouterService, sidebarService: SidebarService);
    updateBreadcrumbs(url: string): void;
    getRouteAlias(): any;
    addInstruction(workingInstruction: Instruction): void;
    getFriendlyAlias(): any;
    toggleSidebar(): void;
}
export default MenuBarComponent;
