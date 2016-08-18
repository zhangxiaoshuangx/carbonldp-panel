import { EventEmitter, OnInit } from "@angular/core";
import { Modes } from "./../property/property.component";
import { Literal, LiteralRow } from "./literal.component";
import "semantic-ui/semantic";
export declare class LiteralsComponent implements OnInit {
    modes: Modes;
    tokens: string[];
    tempLiterals: Literal[];
    isLanguagePresent: boolean;
    isEditingLiteral: boolean;
    literals: LiteralRow[];
    onAddNewLiteral: EventEmitter<boolean>;
    canEdit: boolean;
    onLiteralsChanges: EventEmitter<LiteralRow[]>;
    constructor();
    ngOnInit(): void;
    existsToken(token: string): boolean;
    editModeChanged(value: boolean): void;
    saveLiteral(modifiedLiteral: Literal, originalLiteral: Literal, index: number): void;
    addNewLiteral(): void;
    deleteLiteral(deletingLiteral: LiteralRow, index: number): void;
    canDisplayLiterals(): boolean;
    getAddedLiterals(): LiteralRow[];
    getModifiedLiterals(): LiteralRow[];
    getDeletedLiterals(): LiteralRow[];
    getUntouchedLiterals(): LiteralRow[];
    canDisplayLanguage(): boolean;
}
export default LiteralsComponent;
