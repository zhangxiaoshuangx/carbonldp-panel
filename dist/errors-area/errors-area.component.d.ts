import { AfterViewInit } from "@angular/core";
import { ErrorsAreaService } from "./errors-area.service";
import { Message } from "./error-message.component";
import "semantic-ui/semantic";
export declare class ErrorsAreaComponent implements AfterViewInit {
    messages: Message[];
    errorsAreaService: ErrorsAreaService;
    constructor(errorsAreaService: ErrorsAreaService);
    ngAfterViewInit(): void;
    removeMessage(event: boolean, message: Message, index: number): void;
}
export default ErrorsAreaComponent;
