import { ElementRef, EventEmitter, OnInit } from "@angular/core";
import { AuthService } from "angular2-carbonldp/services";
import Credentials from "carbonldp/Auth/Credentials";
import * as HTTP from "carbonldp/HTTP";
import "semantic-ui/semantic";
export declare class LoginComponent implements OnInit {
    container: string | JQuery;
    onLogin: EventEmitter<Credentials>;
    element: ElementRef;
    $element: JQuery;
    $loginForm: JQuery;
    sending: boolean;
    errorMessage: string;
    login: {
        email: string;
        password: string;
        rememberMe: boolean;
    };
    private authService;
    constructor(element: ElementRef, authService: AuthService.Class);
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
