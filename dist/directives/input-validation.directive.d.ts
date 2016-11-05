import { NgModel, AbstractControl } from "@angular/forms";
/**
 * This directive gives you a valid state that takes into consideration the user's interaction with the control.
 * The "valid" state will be true on the following conditions:
 * <ul>
 *     <li>If the user hasn't focused the control</li>
 *     <li>If the control has focus</li>
 *     <li>If the control is valid (based on ngModel validations)</li>
 * </ul>
 * The intention is to simplify error conditions that would require too much logic instead.
 *
 * @example
 * <input [ngModel]="email" cpValidation #email="cpValidation" [class.error]="! email.valid">
 *
 * <div class="error-message" *ngIf="! email.valid">
 *     <ul>
 *         <li *ngIf="email.control.hasError( 'required' )">Please provide an email address</li>
 *         <li *ngIf="email.control.hasError( 'email' )">Please provide a valid email address</li>
 *     </ul>
 * </div>
 */
export declare class InputValidationDirective {
    private ngModel;
    readonly control: AbstractControl;
    readonly valid: boolean;
    private hasFocus;
    private wasFocused;
    constructor(ngModel: NgModel);
    onFocus(): void;
    onBlur(): void;
}
export default InputValidationDirective;
