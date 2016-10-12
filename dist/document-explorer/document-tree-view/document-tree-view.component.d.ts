import { ElementRef, EventEmitter, AfterViewInit, OnInit } from "@angular/core";
import * as Pointer from "carbonldp/Pointer";
import * as PersistedDocument from "carbonldp/PersistedDocument";
import * as HTTP from "carbonldp/HTTP";
import * as SDKContext from "carbonldp/SDKContext";
import * as RDFDocument from "carbonldp/RDF/Document";
import "semantic-ui/semantic";
import "jstree/dist/jstree.min";
export declare class DocumentTreeViewComponent implements AfterViewInit, OnInit {
    element: ElementRef;
    $element: JQuery;
    documentTree: JQuery;
    nodeChildren: JSTreeNode[];
    documentContext: SDKContext.Class;
    onResolveUri: EventEmitter<RDFDocument.Class>;
    onError: EventEmitter<HTTP.Errors.Error>;
    onLoadingDocument: EventEmitter<boolean>;
    constructor(element: ElementRef);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    getDocumentTree(): Promise<PersistedDocument.Class>;
    buildNode(uri: string, isAccessPoint?: boolean): JSTreeNode;
    renderTree(): void;
    emptyNode(nodeId: string): void;
    onBeforeOpenNode(parentId: string, parentNode: any, position: string): void;
    onClickNode(parentId: string, node: any, position: string): void;
    addChild(parentId: string, node: any, position: string): void;
    getNodeChildren(uri: string): Promise<JSTreeNode[]>;
    getSlug(pointer: Pointer.Class | string): string;
}
export interface JSTreeNode {
    text: any;
    state: any;
    children: any;
    data: any;
    type?: any;
}
export default DocumentTreeViewComponent;
