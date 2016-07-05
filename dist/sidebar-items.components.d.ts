import { ElementRef, AfterViewInit } from "@angular/core";
import { Router } from "@angular/router-deprecated";
import { SidebarItem } from "carbon-panel/sidebar.service";
export declare class SidebarItemsComponent implements AfterViewInit {
    private element;
    private router;
    items: SidebarItem[];
    private $element;
    constructor(element: ElementRef, router: Router);
}
export default SidebarItemsComponent;
