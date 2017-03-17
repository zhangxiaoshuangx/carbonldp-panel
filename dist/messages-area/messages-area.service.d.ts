import { EventEmitter } from "@angular/core";
import { Message } from "./message.component";
export declare class MessagesAreaService {
    addMessageEmitter: EventEmitter<any>;
    constructor();
    addMessage(message: Message): void;
    addMessage(title: string, content?: string, type?: string, statusCode?: string, statusMessage?: string, endpoint?: string, duration?: number): void;
}
