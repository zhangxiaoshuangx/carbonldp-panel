import { ElementRef, EventEmitter } from "@angular/core";
import { FormBuilder, ControlGroup, AbstractControl } from "@angular/common";
import { AuthService } from "angular2-carbonldp/services";
import Credentials from "carbonldp/Auth/Credentials";
import * as HTTP from "carbonldp/HTTP";
import "semantic-ui/semantic";
export declare class LoginComponent {
    container: string | JQuery;
    onLogin: EventEmitter<Credentials>;
    element: ElementRef;
    $element: JQuery;
    $loginForm: JQuery;
    sending: boolean;
    errorMessage: string;
    loginForm: ControlGroup;
    email: AbstractControl;
    password: AbstractControl;
    rememberMe: AbstractControl;
    remember: boolean;
    private formBuilder;
    private authService;
    constructor(element: ElementRef, formBuilder: FormBuilder, authService: AuthService.Class);
    ngOnInit(): void;
    onSubmit(data: {
        email: string;
        password: string;
        rememberMe: boolean;
    }, $event: any): void;
    getDays(firstDate: Date, lastDate: Date): number;
    setErrorMessage(error: HTTP.Errors.Error): void;
    shakeForm(): void;
}
export default LoginComponent;
