import { NgModel, AbstractControl } from "@angular/forms";
export declare class InputValidation {
    private ngModel;
    input: any;
    readonly control: AbstractControl;
    readonly valid: boolean;
    private hasFocus;
    private wasFocused;
    constructor(ngModel: NgModel);
    onFocus(): void;
    onBlur(): void;
}
export default InputValidation;
