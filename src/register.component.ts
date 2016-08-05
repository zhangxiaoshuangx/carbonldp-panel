import { Component, ElementRef, Output, Inject, EventEmitter, OnInit } from "@angular/core";
import { FORM_DIRECTIVES, FormBuilder, ControlGroup, AbstractControl, Validators } from "@angular/common";

import * as HTTP from "carbonldp/HTTP";

import { AuthService } from "angular2-carbonldp/services";

import { EmailValidator, SameAsValidator } from "carbon-panel/custom-validators";

import $ from "jquery";
import "semantic-ui/semantic";

import template from "./register.component.html!"

@Component( {
	selector: "cp-register",
	template: template,
	styles: [],
	directives: [ FORM_DIRECTIVES ],
} )
export class RegisterComponent implements OnInit {
	@Output( "onRegister" ) onRegister:EventEmitter<any> = new EventEmitter<any>();

	private element:ElementRef;
	private $element:JQuery;
	private formBuilder:FormBuilder;
	private authService:AuthService.Class;

	private sending:boolean = false;
	private registerForm:ControlGroup;
	private controls:{
		name?:AbstractControl,
		email?:AbstractControl,
		password?:AbstractControl,
		repeatPassword?:AbstractControl,
	} = {};
	private errorMessage:string = "";

	constructor( element:ElementRef, formBuilder:FormBuilder, @Inject( AuthService.Token ) authService:AuthService.Class ) {
		this.element = element;
		this.formBuilder = formBuilder;
		this.authService = authService;
	}

	ngOnInit():void {
		this.$element = $( this.element.nativeElement );

		this.registerForm = this.formBuilder.group( {
			name: [ "", Validators.compose( [ Validators.required ] ) ],
			email: [ "", Validators.compose( [ Validators.required, EmailValidator ] ) ],
			password: [ "", Validators.compose( [ Validators.required ] ) ],
		} );

		this.controls.name = this.registerForm.controls[ "name" ];
		this.controls.email = this.registerForm.controls[ "email" ];
		this.controls.password = this.registerForm.controls[ "password" ];

		this.controls.repeatPassword = this.formBuilder.control( "", Validators.compose( [ Validators.required, SameAsValidator( this.controls.password ) ] ) );
		this.registerForm.addControl( "repeatPassword", this.controls.repeatPassword );
	}

	onSubmit( data:{ name:string, email:string, password:string }, $event:any ):void {
		$event.preventDefault();

		this.sending = true;
		this.errorMessage = "";

		this.touchControls();

		if( ! this.registerForm.valid ) {
			this.shakeForm();
			this.sending = false;
			return;
		}

		let name:string = data.name;
		let username:string = data.email;
		let password:string = data.password;

		this.authService.register( name, username, password ).then( () => {
			this.sending = false;
			this.onRegister.emit( null );
		} ).catch( ( error:any ) => {
			this.sending = false;
			this.setErrorMessage( error );
		} );
	}

	touchControls():void {
		for( let controlName in this.controls ) {
			if( ! this.controls.hasOwnProperty( controlName ) ) continue;

			let control:AbstractControl = this.controls[ controlName ];
			control.markAsTouched();
		}
	}

	shakeForm():void {
		let target:JQuery = this.$element;
		target.transition( {
			animation: "shake",
		} );
	}

	setErrorMessage( error:HTTP.Errors.Error ):void {
		switch( true ) {
			case error instanceof HTTP.Errors.ConflictError:
				this.errorMessage = "That email is already in use";
				break;
			case error instanceof HTTP.Errors.ForbiddenError:
				this.errorMessage = "Denied Access";
				break;
			case error instanceof HTTP.Errors.UnauthorizedError:
				this.errorMessage = "Wrong credentials";
				break;
			case error instanceof HTTP.Errors.BadGatewayError:
				this.errorMessage = "An error occurred while trying to login. Please try again later. Error: " + error.response.status;
				break;
			case error instanceof HTTP.Errors.GatewayTimeoutError:
				this.errorMessage = "An error occurred while trying to login. Please try again later. Error: " + error.response.status;
				break;
			case error instanceof HTTP.Errors.InternalServerErrorError:
				this.errorMessage = "An error occurred while trying to login. Please try again later. Error: " + error.response.status;
				break;
			case error instanceof HTTP.Errors.UnknownError:
				this.errorMessage = "An error occurred while trying to login. Please try again later. Error: " + error.response.status;
				break;
			case error instanceof HTTP.Errors.ServiceUnavailableError:
				this.errorMessage = "Service currently unavailable";
				break;
			default:
				if( "response" in error ) {
					this.errorMessage = "There was a problem processing the request. Error: " + error.response.status;
				} else {
					this.errorMessage = "There was a problem processing the request";
					console.error( error );
				}
				break;
		}
	}
}

export default RegisterComponent;
