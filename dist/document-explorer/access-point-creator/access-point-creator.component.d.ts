import { ElementRef, EventEmitter, AfterViewInit } from "@angular/core";
import * as SDKContext from "carbonldp/SDKContext";
import { DocumentsResolverService } from "../documents-resolver.service";
import "semantic-ui/semantic";
export declare class AccessPointCreatorComponent implements AfterViewInit {
    private element;
    private $element;
    private $createAccessPointModal;
    private documentsResolverService;
    private errorMessage;
    private createAccessPointFormModel;
    visible: boolean;
    context: SDKContext.Class;
    parentURI: string;
    onSuccess: EventEmitter<any>;
    onError: EventEmitter<any>;
    constructor(element: ElementRef, documentsResolverService: DocumentsResolverService);
    ngAfterViewInit(): void;
    private onSubmitAccessPoint(data, $event, form);
    private clearErrorMessage();
    private getSanitizedSlug(slug);
    private slugLostFocus(evt);
    show(): void;
    hide(): void;
    private hideForm();
    toggle(): void;
}
