import { OnInit } from "@angular/core";
import { FormBuilder, ControlGroup, AbstractControl } from "@angular/common";
import * as HTTP from "carbonldp/HTTP";
import { AppContextService } from "../../app-context.service";
import * as App from "../app";
import { Message } from "../../../errors-area/error-message.component";
import "semantic-ui/semantic";
export declare class EditAppComponent implements OnInit {
    appContextService: AppContextService;
    submitting: boolean;
    displaySuccessMessage: boolean;
    errorMessage: Message;
    editAppForm: ControlGroup;
    corsGroup: ControlGroup;
    formBuilder: FormBuilder;
    name: AbstractControl;
    description: AbstractControl;
    allDomains: AbstractControl;
    domain: AbstractControl;
    allowedDomains: string[];
    domainStr: string;
    app: App.Class;
    constructor(formBuilder: FormBuilder, appContextService: AppContextService);
    ngOnInit(): void;
    domainValidator(corsGroup: ControlGroup): any;
    allowedDomainsValidator(corsGroup: ControlGroup): any;
    addDomain(domain: string): void;
    removeDomain(option: string): void;
    canDisplayErrors(): boolean;
    onSubmit(data: {
        name: string;
        description: string;
        cors: {
            allDomains: boolean;
            domain: string;
            allowedDomains: string[];
        };
    }, $event: Event): void;
    getErrorMessage(error: HTTP.Errors.Error): string;
    clearMessages(evt: Event): void;
}
export default EditAppComponent;
