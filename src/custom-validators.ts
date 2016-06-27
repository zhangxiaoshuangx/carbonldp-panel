import {Directive} from "@angular/core";
import {AbstractControl, Validator, NG_VALIDATORS} from "@angular/forms";

@Directive( {
	selector: '[email]',
	providers: [ {provide: NG_VALIDATORS, useExisting: EmailValidator, multi: true} ]
} )
export class EmailValidator implements Validator {
	validate( control:AbstractControl ):{[key:string]:any;} {
		// RFC 2822 compliant regex
		if( control.value.match( /[a-z0-9!#$%&"*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&"*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ ) ) {
			return null;
		} else {
			return {"invalidEmailAddress": true};
		}
	}
}

@Directive( {
	selector: '[password]',
	providers: [ {provide: NG_VALIDATORS, useExisting: PasswordValidator, multi: true} ]
} )
export class PasswordValidator {
	validate( control:AbstractControl ):{[key:string]:any;} {
		// {6,100}           - Assert password is between 6 and 100 characters
		// (?=.*[0-9])       - Assert a string has at least one number
		if( control.value.match( /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/ ) ) {
			return null;
		} else {
			return {"invalidPassword": true};
		}
	}
}
