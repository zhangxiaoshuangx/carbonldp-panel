import { ElementRef, EventEmitter, AfterViewInit, OnInit } from "@angular/core";
import * as RDFNode from "carbonldp/RDF/RDFNode";
import { LiteralRow } from "./../literals/literal.component";
import { PointerRow } from "./../pointers/pointer.component";
import { NamedFragmentRow } from "./../named-fragments/named-fragment.component";
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
    existingFragments: string[];
    id: string;
    originalId: string;
    name: string;
    originalName: string;
    value: any[] | string;
    addNewLiteral: EventEmitter<boolean>;
    addNewPointer: EventEmitter<boolean>;
    commonToken: string[];
    modes: Modes;
    nameInputControl: any;
    idInputControl: any;
    mode: string;
    documentURI: string;
    bNodes: RDFNode.Class[];
    namedFragments: NamedFragmentRow[];
    isPartOfNamedFragment: boolean;
    canEdit: boolean;
    existingProperties: string[];
    private _property;
    property: PropertyRow;
    onGoToBlankNode: EventEmitter<string>;
    onGoToNamedFragment: EventEmitter<string>;
    onChangeProperty: EventEmitter<Property>;
    onDeleteProperty: EventEmitter<PropertyRow>;
    onDeleteNewProperty: EventEmitter<PropertyRow>;
    onSaveNewProperty: EventEmitter<PropertyRow>;
    onChangeNewProperty: EventEmitter<PropertyRow>;
    onRefreshDocument: EventEmitter<string>;
    nameHasChanged: boolean;
    valueHasChanged: boolean;
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
    onEditId(): void;
    cancelDeletion(): void;
    cancelEdition(): void;
    cancelIdEdition(): void;
    askToConfirmDeletion(): void;
    deleteProperty(): void;
    save(): void;
    saveId(): void;
    sanitize(value: string): string;
    fillLiteralsAndPointers(): void;
    addLiteral(): void;
    addPointer(): void;
    checkForChangesOnName(newName: string): void;
    checkForChangesOnId(newId: string): void;
    checkForChangesOnLiterals(literals: LiteralRow[]): void;
    checkForChangesOnPointers(pointers: PointerRow[]): void;
    changePropertyContent(): void;
    private refreshDocument();
    private escape(uri);
    private unescape(uri);
}
export interface PropertyRow {
    copy?: any;
    added?: any;
    modified?: any;
    deleted?: any;
    isBeingCreated?: boolean;
    isBeingModified?: boolean;
    isBeingDeleted?: boolean;
    modifiedLiterals?: LiteralRow[];
    modifiedPointers?: PointerRow[];
}
export interface Property {
    id: string;
    name: string;
    value: any;
}
export declare class Modes {
    static EDIT: string;
    static READ: string;
}
export default PropertyComponent;
