import { ElementRef, EventEmitter, AfterViewInit, OnInit } from "@angular/core";
import { AbstractControl } from '@angular/common';
import * as RDFNode from "carbonldp/RDF/RDFNode";
import { LiteralRow } from "./../literals/literal.component";
import { PointerRow } from "./../pointers/pointer.component";
import "semantic-ui/semantic";
export declare class PropertyComponent implements AfterViewInit, OnInit {
    element: ElementRef;
    $element: JQuery;
    literals: LiteralRow[];
    pointers: PointerRow[];
    tempLiterals: LiteralRow[];
    tempPointers: PointerRow[];
    tempProperty: Property;
    copyOrAdded: string;
    id: string;
    name: string;
    value: any[];
    addNewLiteral: EventEmitter<boolean>;
    addNewPointer: EventEmitter<boolean>;
    commonToken: string[];
    modes: Modes;
    nameInput: AbstractControl;
    mode: string;
    documentURI: string;
    bNodes: RDFNode.Class[];
    namedFragments: RDFNode.Class[];
    canEdit: boolean;
    existingProperties: string[];
    private _property;
    property: PropertyRow;
    onGoToBNode: EventEmitter<string>;
    onGoToNamedFragment: EventEmitter<string>;
    onChangeProperty: EventEmitter<Property>;
    onDeleteProperty: EventEmitter<PropertyRow>;
    onDeleteNewProperty: EventEmitter<PropertyRow>;
    onSaveNewProperty: EventEmitter<PropertyRow>;
    nameHasChanged: boolean;
    literalsHaveChanged: boolean;
    pointersHaveChanged: boolean;
    readonly propertyHasChanged: boolean;
    constructor(element: ElementRef);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    getDisplayName(uri: string): string;
    getParentURI(uri: string): string;
    getSlug(uri: string): string;
    getFragment(uri: string): string;
    isArray(property: any): boolean;
    isUrl(uri: string): boolean;
    goToBNode(id: string): void;
    goToNamedFragment(id: string): void;
    getTypeIcon(type: string): string;
    initializeAccordions(): void;
    initializePropertyButtons(): void;
    initializeDeletionDimmer(): void;
    onEditName(): void;
    cancelDeletion(): void;
    cancelEdition(): void;
    askToConfirmDeletion(): void;
    deleteProperty(): void;
    save(): void;
    fillLiteralsAndPointers(): void;
    addLiteral(): void;
    addPointer(): void;
    checkForChangesOnName(newName: string): void;
    checkForChangesOnLiterals(literals: LiteralRow[]): void;
    checkForChangesOnPointers(pointers: PointerRow[]): void;
    changePropertyContent(): void;
    private nameValidator(control);
}
export interface PropertyRow {
    copy?: any;
    added?: any;
    modified?: any;
    deleted?: any;
}
export interface Property {
    id: string;
    name: string;
    value: any[];
}
export declare class Modes {
    static EDIT: string;
    static READ: string;
}
export default PropertyComponent;
