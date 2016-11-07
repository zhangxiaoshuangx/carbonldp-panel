import { QueryList } from "@angular/core";
import { NgForm } from "@angular/forms";
import { InputValidationDirective } from "./input-validation.directive";
export declare class FormValidationDirective {
    private ngForm;
    inputValidations: QueryList<InputValidationDirective>;
    readonly valid: boolean;
    constructor(ngForm: NgForm);
}
export default FormValidationDirective;
