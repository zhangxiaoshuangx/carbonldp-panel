import { ElementRef, EventEmitter } from "@angular/core";
import "semantic-ui/semantic";
import * as RDFNode from "carbonldp/RDF/Node";
import { LiteralRow } from "./../literals/literal.component";
import { PointerRow } from "./../pointers/pointer.component";
export declare class ListComponent {
    element: ElementRef;
    $element: JQuery;
    copyOrAddedOrModified: string;
    tempList: any[];
    orderHasChanged: boolean;
    private _list;
    list: ListRow;
    documentURI: string;
    pointers: PointerRow[];
    blankNodes: RDFNode.Class[];
    namedFragments: RDFNode.Class[];
    onSave: EventEmitter<ListRow>;
    onDeleteList: EventEmitter<ListRow>;
    onGoToBlankNode: EventEmitter<string>;
    onGoToNamedFragment: EventEmitter<string>;
    headers: string[];
    constructor(element: ElementRef);
    ngAfterViewInit(): void;
    isLiteral(item: any): boolean;
    isPointer(item: any): boolean;
    moveUp(pointerOrLiteral: PointerRow | LiteralRow, index: number): void;
    moveDown(pointerOrLiteral: PointerRow | LiteralRow, index: number): void;
    addPointer(): void;
    addLiteral(): void;
    saveItem(modifiedPointer: PointerRow, originalPointer: PointerRow, index: number): void;
    deleteItem(deletingItem: PointerRow | LiteralRow, index: number): void;
    getAddedItems(): PointerRow[] | LiteralRow[];
    getDeletedItems(): PointerRow[] | LiteralRow[];
    getModifiedItems(): PointerRow[] | LiteralRow[];
    getUntouchedItems(): Array<PointerRow | LiteralRow>;
    areEquals(original: Array<LiteralRow | PointerRow>, modified: Array<ListRow | PointerRow>): boolean;
    updateTempList(): void;
    hasBeenModified(): boolean;
    goToBlankNode(id: string): void;
    goToNamedFragment(id: string): void;
    initializeDeletionDimmer(): void;
    askToConfirmDeletion(): void;
    cancelDeletion(): void;
    deleteList(): void;
}
export interface ListRow {
    copy?: any;
    added?: any;
    modified?: any;
    deleted?: any;
    isBeingCreated?: boolean;
}
export interface List {
    "@list": any[];
}
