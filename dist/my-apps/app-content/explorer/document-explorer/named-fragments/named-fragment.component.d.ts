import { ElementRef, EventEmitter, AfterViewInit } from "@angular/core";
import * as RDFNode from "carbonldp/RDF/RDFNode";
import { Property, PropertyRow, Modes } from "./../property/property.component";
import "semantic-ui/semantic";
export declare class NamedFragmentComponent implements AfterViewInit {
    element: ElementRef;
    $element: JQuery;
    modes: Modes;
    properties: PropertyRow[];
    existingProperties: string[];
    records: NamedFragmentRecords;
    private _namedFragmentChanged;
    namedFragmentChanged: boolean;
    bNodes: RDFNode.Class[];
    namedFragments: RDFNode.Class[];
    canEdit: boolean;
    documentURI: string;
    private _namedFragment;
    namedFragment: RDFNode.Class;
    onOpenBNode: EventEmitter<string>;
    onOpenNamedFragment: EventEmitter<string>;
    onChanges: EventEmitter<NamedFragmentRecords>;
    constructor(element: ElementRef);
    ngAfterViewInit(): void;
    openBNode(id: string): void;
    openNamedFragment(id: string): void;
    changeProperty(property: PropertyRow, index: number): void;
    deleteProperty(property: PropertyRow, index: number): void;
    addProperty(property: PropertyRow, index: number): void;
    createProperty(property: Property, propertyRow: PropertyRow): void;
    getProperties(): void;
    updateExistingProperties(): void;
}
export declare class NamedFragment {
    id: string;
    properties: Property[];
}
export declare class NamedFragmentRecords {
    changes: Map<string, PropertyRow>;
    deletions: Map<string, PropertyRow>;
    additions: Map<string, PropertyRow>;
}
export default NamedFragmentComponent;
