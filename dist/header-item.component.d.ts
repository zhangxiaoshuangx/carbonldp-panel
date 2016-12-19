import { ElementRef, AfterViewInit } from "@angular/core";
import { RouterService } from "carbonldp-panel/router.service";
import { HeaderItem } from "carbonldp-panel/header.service";
import "semantic-ui/semantic";
export declare class HeaderItemComponent implements AfterViewInit {
    item: HeaderItem;
    private element;
    private $element;
    private routerService;
    constructor(element: ElementRef, routerService: RouterService);
    ngAfterViewInit(): void;
    createDropdownMenus(): void;
}
export default HeaderItemComponent;
