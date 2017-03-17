import { ElementRef, AfterContentInit } from "@angular/core";
import { HeaderService } from "carbonldp-panel/header.service";
import "semantic-ui/semantic";
export declare class HeaderComponent implements AfterContentInit {
    private element;
    private $element;
    headerService: HeaderService;
    constructor(element: ElementRef, headerService: HeaderService);
    ngAfterContentInit(): void;
    createCollapsableMenus(): void;
}
