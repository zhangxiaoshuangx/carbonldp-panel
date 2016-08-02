import { ElementRef, EventEmitter, AfterViewInit, SimpleChange, OnChanges } from "@angular/core";
import * as RDFNode from "carbonldp/RDF/RDFNode";
import { Property, PropertyRow, Modes } from "./../property/property.component";
import "semantic-ui/semantic";
export declare class BlankNodeComponent implements AfterViewInit, OnChanges {
    element: ElementRef;
    $element: JQuery;
    modes: Modes;
    records: BlankNodeRecords;
    copyOrModifiedOrAdded: string;
    tempBlankNode: BlankNodeRow;
    tempProperties: PropertyRow[];
    tempPropertiesNames: string[];
    private _bNodeHasChanged;
    bNodeHasChanged: boolean;
    blankNodes: BlankNodeRow[];
    namedFragments: RDFNode.Class[];
    canEdit: boolean;
    documentURI: string;
    blankNode: BlankNodeRow;
    onOpenBNode: EventEmitter<string>;
    onOpenNamedFragment: EventEmitter<string>;
    onChanges: EventEmitter<BlankNodeRow>;
    constructor(element: ElementRef);
    ngAfterViewInit(): void;
    ngOnChanges(changes: {
        [propName: string]: SimpleChange;
    }): void;
    openBNode(id: string): void;
    openNamedFragment(id: string): void;
    changeProperty(property: PropertyRow, index: number): void;
    deleteProperty(property: PropertyRow, index: number): void;
    addProperty(property: PropertyRow, index: number): void;
    createProperty(property: Property, propertyRow: PropertyRow): void;
    getPropertiesNames(object: any): string[];
    getProperties(blankNode: BlankNodeRow): PropertyRow[];
    updateTempProperties(): void;
}
export interface BlankNodeRow {
    id?: string;
    bNodeIdentifier?: string;
    copy?: RDFNode.Class;
    added?: RDFNode.Class;
    modified?: RDFNode.Class;
    deleted?: RDFNode.Class;
    records?: BlankNodeRecords;
}
export declare class BlankNode {
    id: string;
    properties: PropertyRow[];
}
export declare class BlankNodeRecords {
    changes: Map<string, PropertyRow>;
    deletions: Map<string, PropertyRow>;
    additions: Map<string, PropertyRow>;
}
export default BlankNodeComponent;
