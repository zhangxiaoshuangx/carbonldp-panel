import { ElementRef, EventEmitter, AfterViewInit } from "@angular/core";
import * as SDKContext from "carbonldp/SDKContext";
import { DocumentsResolverService } from "../documents-resolver.service";
import "semantic-ui/semantic";
export declare class DocumentDeleterComponent implements AfterViewInit {
    private element;
    private $element;
    $deleteDocumentModal: JQuery;
    private documentsResolverService;
    private errorMessage;
    deleteDocumentFormModel: {};
    context: SDKContext.Class;
    documentURI: string;
    onSuccess: EventEmitter<any>;
    onError: EventEmitter<any>;
    constructor(element: ElementRef, documentsResolverService: DocumentsResolverService);
    ngAfterViewInit(): void;
    private onSubmitDeleteDocument(data, $event);
    private clearErrorMessage();
    show(): void;
    hide(): void;
    private hideDeleteDocumentForm();
    toggle(): void;
}
export default DocumentDeleterComponent;
