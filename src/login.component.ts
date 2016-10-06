import { Component, ElementRef, Input, Output, Inject, EventEmitter } from "@angular/core";
// import { FormBuilder, ControlGroup, AbstractControl, Validators } from "@angular/common/src/forms-deprecated";

import { AuthService } from "angular2-carbonldp/services";

import Credentials from "carbonldp/Auth/Credentials";
import * as HTTP from "carbonldp/HTTP";

import { EmailValidator } from "carbonldp-panel/custom-validators";

import $ from "jquery";
import "semantic-ui/semantic";

import template from "./login.component.html!";

@Component( {
	selector: "cp-login",
	template: template,
	styles: [ ":host { display:block; } " ],
} )
export class LoginComponent {
	@Input( "container" ) container:string|JQuery;
	@Output( "onLogin" ) onLogin:EventEmitter<Credentials> = new EventEmitter<Credentials>();

	element:ElementRef;

	$element:JQuery;
	$loginForm:JQuery;

	sending:boolean = false;
	errorMessage:string = "";

	// loginForm:ControlGroup;

	login:{email:string,password:string, rememberMe:boolean} =
	{
		email: "",
		password: "",
		rememberMe: false
	}
	// email:AbstractControl; // To make available the state of the input in the template
	// password:AbstractControl; // To make available the state of the input in the template
	// rememberMe:AbstractControl;
	// remember:boolean = true;

	// private formBuilder:FormBuilder; // Validators
	private authService:AuthService.Class;

	// constructor( element:ElementRef, formBuilder:FormBuilder, @Inject( AuthService.Token ) authService:AuthService.Class ) {
	constructor( element:ElementRef, @Inject( AuthService.Token ) authService:AuthService.Class ) {
		this.element = element;
		// this.formBuilder = formBuilder;
		this.authService = authService;
	}

	ngOnInit():void {
		this.$element = $( this.element.nativeElement );
		this.$loginForm = this.$element.find( "form.loginForm" );
		this.$loginForm.find( ".ui.checkbox" ).checkbox();
		// this.loginForm = this.formBuilder.group( {
		// 	email: [ "", Validators.compose( [ Validators.required, EmailValidator ] ) ],
		// 	password: [ "", Validators.compose( [ Validators.required ] ) ],
		// 	rememberMe: [ "", Validators.compose( [] ) ],
		// } );
		// this.email = this.loginForm.controls[ "email" ];
		// this.password = this.loginForm.controls[ "password" ];
		// this.rememberMe = this.loginForm.controls[ "rememberMe" ];
	}

	onSubmit( data:{ email:string, password:string, rememberMe:boolean }, $event:any ):void {
		$event.preventDefault();
		this.sending = true;
		this.errorMessage = "";

		let username:string = data.email;
		let password:string = data.password;
		let rememberMe:boolean = ! ! data.rememberMe;

		this.authService.login( username, password, rememberMe ).then( ( credentials:Credentials ) => {
			this.sending = false;
			this.onLogin.emit( credentials );
		} ).catch( ( error:HTTP.Errors.Error ) => {
			this.sending = false;
			this.setErrorMessage( error );
		} );
	}

	getDays( firstDate:Date, lastDate:Date ):number {
		// Discard the time and time-zone information
		let utc1:number = Date.UTC( firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate() );
		let utc2:number = Date.UTC( lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate() );
		let msPerDay:number = 1000 * 60 * 60 * 24;
		return Math.floor( (utc2 - utc1) / msPerDay );
	}

	setErrorMessage( error:HTTP.Errors.Error ):void {
		switch( true ) {
			case error instanceof HTTP.Errors.ForbiddenError:
				this.errorMessage = "Denied Access.";
				break;
			case error instanceof HTTP.Errors.UnauthorizedError:
				this.errorMessage = "Wrong credentials.";
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
				this.errorMessage = "Service currently unavailable.";
				break;
			default:
				this.errorMessage = "There was a problem processing the request. Error: " + error.response.status;
				break;
		}
	}

	shakeForm():void {
		let target:JQuery = this.container ? $( this.container ) : this.$element;
		if( ! target ) return;

		target.transition( {
			animation: "shake",
		} );
	}
}

export default LoginComponent;
