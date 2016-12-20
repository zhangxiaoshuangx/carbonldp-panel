/// <reference types="jquery" />
/// <reference types="jstree" />
import { ElementRef, EventEmitter, AfterViewInit } from "@angular/core";
import * as RDFNode from "carbonldp/RDF/RDFNode";
import { Property, PropertyRow, Modes } from "./../property/property.component";
import "semantic-ui/semantic";
export declare class DocumentResourceComponent implements AfterViewInit {
    element: ElementRef;
    $element: JQuery;
    modes: Modes;
    properties: PropertyRow[];
    existingPropertiesNames: string[];
    records: RootRecords;
    private _rootHasChanged;
    rootHasChanged: boolean;
    displayOnly: string[];
    hiddenProperties: string[];
    blankNodes: RDFNode.Class[];
    namedFragments: RDFNode.Class[];
    canEdit: boolean;
    documentURI: string;
    private _rootNode;
    rootNode: RDFNode.Class;
    onOpenBlankNode: EventEmitter<string>;
    onOpenNamedFragment: EventEmitter<string>;
    onChanges: EventEmitter<RootRecords>;
    constructor(element: ElementRef);
    ngAfterViewInit(): void;
    openBlankNode(id: string): void;
    openNamedFragment(id: string): void;
    canDisplay(propertyName: any): boolean;
    changeProperty(property: PropertyRow, index: number): void;
    deleteProperty(property: PropertyRow, index: number): void;
    addProperty(property: PropertyRow, index: number): void;
    createProperty(property: Property, propertyRow: PropertyRow): void;
    getProperties(): void;
    updateExistingProperties(): void;
}
export declare class RootRecords {
    changes: Map<string, PropertyRow>;
    deletions: Map<string, PropertyRow>;
    additions: Map<string, PropertyRow>;
}
export default DocumentResourceComponent;
