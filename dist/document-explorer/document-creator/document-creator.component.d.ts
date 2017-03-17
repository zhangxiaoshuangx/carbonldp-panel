import { ElementRef, EventEmitter, AfterViewInit } from "@angular/core";
import * as SDKContext from "carbonldp/SDKContext";
import { DocumentsResolverService } from "../documents-resolver.service";
import { Message } from "carbonldp-panel/messages-area/message.component";
import "semantic-ui/semantic";
export declare class DocumentCreatorComponent implements AfterViewInit {
    private element;
    private $element;
    private $createDocumentModal;
    private documentsResolverService;
    errorMessage: Message;
    createChildFormModel: {
        slug: string;
        advancedOptions: {
            hasMemberRelation: string;
            isMemberOfRelation: string;
        };
    };
    context: SDKContext.Class;
    parentURI: string;
    onSuccess: EventEmitter<any>;
    onError: EventEmitter<any>;
    constructor(element: ElementRef, documentsResolverService: DocumentsResolverService);
    ngAfterViewInit(): void;
    onSubmitCreateChild(data: {
        slug: string;
        advancedOptions: {
            hasMemberRelation: string;
            isMemberOfRelation: string;
        };
    }, $event: any): void;
    private clearErrorMessage();
    getSanitizedSlug(slug: string): string;
    slugLostFocus(evt: any): void;
    show(): void;
    hide(): void;
    hideForm(): void;
    toggle(): void;
}
