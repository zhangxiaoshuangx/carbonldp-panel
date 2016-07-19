import { ElementRef, EventEmitter, SimpleChange, AfterViewInit, OnChanges } from "@angular/core";
import * as RDFNode from "carbonldp/RDF/RDFNode";
import { BlankNodeRecords } from "./blank-node.component";
import "semantic-ui/semantic";
export declare class BlankNodesComponent implements AfterViewInit, OnChanges {
    element: ElementRef;
    $element: JQuery;
    nodesTab: JQuery;
    openedBNodes: RDFNode.Class[];
    bNodesChanges: Map<string, BlankNodeRecords>;
    bNodes: RDFNode.Class[];
    namedFragments: RDFNode.Class[];
    documentURI: string;
    onChanges: EventEmitter<Map<string, BlankNodeRecords>>;
    onOpenBNode: EventEmitter<string>;
    onOpenNamedFragment: EventEmitter<string>;
    constructor(element: ElementRef);
    ngAfterViewInit(): void;
    ngOnChanges(changes: {
        [propName: string]: SimpleChange;
    }): void;
    getPropertiesName(property: any): string[];
    notifyDocumentBNodeHasChanged(records: BlankNodeRecords, bNode: RDFNode.Class): void;
    openBNode(nodeOrId: RDFNode.Class | string): void;
    openNamedFragment(id: string): void;
    goToBNode(id: string): void;
    closeBNode(bNode: RDFNode.Class): void;
    refreshTabs(): void;
}
export default BlankNodesComponent;
