import { EventEmitter } from "@angular/core";
import * as SDKContext from "carbonldp/SDKContext";
import * as RDFDocument from "carbonldp/RDF/Document";
import * as HTTP from "carbonldp/HTTP";
import { DocumentsResolverService } from "./documents-resolver.service";
import { Message } from "carbonldp-panel/errors-area/error-message.component";
import "semantic-ui/semantic";
export declare class DocumentExplorerComponent {
    loadingDocument: boolean;
    savingDocument: boolean;
    inspectingDocument: RDFDocument.Class;
    documentsResolverService: DocumentsResolverService;
    messages: Message[];
    documentContext: SDKContext.Class;
    onRefreshNode: EventEmitter<string>;
    onOpenNode: EventEmitter<string>;
    constructor(documentsResolverService: DocumentsResolverService);
    onLoadingDocument(loadingDocument: boolean): void;
    showLoading(savingDocument: boolean): void;
    resolveDocument(uri: string): void;
    handleError(error: HTTP.Errors.Error): void;
    refreshDocument(documentURI: string): void;
    refreshNode(nodeId: string): void;
    openNode(nodeId: string): void;
    private getHTTPErrorMessage(error, content);
    private getErrorMessage(error);
}
export default DocumentExplorerComponent;
