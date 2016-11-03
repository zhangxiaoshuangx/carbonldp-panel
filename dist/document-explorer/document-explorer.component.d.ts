import { ElementRef, EventEmitter, NgZone } from "@angular/core";
import * as SDKContext from "carbonldp/SDKContext";
import * as RDFDocument from "carbonldp/RDF/Document";
import { DocumentsResolverService } from "./documents-resolver.service";
import { Message } from "carbonldp-panel/errors-area/error-message.component";
import "semantic-ui/semantic";
export declare class DocumentExplorerComponent {
    element: ElementRef;
    $element: JQuery;
    $createChildSuccessMessage: JQuery;
    $createDocumentModal: JQuery;
    $deleteDocumentModal: JQuery;
    $createAccessPointModal: JQuery;
    selectedDocumentURI: string;
    loadingDocument: boolean;
    savingDocument: boolean;
    inspectingDocument: RDFDocument.Class;
    documentsResolverService: DocumentsResolverService;
    messages: Message[];
    savingErrorMessage: Message;
    createChildFormModel: {
        slug: string;
        advancedOptions: {
            hasMemberRelation: string;
            isMemberOfRelation: string;
        };
    };
    createAccessPointFormModel: {
        slug: string;
        hasMemberRelation: string;
        isMemberOfRelation: string;
    };
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
    private showCreateChildForm();
    private showCreateAccessPointForm();
    private hideCreateChildForm();
    private hideCreateAccessPointForm();
    private slugLostControl(evt);
    private getSanitizedSlug(slug);
    private onSubmitCreateChild(data, $event);
    private onSubmitAccessPoint(data, $event);
    private deleteDocument();
    private cancelDeletion();
    private showDeleteChildForm();
    private getParentURI(documentURI);
    private clearSavingError();
    private handleExternalError(error);
    private getErrorMessage(error);
    private getErrors(error);
    private getFriendlyHTTPMessage(error);
}
export default DocumentExplorerComponent;
