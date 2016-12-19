import { EventEmitter } from "@angular/core";
export declare class ErrorsAreaService {
    addErrorEmitter: EventEmitter<any>;
    constructor();
    addError(title: string, content: string, statusCode: string, statusMessage: string, endpoint: string): void;
}
export default ErrorsAreaService;
