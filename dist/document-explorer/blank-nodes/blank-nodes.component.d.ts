/// <reference types="jquery" />
/// <reference types="jstree" />
import { ElementRef, EventEmitter, SimpleChange, AfterViewInit, OnChanges } from "@angular/core";
import * as RDFNode from "carbonldp/RDF/Node";
import { BlankNodeRow } from "./blank-node.component";
import "semantic-ui/semantic";
export declare class BlankNodesComponent implements AfterViewInit, OnChanges {
    element: ElementRef;
    $element: JQuery;
    nodesTab: JQuery;
    openedBlankNodes: BlankNodeRow[];
    blankNodesRecords: BlankNodesRecords;
    askingDeletionBlankNode: BlankNodeRow;
    blankNodes: BlankNodeRow[];
    namedFragments: RDFNode.Class[];
    documentURI: string;
    onChanges: EventEmitter<BlankNodesRecords>;
    onOpenBlankNode: EventEmitter<string>;
    onOpenNamedFragment: EventEmitter<string>;
    constructor(element: ElementRef);
    ngAfterViewInit(): void;
    ngOnChanges(changes: {
        [propName: string]: SimpleChange;
    }): void;
    openBlankNode(nodeOrId: RDFNode.Class | string): void;
    openNamedFragment(id: string): void;
    goToBlankNode(id: string): void;
    closeBlankNode(blankNode: BlankNodeRow, index?: number): void;
    getShortId(id: string): string;
    refreshTabs(): void;
    escape(value: string): string;
    changeBlankNode(blankNodeRow: BlankNodeRow, index?: number): void;
    deleteBlankNode(blankNodeRow: BlankNodeRow, index?: number): void;
    createBlankNode(): void;
    generateUUID(): string;
    initializeDeletionDimmer(): void;
    askToConfirmDeletion(clickEvent: Event, blankNode: BlankNodeRow): void;
    confirmDeletion(): void;
    cancelDeletion(): void;
}
export declare class BlankNodesRecords {
    changes: Map<string, BlankNodeRow>;
    deletions: Map<string, BlankNodeRow>;
    additions: Map<string, BlankNodeRow>;
    clear(): void;
}
export default BlankNodesComponent;
