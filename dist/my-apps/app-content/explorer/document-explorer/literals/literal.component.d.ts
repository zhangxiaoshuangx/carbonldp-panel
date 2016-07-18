import { ElementRef, EventEmitter } from "@angular/core";
import { AbstractControl } from '@angular/common';
import { Modes } from "./../property/property.component";
import "semantic-ui/semantic";
export declare class LiteralComponent {
    element: ElementRef;
    private _mode;
    private tempLiteral;
    searchDropdown: JQuery;
    languageDropdown: JQuery;
    mode: string;
    modes: Modes;
    dataTypes: any;
    isStringType: boolean;
    languages: {
        code: string;
        name: string;
    }[];
    private _value;
    value: string | boolean | number;
    private _type;
    type: string;
    private _language;
    language: string;
    private _literal;
    literal: LiteralRow;
    canEdit: boolean;
    canDisplayLanguage: boolean;
    onEditMode: EventEmitter<boolean>;
    onSave: EventEmitter<any>;
    onDeleteNewLiteral: EventEmitter<LiteralRow>;
    onDeleteLiteral: EventEmitter<LiteralRow>;
    valueInput: AbstractControl;
    typeInput: AbstractControl;
    languageInput: AbstractControl;
    constructor(element: ElementRef);
    onEdit(event: Event): void;
    deleteLiteral(): void;
    cancelEdit(): void;
    save(): void;
    changeType(type: string, text?: string, choice?: JQuery): void;
    changeLanguage(language: string, text?: string, choice?: JQuery): void;
    private initializeLanguageDropdown();
    private initializeTypesDropdown();
    private getDataTypes();
    private getXSDDataTypes();
    private valueValidator(control);
}
export interface LiteralRow {
    copy: Literal;
    modified?: Literal;
    added?: Literal;
    deleted?: Literal;
}
export interface Literal {
    "@value": string | number | boolean;
    "@type"?: string;
    "@language"?: string;
}
export default LiteralComponent;
