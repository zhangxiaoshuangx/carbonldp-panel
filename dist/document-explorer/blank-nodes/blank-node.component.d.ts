import { ElementRef, EventEmitter, AfterViewInit } from "@angular/core";
import * as RDFNode from "carbonldp/RDF/Node";
import { Property, PropertyRow, Modes } from "./../property/property.component";
import "semantic-ui/semantic";
export declare class BlankNodeComponent implements AfterViewInit {
    element: ElementRef;
    $element: JQuery;
    modes: Modes;
    records: BlankNodeRecords;
    nonEditableProperties: string[];
    copyOrAdded: string;
    tempPropertiesNames: string[];
    rootNode: RDFNode.Class;
    properties: PropertyRow[];
    existingPropertiesNames: string[];
    private _bNodeHasChanged;
    bNodeHasChanged: boolean;
    blankNodes: BlankNodeRow[];
    namedFragments: RDFNode.Class[];
    canEdit: boolean;
    documentURI: string;
    private _blankNode;
    blankNode: BlankNodeRow;
    onOpenBlankNode: EventEmitter<string>;
    onOpenNamedFragment: EventEmitter<string>;
    onChanges: EventEmitter<BlankNodeRow>;
    constructor(element: ElementRef);
    ngAfterViewInit(): void;
    openBlankNode(id: string): void;
    openNamedFragment(id: string): void;
    changeProperty(property: PropertyRow, index: number): void;
    deleteProperty(property: PropertyRow, index: number): void;
    addProperty(property: PropertyRow, index: number): void;
    createProperty(property: Property, propertyRow: PropertyRow): void;
    canEditProperty(property: PropertyRow): boolean;
    getProperties(): void;
    updateExistingProperties(): void;
    getRawVersion(): RDFNode.Class;
    sortFirstProperties(propertiesNames: string[], firstPropertiesToShow: string[]): void;
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
export declare class BlankNodeRecords {
    changes: Map<string, PropertyRow>;
    deletions: Map<string, PropertyRow>;
    additions: Map<string, PropertyRow>;
}
export default BlankNodeComponent;
