import { ElementRef, AfterContentInit, AfterViewInit } from "@angular/core";
import { SidebarSubmenu } from "carbon-panel/sidebar.service";
export declare class SidebarItemsComponent implements AfterContentInit, AfterViewInit {
    private element;
    item: SidebarSubmenu;
    private $element;
    constructor(element: ElementRef);
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
}
export default SidebarItemsComponent;
