import { ElementRef, EventEmitter, AfterContentInit } from "@angular/core";
export declare class CollapsibleTitleDirective {
    active: boolean;
    element: ElementRef;
    constructor(element: ElementRef);
}
export declare class CollapsibleContentDirective {
    active: boolean;
}
export declare class CollapsibleDirective implements AfterContentInit {
    content: CollapsibleContentDirective;
    title: CollapsibleTitleDirective;
    activeChange: EventEmitter<boolean>;
    element: ElementRef;
    active: boolean;
    private _active;
    private _activeJustChanged;
    constructor(element: ElementRef);
    ngAfterContentInit(): void;
    onClick(event: MouseEvent): void;
    toggleContent(): void;
}
