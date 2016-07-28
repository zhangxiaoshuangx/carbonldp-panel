import { ElementRef, EventEmitter, SimpleChange, OnChanges, AfterContentInit } from "@angular/core";
import * as RDFNode from "carbonldp/RDF/RDFNode";
import { NamedFragmentRecords } from "./named-fragment.component";
import "semantic-ui/semantic";
export declare class NamedFragmentsComponent implements AfterContentInit, OnChanges {
    element: ElementRef;
    $element: JQuery;
    nodesTab: JQuery;
    openedNamedFragments: RDFNode.Class[];
    namedFragmentsChanges: Map<string, NamedFragmentRecords>;
    bNodes: RDFNode.Class[];
    namedFragments: RDFNode.Class[];
    documentURI: string;
    onChanges: EventEmitter<Map<string, NamedFragmentRecords>>;
    onOpenBNode: EventEmitter<string>;
    onOpenNamedFragment: EventEmitter<string>;
    constructor(element: ElementRef);
    ngAfterContentInit(): void;
    ngOnChanges(changes: {
        [propName: string]: SimpleChange;
    }): void;
    getPropertiesName(property: any): string[];
    notifyNamedFragmentHasChanged(records: NamedFragmentRecords, namedFragment: RDFNode.Class): void;
    openNamedFragment(nodeOrId: RDFNode.Class | string): void;
    openBNode(id: string): void;
    goToNamedFragment(id: string): void;
    closeNamedFragment(namedFragment: RDFNode.Class): void;
    refreshTabs(): void;
    getNormalizedUri(uri: string): string;
    getSlug(uri: string): any;
}
export default NamedFragmentsComponent;
