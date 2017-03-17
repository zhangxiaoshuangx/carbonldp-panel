import { ElementRef, EventEmitter, AfterViewInit } from "@angular/core";
import * as SDKContext from "carbonldp/SDKContext";
import { DocumentsResolverService } from "../documents-resolver.service";
import { Message } from "carbonldp-panel/messages-area/message.component";
import "semantic-ui/semantic";
export declare class DocumentDeleterComponent implements AfterViewInit {
    private element;
    private $element;
    $deleteDocumentModal: JQuery;
    private documentsResolverService;
    errorMessage: Message;
    deleteDocumentFormModel: {
        value?: any;
    };
    context: SDKContext.Class;
    documentURI: string;
    onSuccess: EventEmitter<any>;
    onError: EventEmitter<any>;
    constructor(element: ElementRef, documentsResolverService: DocumentsResolverService);
    ngAfterViewInit(): void;
    onSubmitDeleteDocument(data: {}, $event: any): void;
    private clearErrorMessage();
    show(): void;
    hide(): void;
    hideDeleteDocumentForm(): void;
    toggle(): void;
}
