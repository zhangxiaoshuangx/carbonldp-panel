import { ElementRef, AfterContentInit } from "@angular/core";
import { HeaderService } from "carbon-panel/header.service";
import "semantic-ui/semantic";
export declare class HeaderComponent implements AfterContentInit {
    private element;
    private $element;
    private headerService;
    constructor(element: ElementRef, headerService: HeaderService);
    ngAfterContentInit(): void;
    createCollapsableMenus(): void;
}
export default HeaderComponent;
