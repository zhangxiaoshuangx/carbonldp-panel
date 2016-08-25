import { ElementRef, AfterViewInit } from "@angular/core";
import { HeaderItem } from "carbon-panel/header.service";
import "semantic-ui/semantic";
export declare class HeaderItemComponent implements AfterViewInit {
    item: HeaderItem;
    private element;
    private $element;
    constructor(element: ElementRef);
    ngAfterViewInit(): void;
    createDropdownMenus(): void;
}
export default HeaderItemComponent;
