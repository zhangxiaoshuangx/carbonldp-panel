import { ElementRef, AfterViewInit } from "@angular/core";
import { Router } from "@angular/router-deprecated";
import { HeaderItem } from "carbon-panel/header.service";
import "semantic-ui/semantic";
export declare class HeaderItemComponent implements AfterViewInit {
    private element;
    private router;
    item: HeaderItem;
    private $element;
    constructor(element: ElementRef, router: Router);
    ngAfterViewInit(): void;
    isActive(route: string): boolean;
    createDropdownMenus(): void;
}
export default HeaderItemComponent;
