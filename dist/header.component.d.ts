import { ElementRef, AfterContentInit } from "@angular/core";
import { Router } from "@angular/router-deprecated";
import { HeaderService } from "carbon-panel/header.service";
import "semantic-ui/semantic";
export declare class HeaderComponent implements AfterContentInit {
    router: Router;
    element: ElementRef;
    $element: JQuery;
    private headerService;
    constructor(router: Router, element: ElementRef, headerService: HeaderService);
    ngAfterContentInit(): void;
    isActive(route: string): boolean;
    createCollapsableMenus(): void;
}
export default HeaderComponent;
