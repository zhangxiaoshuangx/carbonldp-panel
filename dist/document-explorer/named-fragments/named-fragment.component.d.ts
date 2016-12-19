import { ElementRef, EventEmitter, AfterViewInit } from "@angular/core";
import * as RDFNode from "carbonldp/RDF/RDFNode";
import { BlankNodeRow } from "./../blank-nodes/blank-node.component";
import { Property, PropertyRow, Modes } from "./../property/property.component";
import "semantic-ui/semantic";
export declare class NamedFragmentComponent implements AfterViewInit {
    element: ElementRef;
    $element: JQuery;
    modes: Modes;
    records: NamedFragmentRecords;
    copyOrAdded: string;
    tempPropertiesNames: string[];
    rootNode: RDFNode.Class;
    properties: PropertyRow[];
    existingPropertiesNames: string[];
    private _namedFragmentHasChanged;
    namedFragmentHasChanged: boolean;
    blankNodes: BlankNodeRow[];
    namedFragments: NamedFragmentRow[];
    canEdit: boolean;
    documentURI: string;
    private _namedFragment;
    namedFragment: NamedFragmentRow;
    onOpenBlankNode: EventEmitter<string>;
    onOpenNamedFragment: EventEmitter<string>;
    onChanges: EventEmitter<NamedFragmentRow>;
    constructor(element: ElementRef);
    ngAfterViewInit(): void;
    openBlankNode(id: string): void;
    openNamedFragment(id: string): void;
    changeProperty(property: PropertyRow, index: number): void;
    deleteProperty(property: PropertyRow, index: number): void;
    addProperty(property: PropertyRow, index: number): void;
    createProperty(property: Property, propertyRow: PropertyRow): void;
    getProperties(): void;
    updateExistingProperties(): void;
    getRawVersion(): RDFNode.Class;
}
export interface NamedFragmentRow {
    id?: string;
    name?: string;
    copy?: RDFNode.Class;
    added?: RDFNode.Class;
    modified?: RDFNode.Class;
    deleted?: RDFNode.Class;
    records?: NamedFragmentRecords;
}
export declare class NamedFragmentRecords {
    changes: Map<string, PropertyRow>;
    deletions: Map<string, PropertyRow>;
    additions: Map<string, PropertyRow>;
}
export default NamedFragmentComponent;
