import { AbstractControl } from "@angular/common";
import { ValidatorFn } from "@angular/common/src/forms/directives/validators";
export declare let EmailValidator: ValidatorFn;
export declare let PasswordValidator: ValidatorFn;
export declare let SameAsValidator: (controlToCompare: AbstractControl) => ValidatorFn;
