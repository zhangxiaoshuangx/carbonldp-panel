import { ElementRef, EventEmitter } from "@angular/core";
import * as SDKContext from "carbonldp/SDKContext";
import * as RDFDocument from "carbonldp/RDF/Document";
import * as HTTP from "carbonldp/HTTP";
import { DocumentsResolverService } from "./documents-resolver.service";
import { Message } from "carbonldp-panel/errors-area/error-message.component";
import "semantic-ui/semantic";
export declare class DocumentExplorerComponent {
    element: ElementRef;
    $element: JQuery;
    $createChildSuccessMessage: JQuery;
    $createDocumentDimmer: JQuery;
    $deleteDocumentDimmer: JQuery;
    selectedDocumentURI: string;
    loadingDocument: boolean;
    savingDocument: boolean;
    inspectingDocument: RDFDocument.Class;
    documentsResolverService: DocumentsResolverService;
    messages: Message[];
    savingErrorMessage: Message;
    createChildFormModel: {
        slug: string;
    };
    documentContext: SDKContext.Class;
    onRefreshNode: EventEmitter<string>;
    onOpenNode: EventEmitter<string>;
    onDisplaySuccessMessage: EventEmitter<string>;
    constructor(element: ElementRef, documentsResolverService: DocumentsResolverService);
    ngAfterViewInit(): void;
    onLoadingDocument(loadingDocument: boolean): void;
    showLoading(savingDocument: boolean): void;
    resolveDocument(uri: string): void;
    handleError(error: HTTP.Errors.Error): void;
    refreshDocument(documentURI: string): void;
    refreshNode(nodeId: string): void;
    openNode(nodeId: string): void;
    private changeSelection(documentURI);
    private showCreateChildForm();
    private hideCreateChildForm();
    private slugLostControl(evt);
    private getSanitizedSlug(slug);
    private createChild();
    private clearSavingError();
    private getErrors(error);
    private getHTTPErrorMessage(error, content);
    private getErrorMessage(error);
}
export default DocumentExplorerComponent;
