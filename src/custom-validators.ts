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
import * as NS from "carbonldp/NS";
import * as Utils from "carbonldp/Utils";
import * as SDKLiteral from "carbonldp/RDF/Literal";
import * as URI from "carbonldp/RDF/URI";

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

// @Directive( {
// 	selector: '[password]',
// 	providers: [ { provide: NG_VALIDATORS, useExisting: PasswordValidator, multi: true } ]
// } )
// export class PasswordValidator implements Validator {
// 	validate( control:AbstractControl ):{[key:string]:any;} {
// 		// {6,100}           - Assert password is between 6 and 100 characters
// 		// (?=.*[0-9])       - Assert a string has at least one number
// 		if( control.value ) {
// 			if( control.value.match( /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/ ) ) {
// 				return null;
// 			} else {
// 				return { "invalidPassword": true };
// 			}
// 		}
// 	}
// }


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

// @Directive( {
// 	selector: '[existing-backup]',
// 	providers: [ { provide: NG_VALIDATORS, useExisting: ExistingBackupValidator, multi: true } ]
// } )
// export class ExistingBackupValidator implements Validator {
//
// 	validate( control:AbstractControl ):{[key:string]:any;} {
// 		if( control.value ) return null;
// 		return { "invalidExistingBackupAddress": true };
// 	}
// }
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

@Directive( {
	selector: '[name-explorer-validator]',
	providers: [ { provide: NG_VALIDATORS, useExisting: NameExplorerValidator, multi: true } ]
} )
export class NameExplorerValidator implements Validator, OnChanges {
	@Input() existingProperties;
	@Input() property;
	@Input() id;
	@Input() name;
	@Input() control;

	ngOnChanges( changes:SimpleChanges ) {
		this.control.control.updateValueAndValidity( false, true );
	}

	validate( control:AbstractControl ):{[key:string]:any;} {

		if( ! ! control ) {
			if( typeof control.value === "undefined" || control.value === null || ! control.value ) return null;
			if( this.existingProperties.indexOf( control.value ) !== - 1 && (this.property.added ? this.id !== control.value : this.name !== control.value) ) return { "duplicatedPropertyName": true };
			let url = new RegExp( "(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})", "g" );
			if( ! url.test( control.value ) ) return { "invalidName": true };
			if( control.value.split( "#" ).length > 2 ) return { "duplicatedHashtag": true };
		}
		return null;
	}
}

@Directive( {
	selector: '[id-validator]',
	providers: [ { provide: NG_VALIDATORS, useExisting: IdValidator, multi: true } ]
} )
export class IdValidator implements Validator, OnChanges {
	@Input() existingFragments;
	@Input() property;
	@Input() documentURI;
	@Input() id;
	@Input() control;

	ngOnChanges( changes:SimpleChanges ) {
		// if(changes["value"].currentValue) this.control.control.setValue( this.value );
		this.control.control.updateValueAndValidity( false, true );
	}

	validate( control:AbstractControl ):{[key:string]:any;} {

		if( ! ! control ) {
			if( typeof control.value === "undefined" || control.value === null || ! control.value ) return null;
			if( typeof control.value === "string" && ! control.value.startsWith( this.documentURI ) ) return { "invalidParent": true };
			if( this.existingFragments.indexOf( control.value ) !== - 1 && (this.property.added ? this.id !== control.value : true) ) return { "duplicatedNamedFragmentName": true };
			let url = new RegExp( "(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})", "g" );
			if( ! url.test( control.value ) ) return { "invalidValue": true };
			if( control.value.split( "#" ).length > 2 ) return { "duplicatedHashtag": true };
		}
		return null;
	}
}

@Directive( {
	selector: '[value-validator]',
	providers: [ { provide: NG_VALIDATORS, useExisting: ValueValidator, multi: true } ]
} )

export class ValueValidator implements Validator, OnChanges {
	@Input() type;
	@Input() control;

	ngOnChanges( changes:SimpleChanges ) {
		this.control.control.updateValueAndValidity( false, true );
	}

	validate( control:AbstractControl ):{[key:string]:any;} {
		let valid:boolean;
		switch ( this.type ) {
			// Boolean
			case NS.XSD.DataType.boolean:
				switch ( control.value ) {
					case "true":
					case "yes":
					case "y":
					case "1":
					case "false":
					case "no":
					case "n":
					case "0":
						valid = true;
				}
				break;

			// Numbers
			case NS.XSD.DataType.int :
			case NS.XSD.DataType.integer :
				valid = ! isNaN( control.value ) && ! isNaN( SDKLiteral.Factory.parse( control.value, this.type ) ) && Utils.isInteger( SDKLiteral.Factory.parse( control.value, this.type ) );
				break;

			case NS.XSD.DataType.byte :
			case NS.XSD.DataType.decimal :
			case NS.XSD.DataType.long :
			case NS.XSD.DataType.negativeInteger :
			case NS.XSD.DataType.nonNegativeInteger :
			case NS.XSD.DataType.nonPositiveInteger :
			case NS.XSD.DataType.positiveInteger :
			case NS.XSD.DataType.short :
			case NS.XSD.DataType.unsignedLong :
			case NS.XSD.DataType.unsignedInt :
			case NS.XSD.DataType.unsignedShort :
			case NS.XSD.DataType.unsignedByte :
			case NS.XSD.DataType.double :
			case NS.XSD.DataType.float :
				valid = ! isNaN( control.value ) && ! isNaN( SDKLiteral.Factory.parse( control.value, this.type ) ) && Utils.isNumber( SDKLiteral.Factory.parse( control.value, this.type ) );
				break;

			// Dates
			case NS.XSD.DataType.date:
			case NS.XSD.DataType.dateTime:
			case NS.XSD.DataType.time:
				valid = Utils.isDate( SDKLiteral.Factory.parse( control.value, this.type ) );
				break;

			case NS.XSD.DataType.string:
				valid = Utils.isString( SDKLiteral.Factory.parse( control.value, this.type ) );
				break;

			default:
				valid = Utils.isString( control.value );
				break;
		}
		if( ! valid ) {
			return { "invalidTypeError": true };
		}
		return null;

	}
}


@Directive( {
	selector: '[id-pointer-validator]',
	providers: [ { provide: NG_VALIDATORS, useExisting: IdPointerValidator, multi: true } ]
} )
export class IdPointerValidator implements Validator {
	@Input() documentURI;

	validate( control:AbstractControl ):{[key:string]:any;} {
		if( ! ! control && typeof control.value === "undefined" ) {
			//if( ! ! control && (typeof control.value === "undefined" || control.value.trim().length === 0) ) {
			return { "emptyControl": true };
		}
		if( ! ! control.value ) {
			if( ! control.value.match( "(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})", "g") ){
						if( ! URI.Util.isBNodeID( control.value ) ){
							return { "invalidId": true };
						}
					}
			else{
				if( typeof control.value === "string" && ! control.value.startsWith( this.documentURI ) ) return { "invalidParent": true };
				if( control.value.split( "#" ).length > 2 ) return { "duplicatedHashtag": true };
			}
		}
		return null;

	}
}