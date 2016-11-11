import { ElementRef, AfterViewInit } from "@angular/core";
import * as App from "carbonldp/App";
import "semantic-ui/semantic";
export declare class SecurityComponent implements AfterViewInit {
    private element;
    private $element;
    appContext: App.Context;
    constructor(element: ElementRef);
    ngAfterViewInit(): void;
}
export default SecurityComponent;
