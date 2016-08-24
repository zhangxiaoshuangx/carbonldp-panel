System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var EmailValidator, PasswordValidator, SameAsValidator;
    return {
        setters:[],
        execute: function() {
            exports_1("EmailValidator", EmailValidator = function EmailValidator(control) {
                // RFC 2822 compliant regex
                if (control.value.match(/[a-z0-9!#$%&"*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&"*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
                    return null;
                }
                else {
                    return { "invalidEmailAddress": true };
                }
            });
            exports_1("PasswordValidator", PasswordValidator = function PasswordValidator(control) {
                // {6,100}           - Assert password is between 6 and 100 characters
                // (?=.*[0-9])       - Assert a string has at least one number
                if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
                    return null;
                }
                else {
                    return { "invalidPassword": true };
                }
            });
            exports_1("SameAsValidator", SameAsValidator = function SameAsValidator(controlToCompare) {
                return function SameAsValidator(control) {
                    if (controlToCompare.value !== control.value)
                        return { "notTheSame": true };
                    else
                        return null;
                };
            });
        }
    }
});
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

//# sourceMappingURL=custom-validators.js.map
