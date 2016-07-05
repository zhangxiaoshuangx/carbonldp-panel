import { ElementRef } from "@angular/core";
import { Location } from "@angular/common";
import { Router } from "@angular/router-deprecated";
import "semantic-ui/semantic";
import { SidebarService } from "carbon-panel/sidebar.service";
export declare class SidebarComponent {
    router: Router;
    element: ElementRef;
    $element: JQuery;
    sidebarService: SidebarService;
    location: Location;
    constructor(router: Router, element: ElementRef, location: Location, sidebarService: SidebarService);
    ngAfterViewInit(): void;
    toggle(): void;
    refreshAccordion(): void;
    isActive(slug: any, fullRoute?: boolean): boolean;
}
export default SidebarComponent;
