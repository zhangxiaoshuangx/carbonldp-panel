import { ElementRef, EventEmitter, OnInit } from "@angular/core";
import * as HTTP from "carbonldp/HTTP";
import { AuthService } from "angular2-carbonldp/services";
import "semantic-ui/semantic";
export declare class RegisterComponent implements OnInit {
    onRegister: EventEmitter<any>;
    private element;
    private $element;
    private authService;
    private sending;
    register: {
        name: string;
        email: string;
        password: string;
        repeatPassword: string;
        profileId: string;
    };
    private errorMessage;
    constructor(element: ElementRef, authService: AuthService.Class);
    ngOnInit(): void;
    onSubmit(form: any, $event: any): void;
    sanitize(evt: any): void;
    shakeForm(): void;
    setErrorMessage(error: HTTP.Errors.Error): void;
}
export default RegisterComponent;
