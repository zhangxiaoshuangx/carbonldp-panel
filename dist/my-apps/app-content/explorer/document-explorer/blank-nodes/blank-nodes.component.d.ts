import { ElementRef, EventEmitter, SimpleChange, AfterViewInit, OnChanges } from "@angular/core";
import * as RDFNode from "carbonldp/RDF/RDFNode";
import { BlankNodeRow } from "./blank-node.component";
import "semantic-ui/semantic";
export declare class BlankNodesComponent implements AfterViewInit, OnChanges {
    element: ElementRef;
    $element: JQuery;
    nodesTab: JQuery;
    openedBlankNodes: BlankNodeRow[];
    blankNodesRecords: BlankNodesRecords;
    blankNodes: BlankNodeRow[];
    namedFragments: RDFNode.Class[];
    documentURI: string;
    onChanges: EventEmitter<BlankNodesRecords>;
    onOpenBNode: EventEmitter<string>;
    onOpenNamedFragment: EventEmitter<string>;
    constructor(element: ElementRef);
    ngAfterViewInit(): void;
    ngOnChanges(changes: {
        [propName: string]: SimpleChange;
    }): void;
    notifyBlankNodesHaveChanged(): void;
    openBlankNode(nodeOrId: RDFNode.Class | string): void;
    openNamedFragment(id: string): void;
    goToBlankNode(id: string): void;
    closeBlankNode(bNode: RDFNode.Class): void;
    refreshTabs(): void;
    escape(value: string): string;
    changeBlankNode(blankNodeRow: BlankNodeRow, index: number): void;
    updateExistingBlankNodes(): void;
}
export declare class BlankNodesRecords {
    changes: Map<string, BlankNodeRow>;
    deletions: Map<string, BlankNodeRow>;
    additions: Map<string, BlankNodeRow>;
    clear(): void;
}
export default BlankNodesComponent;
