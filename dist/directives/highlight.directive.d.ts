import { ElementRef, AfterViewInit } from "@angular/core";
export declare class HighlightDirective implements AfterViewInit {
    private element;
    constructor(element: ElementRef);
    ngAfterViewInit(): void;
    private normalizeTabs(value);
    private getIndentation(line, tabs?);
    private removeIndentation(lines, indentation, tabs?);
}
