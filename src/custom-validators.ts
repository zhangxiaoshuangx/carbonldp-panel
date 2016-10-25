import { Directive, Input, OnChanges, SimpleChanges } from "@angular/core";
import { AbstractControl, Validator, NG_VALIDATORS } from "@angular/forms";

@Directive( {
	selector: "[cp-email]",
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
	selector: "[cp-slug]",
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
	selector: "[cp-match]",
	providers: [ { provide: NG_VALIDATORS, useExisting: MatchValidator, multi: true } ]
} )
export class MatchValidator implements Validator,OnChanges {
	@Input() matchTo;
	@Input() control;

	ngOnChanges( changes:SimpleChanges ) {
		this.control.control.updateValueAndValidity( false, true );
	}

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
	selector: "[cp-domain]",
	providers: [ { provide: NG_VALIDATORS, useExisting: DomainValidator, multi: true } ]
} )
export class DomainValidator implements Validator {

	validate( control:AbstractControl ):{[key:string]:any;} {
		if( control.value ) {
			if( control.value.match( /^((cc:|https:|http:|[/][/])([a-z]|[A-Z]|[:0-9]|[/.-]){3,})$/g ) )
				return null;
			else {
				return { "invalidURLAddress": true };
			}
		}
	}
}

@Directive( {
	selector: "[cp-uri]",
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
