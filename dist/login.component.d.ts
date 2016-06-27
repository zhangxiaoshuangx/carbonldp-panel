import { ElementRef, EventEmitter } from "@angular/core";
import { AuthService } from "angular2-carbonldp/services";
import Credentials from "carbonldp/Auth/Credentials";
import * as HTTP from "carbonldp/HTTP";
import "semantic-ui/semantic";
export declare class LoginComponent {
    private element;
    private authService;
    container: string | JQuery;
    onLogin: EventEmitter<Credentials>;
    sending: boolean;
    errorMessage: string;
    model: {
        username: string;
        password: string;
    };
    remember: boolean;
    console: typeof console;
    private $element;
    private $loginForm;
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
