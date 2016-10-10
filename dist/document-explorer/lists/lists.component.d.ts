import { EventEmitter, OnInit } from "@angular/core";
import * as RDFNode from "carbonldp/RDF/RDFNode";
import { Modes } from "./../property/property.component";
import { List, ListRow } from "./list.component";
import "semantic-ui/semantic";
export declare class ListsComponent implements OnInit {
    modes: Modes;
    canDisplayLists: boolean;
    documentURI: string;
    lists: ListRow[];
    onAddNewList: EventEmitter<boolean>;
    blankNodes: RDFNode.Class[];
    namedFragments: RDFNode.Class[];
    canEdit: boolean;
    onListsChanges: EventEmitter<ListRow[]>;
    onGoToBlankNode: EventEmitter<string>;
    onGoToNamedFragment: EventEmitter<string>;
    constructor();
    ngOnInit(): void;
    ngOnChanges(changes: {
        [propName: string];
    }): void;
    addNewList(): void;
    saveList(modifiedList: List, originalList: List, index: number): void;
    deleteList(deletingList: ListRow, index: number): void;
    updateCanDisplayLists(): void;
    getAddedLists(): ListRow[];
    getDeletedLists(): ListRow[];
    getModifiedLists(): ListRow[];
    getUntouchedLists(): ListRow[];
    goToBlankNode(id: string): void;
    goToNamedFragment(id: string): void;
}
export default ListsComponent;
