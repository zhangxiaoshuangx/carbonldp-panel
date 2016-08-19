import { AbstractControl } from "@angular/common";
import { ValidatorFn } from "@angular/common/src/forms-deprecated/directives/validators";

export let EmailValidator:ValidatorFn = function EmailValidator( control:AbstractControl ):{ [key:string]:any } {
	// RFC 2822 compliant regex
	if( control.value.match( /[a-z0-9!#$%&"*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&"*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ ) ) {
		return null;
	} else {
		return { "invalidEmailAddress": true };
	}
};

export let PasswordValidator:ValidatorFn = function PasswordValidator( control:AbstractControl ):{ [key:string]:any } {
	// {6,100}           - Assert password is between 6 and 100 characters
	// (?=.*[0-9])       - Assert a string has at least one number
	if( control.value.match( /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/ ) ) {
		return null;
	} else {
		return { "invalidPassword": true };
	}
};

export let SameAsValidator:( controlToCompare:AbstractControl ) => ValidatorFn = function SameAsValidator( controlToCompare:AbstractControl ):ValidatorFn {
	return function SameAsValidator( control:AbstractControl ):{ [key:string]:any } {
		if( controlToCompare.value !== control.value ) return { "notTheSame": true };
		else return null;
	}
};

// import { Directive, Input } from "@angular/core";
// import { AbstractControl, Validator, NG_VALIDATORS } from "@angular/forms";
//
// @Directive( {
// 	selector: '[email]',
// 	providers: [ { provide: NG_VALIDATORS, useExisting: EmailValidator, multi: true } ]
// } )
// export class EmailValidator implements Validator {
// 	validate( control:AbstractControl ):{[key:string]:any;} {
// 		// RFC 2822 compliant regex
// 		if( control.value.match( /[a-z0-9!#$%&"*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&"*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ ) ) {
// 			return null;
// 		} else {
// 			return { "invalidEmailAddress": true };
// 		}
// 	}
// }
//
// @Directive( {
// 	selector: '[cpPassword]',
// 	providers: [ { provide: NG_VALIDATORS, useExisting: PasswordValidator, multi: true } ]
// } )
// export class PasswordValidator implements Validator {
// 	validate( control:AbstractControl ):{[key:string]:any;} {
// 		// {6,100}           - Assert password is between 6 and 100 characters
// 		// (?=.*[0-9])       - Assert a string has at least one number
// 		if( control.value.match( /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/ ) ) {
// 			return null;
// 		} else {
// 			return { "invalidPassword": true };
// 		}
// 	}
// }
//
//
// // FIXME
// @Directive( {
// 	selector: '[cpSameAs]',
// 	providers: [ { provide: NG_VALIDATORS, useExisting: SameAsValidator, multi: true } ]
// } )
// export class SameAsValidator implements Validator {
// 	// @Input( "sameAs" )
//
// 	validate( control:AbstractControl ):{[key:string]:any;} {
// 		// {6,100}           - Assert password is between 6 and 100 characters
// 		// (?=.*[0-9])       - Assert a string has at least one number
// 		if( control.value.match( /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/ ) ) {
// 			return null;
// 		} else {
// 			return { "invalidPassword": true };
// 		}
// 	}
// }