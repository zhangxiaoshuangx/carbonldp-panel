import { ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { SidebarService } from "carbon-panel/sidebar.service";
import "semantic-ui/semantic";
export declare class MenuBarComponent {
    breadCrumbs: Array<any>;
    private element;
    private router;
    private sidebarService;
    constructor(element: ElementRef, router: Router, sidebarService: SidebarService);
    getRouteAlias(): any;
    addInstruction(workingInstruction: any): void;
    getFriendlyAlias(): any;
    toggleSidebar(): void;
}
export default MenuBarComponent;
