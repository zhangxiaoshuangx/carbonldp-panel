import { OnInit } from "@angular/core";
import Carbon from "carbonldp/Carbon";
import * as CarbonApp from "carbonldp/App";
import * as HTTP from "carbonldp/HTTP";
import * as Auth from "carbonldp/Auth";
import { AppContextService } from "./../app-context.service";
import { Message } from "./../../errors-area/error-message.component";
import "semantic-ui/semantic";
export declare class CreateAppComponent implements OnInit {
    carbon: Carbon;
    appContextService: AppContextService;
    submitting: boolean;
    displaySuccessMessage: boolean;
    displayWarningMessage: boolean;
    errorMessage: Message;
    _name: string;
    _slug: string;
    persistedSlug: string;
    persistedName: string;
    slugInput: any;
    createAppFormModel: {
        name: string;
        slug: string;
        description: string;
    };
    constructor(carbon: Carbon, appContextService: AppContextService);
    ngOnInit(): void;
    slugLostControl(evt: any): void;
    getSanitizedSlug(slug: string): string;
    onSubmit(form: any, $event: any): void;
    createApp(slug: string, appDocument: CarbonApp.Class): Promise<Auth.PersistedACL.Class>;
    private grantAccess(acl);
    private getHTTPErrorMessage(error, content);
    getErrorMessage(error: HTTP.Errors.Error): string;
    clearMessages(evt: Event): void;
}
export default CreateAppComponent;
