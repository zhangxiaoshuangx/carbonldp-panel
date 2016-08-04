import { ElementRef, EventEmitter, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/common";
import * as HTTP from "carbonldp/HTTP";
import { AuthService } from "angular2-carbonldp/services";
import "semantic-ui/semantic";
export declare class RegisterComponent implements OnInit {
    onRegister: EventEmitter<any>;
    private element;
    private $element;
    private formBuilder;
    private authService;
    private sending;
    private registerForm;
    private controls;
    private errorMessage;
    constructor(element: ElementRef, formBuilder: FormBuilder, authService: AuthService.Class);
    ngOnInit(): void;
    onSubmit(data: {
        name: string;
        email: string;
        password: string;
    }, $event: any): void;
    touchControls(): void;
    shakeForm(): void;
    setErrorMessage(error: HTTP.Errors.Error): void;
}
export default RegisterComponent;
