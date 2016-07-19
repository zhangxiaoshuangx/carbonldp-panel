import { ElementRef, SimpleChange, EventEmitter, OnChanges } from "@angular/core";
import { AbstractControl } from '@angular/common';
import * as RDFNode from "carbonldp/RDF/RDFNode";
import { Modes } from "./../property/property.component";
import "semantic-ui/semantic";
export declare class PointerComponent implements OnChanges {
    $element: JQuery;
    element: ElementRef;
    private tempPointer;
    pointersDropdown: JQuery;
    isBNode: boolean;
    isNamedFragment: boolean;
    existsOnPointers: boolean;
    private _mode;
    mode: string;
    modes: Modes;
    private _pointer;
    pointer: PointerRow;
    documentURI: string;
    bNodes: RDFNode.Class[];
    namedFragments: RDFNode.Class[];
    canEdit: boolean;
    onEditMode: EventEmitter<boolean>;
    onSave: EventEmitter<any>;
    onDeleteNewPointer: EventEmitter<PointerRow>;
    onDeletePointer: EventEmitter<PointerRow>;
    onGoToBNode: EventEmitter<string>;
    onGoToNamedFragment: EventEmitter<string>;
    private _id;
    id: string;
    idInput: AbstractControl;
    constructor(element: ElementRef);
    onEdit(event: Event): void;
    deletePointer(): void;
    ngOnChanges(changes: {
        [propName: string]: SimpleChange;
    }): void;
    checkForChangesOnPointers(): void;
    cancelEdit(): void;
    save(): void;
    private idValidator(control);
    private initializePointersDropdown();
    changeId(id: string, text?: string, choice?: JQuery): void;
    getFriendlyName(uri: string): string;
    goToBNode(id: string): void;
    goToNamedFragment(id: string): void;
}
export interface PointerRow {
    copy: Pointer;
    modified?: Pointer;
    added?: Pointer;
    deleted?: Pointer;
}
export interface Pointer {
    "@id": string;
}
export default PointerComponent;
