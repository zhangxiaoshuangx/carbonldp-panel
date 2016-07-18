import { ElementRef, AfterViewInit } from "@angular/core";
import * as SDKContext from "carbonldp/SDKContext";
import * as RDFDocument from "carbonldp/RDF/Document";
import * as HTTP from "carbonldp/HTTP";
import { DocumentsResolverService } from "./documents-resolver.service";
import { Message } from "./../../../../errors-area/error-message.component";
import "semantic-ui/semantic";
export declare class DocumentExplorerComponent implements AfterViewInit {
    element: ElementRef;
    $element: JQuery;
    loadingDocument: boolean;
    savingDocument: boolean;
    inspectingDocument: RDFDocument.Class;
    documentsResolverService: DocumentsResolverService;
    messages: Message[];
    documentContext: SDKContext.Class;
    constructor(element: ElementRef, documentsResolverService: DocumentsResolverService);
    ngAfterViewInit(): void;
    onLoadingDocument(loadingDocument: boolean): void;
    showLoading(savingDocument: boolean): void;
    resolveDocument(uri: string): void;
    handleError(error: HTTP.Errors.Error): void;
}
export default DocumentExplorerComponent;
