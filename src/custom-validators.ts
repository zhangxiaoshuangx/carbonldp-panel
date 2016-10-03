// import { AbstractControl } from "@angular/common";
// import { ValidatorFn } from "@angular/common/src/forms-deprecated/directives/validators";
//
// export let EmailValidator:ValidatorFn = function EmailValidator( control:AbstractControl ):{ [key:string]:any } {
// 	// RFC 2822 compliant regex
// 	if( control.value.match( /[a-z0-9!#$%&"*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&"*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ ) ) {
// 		return null;
// 	} else {
// 		return { "invalidEmailAddress": true };
// 	}
// };
//
// export let PasswordValidator:ValidatorFn = function PasswordValidator( control:AbstractControl ):{ [key:string]:any } {
// 	// {6,100}           - Assert password is between 6 and 100 characters
// 	// (?=.*[0-9])       - Assert a string has at least one number
// 	if( control.value.match( /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/ ) ) {
// 		return null;
// 	} else {
// 		return { "invalidPassword": true };
// 	}
// };
//
// export let SameAsValidator:( controlToCompare:AbstractControl ) => ValidatorFn = function SameAsValidator( controlToCompare:AbstractControl ):ValidatorFn {
// 	return function SameAsValidator( control:AbstractControl ):{ [key:string]:any } {
// 		if( controlToCompare.value !== control.value ) return { "notTheSame": true };
// 		else return null;
// 	}
// };

import { Directive, Input, OnChanges, SimpleChanges } from "@angular/core";
import { AbstractControl, Validator, NG_VALIDATORS, FormGroup } from "@angular/forms";

@Directive( {
	selector: '[email]',
	providers: [ { provide: NG_VALIDATORS, useExisting: EmailValidator, multi: true } ]
} )
export class EmailValidator implements Validator {
	validate( control:AbstractControl ):{[key:string]:any;} {
		// RFC 2822 compliant regex
		if( control.value ) {
			if( control.value.match( /[a-z0-9!#$%&"*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&"*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ ) ) {
				return null;
			} else {
				return { "invalidEmailAddress": true };
			}
		}
	}
}

@Directive( {
	selector: '[password]',
	providers: [ { provide: NG_VALIDATORS, useExisting: PasswordValidator, multi: true } ]
} )
export class PasswordValidator implements Validator {
	validate( control:AbstractControl ):{[key:string]:any;} {
		// {6,100}           - Assert password is between 6 and 100 characters
		// (?=.*[0-9])       - Assert a string has at least one number
		if( control.value ) {
			if( control.value.match( /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/ ) ) {
				return null;
			} else {
				return { "invalidPassword": true };
			}
		}
	}
}


@Directive( {
	selector: '[slug]',
	providers: [ { provide: NG_VALIDATORS, useExisting: SlugValidator, multi: true } ]
} )
export class SlugValidator implements Validator {

	validate( control:AbstractControl ):{[key:string]:any;} {
		if( control.value ) {
			if( control.value.match( /^[a-z0-9]+(?:-[a-z0-9]*)*(?:\/*)$/ ) ) {
				return null;
			}
			return { "invalidSlug": true };
		}
	}
}


@Directive( {
	selector: '[match]',
	providers: [ { provide: NG_VALIDATORS, useExisting: MatchValidator, multi: true } ]
} )
export class MatchValidator implements Validator {
	@Input() matchTo;

	validate( control:AbstractControl ):{[key:string]:any;} {
		// {6,100}           - Assert password is between 6 and 100 characters
		// (?=.*[0-9])       - Assert a string has at least one number
		//if( controlGroup.value.match( /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/ ) ) {
		if( control.value ) {
			if( control.value === this.matchTo )
				return null;
			else {
				return { "matchError": true };
			}
		}
	}
}

@Directive( {
	selector: '[domain]',
	providers: [ { provide: NG_VALIDATORS, useExisting: DomainValidator, multi: true } ]
} )
export class DomainValidator implements Validator {

	validate( control:AbstractControl ):{[key:string]:any;} {
		if( control.value ) {
			if( control.value.match( /^http(s?):\/\/((\w+\.)?\w+\.\w+|((2[0-5]{2}|1[0-9]{2}|[0-9]{1,2})\.){3}(2[0-5]{2}|1[0-9]{2}|[0-9]{1,2}))(\/)?$/gm ) )
				return null;
			else {
				return { "invalidURLAddress": true };
			}
		}
	}
}

@Directive( {
	selector: '[uri]',
	providers: [ { provide: NG_VALIDATORS, useExisting: URIValidator, multi: true } ]
} )
export class URIValidator implements Validator {

	validate( control:AbstractControl ):{[key:string]:any;} {
		if( control.value ) {
			if( control.value.match( /^(ftp|https?):\/\/(\w+:{0,1}\w*@)?((?![^\/]+\/(?:ftp|https?):)\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/ ) ) {
				return null;
			}
			else {
				//if( control.touched && ! ! control.value ) {
				return { "invalidURIAddress": true };
			}
		}
		return { "emptyURIAddress": true };
	}
}

@Directive( {
	selector: '[existing-backup]',
	providers: [ { provide: NG_VALIDATORS, useExisting: ExistingBackupValidator, multi: true } ]
} )
export class ExistingBackupValidator implements Validator {

	validate( control:AbstractControl ):{[key:string]:any;} {
		if( control.value ) return null;
		return { "invalidExistingBackupAddress": true };
	}
}
@Directive( {
	selector: '[backup-file]',
	providers: [ { provide: NG_VALIDATORS, useExisting: BackupFileValidator, multi: true } ]
} )
export class BackupFileValidator implements Validator, OnChanges {
	@Input() backupFileBlob;
	@Input() control;

	ngOnChanges( changes:SimpleChanges ) {
		this.backupFileBlob = changes[ "backupFileBlob" ].currentValue;
		this.control.control.updateValueAndValidity( false, true );
	}

	validate( control:AbstractControl ):any {
		if( ! ! this.backupFileBlob && this.backupFileBlob.type === "application/zip" ) return null;
		if( ! this.backupFileBlob ) return { "emptyBackupFile": true };
		return { "invalidBackupFileFormat": true };
	}
}

@Directive( {
	selector: '[one-control-valid]',
	providers: [ { provide: NG_VALIDATORS, useExisting: OneControlValidValidator, multi: true } ]
} )
export class OneControlValidValidator implements Validator {

	validate( formGroup:FormGroup ):{[key:string]:any;} {
		for ( let control in formGroup.controls ) {
			if( ! ! formGroup.controls[ control ].valid ) return null;
		}
		return { "invalidForm": true };
	}
}