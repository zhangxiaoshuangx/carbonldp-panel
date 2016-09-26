import { OnChanges } from "@angular/core";
import { AbstractControl, Validator } from "@angular/forms";
export declare class EmailValidator implements Validator {
    validate(control: AbstractControl): {
        [key: string]: any;
    };
}
export declare class PasswordValidator implements Validator {
    validate(control: AbstractControl): {
        [key: string]: any;
    };
}
export declare class MatchValidator implements Validator, OnChanges {
    matchTo: any;
    validate(control: AbstractControl): {
        [key: string]: any;
    };
}
