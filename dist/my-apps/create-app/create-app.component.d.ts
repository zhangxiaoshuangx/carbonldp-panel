import { OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Carbon } from "carbonldp/Carbon";
import { AppContextService } from "./../app-context.service";
import { Message } from "carbonldp-panel/messages-area/message.component";
import { MessagesAreaService } from "carbonldp-panel/messages-area/messages-area.service";
import "semantic-ui/semantic";
export declare class CreateAppComponent implements OnInit {
    private carbon;
    private router;
    private appContextService;
    private messagesAreaService;
    private _name;
    private _slug;
    private persistedSlug;
    private persistedName;
    private slugInput;
    submitting: boolean;
    displaySuccessMessage: boolean;
    displayWarningMessage: boolean;
    errorMessage: Message;
    createAppFormModel: {
        name: string;
        slug: string;
        description: string;
    };
    constructor(carbon: Carbon, appContextService: AppContextService, router: Router, messagesAreaService: MessagesAreaService);
    ngOnInit(): void;
    slugLostControl(evt: any): void;
    getSanitizedSlug(slug: string): string;
    onSubmit(form: any, $event: any): void;
    private createApp(slug, appDocument);
    private grantAccess(acl);
    private getHTTPErrorMessage(error, content);
    private getErrorMessage(error);
    private clearMessages(evt);
}
