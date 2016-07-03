import { ElementRef, AfterViewInit } from "@angular/core";
import "semantic-ui/semantic";
export declare class DropdownComponent implements AfterViewInit {
    private element;
    classes: string;
    private $element;
    constructor(element: ElementRef);
    ngAfterViewInit(): void;
}
export default DropdownComponent;
