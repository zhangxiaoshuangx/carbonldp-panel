import { ElementRef, EventEmitter, NgZone, AfterViewInit } from "@angular/core";
import * as SDKContext from "carbonldp/SDKContext";
import * as RDFDocument from "carbonldp/RDF/Document";
import { DocumentsResolverService } from "./documents-resolver.service";
import { Message } from "carbonldp-panel/errors-area/error-message.component";
import "semantic-ui/semantic";
export declare class DocumentExplorerComponent implements AfterViewInit {
    element: ElementRef;
    $element: JQuery;
    $deleteDocumentModal: JQuery;
    selectedDocumentURI: string;
    loadingDocument: boolean;
    savingDocument: boolean;
    inspectingDocument: RDFDocument.Class;
    documentsResolverService: DocumentsResolverService;
    messages: Message[];
    savingErrorMessage: Message;
    documentContext: SDKContext.Class;
    onRefreshNode: EventEmitter<string>;
    onOpenNode: EventEmitter<string>;
    onDisplaySuccessMessage: EventEmitter<string>;
    private zone;
    constructor(element: ElementRef, documentsResolverService: DocumentsResolverService, zone: NgZone);
    ngAfterViewInit(): void;
    onLoadingDocument(loadingDocument: boolean): void;
    showLoading(savingDocument: boolean): void;
    resolveDocument(uri: string): void;
    refreshDocument(documentURI: string): void;
    refreshNode(nodeId: string): void;
    openNode(nodeId: string): void;
    private changeSelection(documentURI);
    private showModal(element);
    private hideDeleteDocumentForm();
    private onSuccessAccessPoint($event);
    private onSuccessCreateDocument($event);
    private deleteDocument();
    private getParentURI(documentURI);
    private clearSavingError();
    private handleExternalError(error);
}
export default DocumentExplorerComponent;
