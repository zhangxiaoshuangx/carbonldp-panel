import { ElementRef, EventEmitter, AfterViewInit, OnInit } from "@angular/core";
import * as Pointer from "carbonldp/Pointer";
import * as PersistedDocument from "carbonldp/PersistedDocument";
import * as HTTP from "carbonldp/HTTP";
import * as SDKContext from "carbonldp/SDKContext";
import "semantic-ui/semantic";
import "jstree/dist/jstree.min";
export declare class DocumentTreeViewComponent implements AfterViewInit, OnInit {
    element: ElementRef;
    $element: JQuery;
    jsTree: JSTree;
    $tree: JQuery;
    nodeChildren: JSTreeNode[];
    documentContext: SDKContext.Class;
    refreshNode: EventEmitter<string>;
    openNode: EventEmitter<string>;
    onResolveUri: EventEmitter<string>;
    onError: EventEmitter<HTTP.Errors.Error>;
    onLoadingDocument: EventEmitter<boolean>;
    constructor(element: ElementRef);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    getDocumentTree(): Promise<PersistedDocument.Class>;
    buildNode(uri: string, isAccessPoint?: boolean): JSTreeNode;
    renderTree(): void;
    onBeforeOpenNode(parentId: string, parentNode: any, position: string): void;
    onChange(parentId: string, node: any, position: string): void;
    addChild(parentId: string, node: any, position: string): void;
    emptyNode(nodeId: string): void;
    getNodeChildren(uri: string): Promise<JSTreeNode[]>;
    getSlug(pointer: Pointer.Class | string): string;
}
export interface JSTreeNode {
    id: string;
    text: any;
    state: any;
    children: any;
    data: any;
    type?: any;
}
export default DocumentTreeViewComponent;
