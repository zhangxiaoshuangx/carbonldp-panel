import { OnChanges, SimpleChanges } from "@angular/core";
import { AbstractControl, Validator } from "@angular/forms";
export declare class PropertyNameValidator implements Validator, OnChanges {
    existingProperties: any;
    property: any;
    id: any;
    originalName: any;
    control: any;
    url: RegExp;
    ngOnChanges(changes: SimpleChanges): void;
    validate(control: AbstractControl): {
        [key: string]: any;
    };
}
export declare class IdValidator implements Validator, OnChanges {
    existingFragments: any;
    property: any;
    documentURI: any;
    id: any;
    originalId: any;
    control: any;
    url: RegExp;
    ngOnChanges(changes: SimpleChanges): void;
    validate(control: AbstractControl): {
        [key: string]: any;
    };
}
export declare class LiteralValueValidator implements Validator, OnChanges {
    type: any;
    control: any;
    ngOnChanges(changes: SimpleChanges): void;
    validate(control: AbstractControl): {
        [key: string]: any;
    };
}
export declare class PointerValidator implements Validator {
    documentURI: any;
    url: RegExp;
    validate(control: AbstractControl): {
        [key: string]: any;
    };
}
