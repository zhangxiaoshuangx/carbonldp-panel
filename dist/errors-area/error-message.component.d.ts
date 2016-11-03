import { ElementRef, SimpleChange, EventEmitter, OnChanges, AfterViewInit } from "@angular/core";
import "semantic-ui/semantic";
export declare class ErrorMessageComponent implements OnChanges, AfterViewInit {
    private element;
    private $element;
    title: string;
    content: string;
    statusCode: string;
    statusMessage: string;
    endpoint: string;
    message: Message;
    errors: any[];
    closable: boolean;
    stack: string;
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
}
export default ErrorMessageComponent;
