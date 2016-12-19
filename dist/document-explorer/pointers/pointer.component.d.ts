import { ElementRef, SimpleChange, EventEmitter, OnChanges } from "@angular/core";
import { Modes } from "./../property/property.component";
import { BlankNodeRow } from "./../blank-nodes/blank-node.component";
import { NamedFragmentRow } from "./../named-fragments/named-fragment.component";
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
    bNodes: BlankNodeRow[];
    namedFragments: NamedFragmentRow[];
    canEdit: boolean;
    partOfList: boolean;
    isFirstItem: boolean;
    isLastItem: boolean;
    onEditMode: EventEmitter<boolean>;
    onSave: EventEmitter<any>;
    onDeletePointer: EventEmitter<PointerRow>;
    onGoToBNode: EventEmitter<string>;
    onGoToNamedFragment: EventEmitter<string>;
    onMoveUp: EventEmitter<PointerRow>;
    onMoveDown: EventEmitter<PointerRow>;
    private _id;
    id: string;
    constructor(element: ElementRef);
    onEdit(event: Event): void;
    deletePointer(): void;
    ngOnChanges(changes: {
        [propName: string]: SimpleChange;
    }): void;
    checkForChangesOnPointers(): void;
    cancelEdit(): void;
    save(): void;
    private initializePointersDropdown();
    changeId(id: string, text?: string, choice?: JQuery): void;
    getFriendlyName(uri: string): string;
    goToBNode(id: string): void;
    goToNamedFragment(id: string): void;
    moveUp(): void;
    moveDown(): void;
}
export interface PointerRow {
    copy: Pointer;
    modified?: Pointer;
    added?: Pointer;
    deleted?: Pointer;
    isBeingCreated?: boolean;
}
export interface Pointer {
    "@id": string;
}
export default PointerComponent;
