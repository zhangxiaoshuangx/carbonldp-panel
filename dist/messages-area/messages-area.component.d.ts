import { AfterViewInit } from "@angular/core";
import { MessagesAreaService } from "./messages-area.service";
import { Message } from "./message.component";
import "semantic-ui/semantic";
export declare class MessagesAreaComponent implements AfterViewInit {
    messages: Message[];
    messagesAreaService: MessagesAreaService;
    constructor(errorsAreaService: MessagesAreaService);
    ngAfterViewInit(): void;
    removeMessage(index: number): void;
}
