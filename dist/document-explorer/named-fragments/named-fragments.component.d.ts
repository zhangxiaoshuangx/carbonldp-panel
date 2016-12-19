import { ElementRef, EventEmitter, SimpleChange, OnChanges, AfterViewInit } from "@angular/core";
import { NamedFragmentRow } from "./named-fragment.component";
import { BlankNodeRow } from "./../blank-nodes/blank-node.component";
import "semantic-ui/semantic";
export declare class NamedFragmentsComponent implements AfterViewInit, OnChanges {
    element: ElementRef;
    $element: JQuery;
    nodesTab: JQuery;
    openedNamedFragments: NamedFragmentRow[];
    namedFragmentsRecords: NamedFragmentsRecords;
    askingDeletionNamedFragment: NamedFragmentRow;
    blankNodes: BlankNodeRow[];
    namedFragments: NamedFragmentRow[];
    documentURI: string;
    onChanges: EventEmitter<NamedFragmentsRecords>;
    onOpenBlankNode: EventEmitter<string>;
    onOpenNamedFragment: EventEmitter<string>;
    constructor(element: ElementRef);
    ngAfterViewInit(): void;
    ngOnChanges(changes: {
        [propName: string]: SimpleChange;
    }): void;
    openNamedFragment(nodeOrId: NamedFragmentRow | string): void;
    openBlankNode(id: string): void;
    goToNamedFragment(id: string): void;
    closeNamedFragment(namedFragment: NamedFragmentRow, index?: number): void;
    refreshTabs(): void;
    getNormalizedUri(uri: string): string;
    getSlug(uri: string): string;
    changeNamedFragment(namedFragmentRow: NamedFragmentRow, index?: number): void;
    deleteNamedFragment(namedFragmentRow: NamedFragmentRow, index?: number): void;
    createNamedFragment(): void;
    initializeDeletionDimmer(): void;
    askToConfirmDeletion(clickEvent: Event, blankNode: BlankNodeRow): void;
    confirmDeletion(): void;
    cancelDeletion(): void;
}
export declare class NamedFragmentsRecords {
    changes: Map<string, NamedFragmentRow>;
    deletions: Map<string, NamedFragmentRow>;
    additions: Map<string, NamedFragmentRow>;
    clear(): void;
}
export default NamedFragmentsComponent;
