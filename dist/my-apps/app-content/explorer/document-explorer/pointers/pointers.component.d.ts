import { EventEmitter, OnInit } from "@angular/core";
import * as RDFNode from "carbonldp/RDF/RDFNode";
import { Modes } from "./../property/property.component";
import { Pointer, PointerRow } from "./pointer.component";
import "semantic-ui/semantic";
export declare class PointersComponent implements OnInit {
    modes: Modes;
    tokens: string[];
    tempPointers: Pointer[];
    isEditingPointer: boolean;
    documentURI: string;
    pointers: PointerRow[];
    onAddNewPointer: EventEmitter<boolean>;
    bNodes: RDFNode.Class[];
    namedFragments: RDFNode.Class[];
    canEdit: boolean;
    onPointersChanges: EventEmitter<PointerRow[]>;
    onGoToBNode: EventEmitter<string>;
    onGoToNamedFragment: EventEmitter<string>;
    constructor();
    ngOnInit(): void;
    addNewPointer(): void;
    savePointer(modifiedPointer: Pointer, originalPointer: Pointer, index: number): void;
    saveNewPointer(newPointer: Pointer, originalPointer: Pointer, index: number): void;
    deletePointer(deletingPointer: PointerRow, index: number): void;
    deleteNewPointer(deletingPointer: PointerRow, index: number): void;
    canDisplayPointers(): boolean;
    getAddedPointers(): PointerRow[];
    getModifiedPointers(): PointerRow[];
    getDeletedPointers(): PointerRow[];
    getUntouchedPointers(): PointerRow[];
    goToBNode(id: string): void;
    goToNamedFragment(id: string): void;
}
export default PointersComponent;
