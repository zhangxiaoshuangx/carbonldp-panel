import { OnInit } from "@angular/core";
import * as HTTP from "carbonldp/HTTP";
import { AppContextService } from "../../app-context.service";
import * as App from "../app";
import { Message } from "carbonldp-panel/messages-area/message.component";
import "semantic-ui/semantic";
export declare class EditAppComponent implements OnInit {
    appContextService: AppContextService;
    submitting: boolean;
    displaySuccessMessage: boolean;
    errorMessage: Message;
    editAppFormModel: {
        name: string;
        description: string;
        allDomains: boolean;
        domain: string;
    };
    allowedDomains: string[];
    app: App.Class;
    constructor(appContextService: AppContextService);
    ngOnInit(): void;
    addDomain(domain: any): void;
    removeDomain(option: string, allDomains: any): void;
    onSubmit(form: any, $event: Event): void;
    getErrorMessage(error: HTTP.Errors.Error): string;
    clearMessages(evt: Event): void;
}
export default EditAppComponent;
