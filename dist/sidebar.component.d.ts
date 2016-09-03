import { ElementRef } from "@angular/core";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import "semantic-ui/semantic";
import { SidebarService } from "carbonldp-panel/sidebar.service";
export declare class SidebarComponent {
    private element;
    private $element;
    private router;
    private location;
    private sidebarService;
    constructor(router: Router, element: ElementRef, location: Location, sidebarService: SidebarService);
    ngAfterViewInit(): void;
    toggle(): void;
    refreshAccordion(): void;
}
export default SidebarComponent;
