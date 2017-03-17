import { ElementRef, SimpleChange, EventEmitter, OnChanges, AfterViewInit } from "@angular/core";
import "semantic-ui/semantic";
export declare class MessageComponent implements OnChanges, AfterViewInit {
    private element;
    private $element;
    messageElement: ElementRef;
    type: string;
    title: string;
    content: string;
    statusCode: string;
    statusMessage: string;
    endpoint: string;
    message: Message;
    errors: any[];
    closable: boolean;
    stack: string;
    showStack: boolean;
    onClose: EventEmitter<any>;
    constructor(element: ElementRef);
    ngOnChanges(changes: {
        [propName: string]: SimpleChange;
    }): void;
    ngAfterViewInit(): void;
    private decomposeMessage();
    close(event: Event, messageDiv: HTMLElement): void;
}
export interface Message {
    title?: string;
    content?: string;
    statusCode?: string;
    statusMessage?: string;
    endpoint?: string;
    errors?: any[];
    stack?: string;
    type?: string;
    duration?: number;
}
export declare class Types {
    static NORMAL: string;
    static INFO: string;
    static WARNING: string;
    static POSITIVE: string;
    static SUCCESS: string;
    static NEGATIVE: string;
    static ERROR: string;
}
