/// <reference types="jquery" />
/// <reference types="jstree" />
import { ElementRef, EventEmitter, AfterViewInit } from "@angular/core";
import * as SDKContext from "carbonldp/SDKContext";
import { DocumentsResolverService } from "../documents-resolver.service";
import "semantic-ui/semantic";
export declare class DocumentCreatorComponent implements AfterViewInit {
    private element;
    private $element;
    $createDocumentModal: JQuery;
    private documentsResolverService;
    private errorMessage;
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
    private onSubmitCreateChild(data, $event);
    private clearErrorMessage();
    private getSanitizedSlug(slug);
    private slugLostFocus(evt);
    show(): void;
    hide(): void;
    private hideForm();
    toggle(): void;
}
export default DocumentCreatorComponent;
