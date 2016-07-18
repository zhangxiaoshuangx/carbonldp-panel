import { SimpleChange, EventEmitter, OnChanges } from "@angular/core";
import "semantic-ui/semantic";
export declare class ErrorMessageComponent implements OnChanges {
    title: string;
    content: string;
    statusCode: string;
    statusMessage: string;
    endpoint: string;
    message: Message;
    closable: boolean;
    onClose: EventEmitter<any>;
    constructor();
    ngOnChanges(changes: {
        [propName: string]: SimpleChange;
    }): void;
    private decomposeMessage();
    close(event: Event, messageDiv: HTMLElement): void;
}
export interface Message {
    title: string;
    content: string;
    statusCode: string;
    statusMessage: string;
    endpoint: string;
}
export default ErrorMessageComponent;
