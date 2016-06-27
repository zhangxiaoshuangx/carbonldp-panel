import { AbstractControl, Validator } from "@angular/forms";
export declare class EmailValidator implements Validator {
    validate(control: AbstractControl): {
        [key: string]: any;
    };
}
export declare class PasswordValidator {
    validate(control: AbstractControl): {
        [key: string]: any;
    };
}
