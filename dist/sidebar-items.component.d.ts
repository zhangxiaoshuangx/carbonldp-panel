import { ElementRef } from "@angular/core";
import { SidebarItem } from "carbon-panel/sidebar.service";
export declare class SidebarItemsComponent {
    private element;
    items: SidebarItem[];
    private $element;
    constructor(element: ElementRef);
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
    initializeAccordion(): void;
}
export default SidebarItemsComponent;
