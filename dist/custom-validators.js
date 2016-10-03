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
System.register(["@angular/core", "@angular/forms"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, forms_1;
    var EmailValidator, PasswordValidator, SlugValidator, MatchValidator, DomainValidator, URIValidator, ExistingBackupValidator, BackupFileValidator, OneControlValidValidator;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            }],
        execute: function() {
            EmailValidator = (function () {
                function EmailValidator() {
                }
                EmailValidator.prototype.validate = function (control) {
                    // RFC 2822 compliant regex
                    if (control.value) {
                        if (control.value.match(/[a-z0-9!#$%&"*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&"*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
                            return null;
                        }
                        else {
                            return { "invalidEmailAddress": true };
                        }
                    }
                };
                EmailValidator = __decorate([
                    core_1.Directive({
                        selector: '[email]',
                        providers: [{ provide: forms_1.NG_VALIDATORS, useExisting: EmailValidator, multi: true }]
                    }), 
                    __metadata('design:paramtypes', [])
                ], EmailValidator);
                return EmailValidator;
            }());
            exports_1("EmailValidator", EmailValidator);
            PasswordValidator = (function () {
                function PasswordValidator() {
                }
                PasswordValidator.prototype.validate = function (control) {
                    // {6,100}           - Assert password is between 6 and 100 characters
                    // (?=.*[0-9])       - Assert a string has at least one number
                    if (control.value) {
                        if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
                            return null;
                        }
                        else {
                            return { "invalidPassword": true };
                        }
                    }
                };
                PasswordValidator = __decorate([
                    core_1.Directive({
                        selector: '[password]',
                        providers: [{ provide: forms_1.NG_VALIDATORS, useExisting: PasswordValidator, multi: true }]
                    }), 
                    __metadata('design:paramtypes', [])
                ], PasswordValidator);
                return PasswordValidator;
            }());
            exports_1("PasswordValidator", PasswordValidator);
            SlugValidator = (function () {
                function SlugValidator() {
                }
                SlugValidator.prototype.validate = function (control) {
                    if (control.value) {
                        if (control.value.match(/^[a-z0-9]+(?:-[a-z0-9]*)*(?:\/*)$/)) {
                            return null;
                        }
                        return { "invalidSlug": true };
                    }
                };
                SlugValidator = __decorate([
                    core_1.Directive({
                        selector: '[slug]',
                        providers: [{ provide: forms_1.NG_VALIDATORS, useExisting: SlugValidator, multi: true }]
                    }), 
                    __metadata('design:paramtypes', [])
                ], SlugValidator);
                return SlugValidator;
            }());
            exports_1("SlugValidator", SlugValidator);
            MatchValidator = (function () {
                function MatchValidator() {
                }
                MatchValidator.prototype.validate = function (control) {
                    // {6,100}           - Assert password is between 6 and 100 characters
                    // (?=.*[0-9])       - Assert a string has at least one number
                    //if( controlGroup.value.match( /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/ ) ) {
                    if (control.value) {
                        if (control.value === this.matchTo)
                            return null;
                        else {
                            return { "matchError": true };
                        }
                    }
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], MatchValidator.prototype, "matchTo", void 0);
                MatchValidator = __decorate([
                    core_1.Directive({
                        selector: '[match]',
                        providers: [{ provide: forms_1.NG_VALIDATORS, useExisting: MatchValidator, multi: true }]
                    }), 
                    __metadata('design:paramtypes', [])
                ], MatchValidator);
                return MatchValidator;
            }());
            exports_1("MatchValidator", MatchValidator);
            DomainValidator = (function () {
                function DomainValidator() {
                }
                DomainValidator.prototype.validate = function (control) {
                    if (control.value) {
                        if (control.value.match(/^http(s?):\/\/((\w+\.)?\w+\.\w+|((2[0-5]{2}|1[0-9]{2}|[0-9]{1,2})\.){3}(2[0-5]{2}|1[0-9]{2}|[0-9]{1,2}))(\/)?$/gm))
                            return null;
                        else {
                            return { "invalidURLAddress": true };
                        }
                    }
                };
                DomainValidator = __decorate([
                    core_1.Directive({
                        selector: '[domain]',
                        providers: [{ provide: forms_1.NG_VALIDATORS, useExisting: DomainValidator, multi: true }]
                    }), 
                    __metadata('design:paramtypes', [])
                ], DomainValidator);
                return DomainValidator;
            }());
            exports_1("DomainValidator", DomainValidator);
            URIValidator = (function () {
                function URIValidator() {
                }
                URIValidator.prototype.validate = function (control) {
                    if (control.value) {
                        if (control.value.match(/^(ftp|https?):\/\/(\w+:{0,1}\w*@)?((?![^\/]+\/(?:ftp|https?):)\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/)) {
                            return null;
                        }
                        else {
                            //if( control.touched && ! ! control.value ) {
                            return { "invalidURIAddress": true };
                        }
                    }
                    return { "emptyURIAddress": true };
                };
                URIValidator = __decorate([
                    core_1.Directive({
                        selector: '[uri]',
                        providers: [{ provide: forms_1.NG_VALIDATORS, useExisting: URIValidator, multi: true }]
                    }), 
                    __metadata('design:paramtypes', [])
                ], URIValidator);
                return URIValidator;
            }());
            exports_1("URIValidator", URIValidator);
            ExistingBackupValidator = (function () {
                function ExistingBackupValidator() {
                }
                ExistingBackupValidator.prototype.validate = function (control) {
                    if (control.value)
                        return null;
                    return { "invalidExistingBackupAddress": true };
                };
                ExistingBackupValidator = __decorate([
                    core_1.Directive({
                        selector: '[existing-backup]',
                        providers: [{ provide: forms_1.NG_VALIDATORS, useExisting: ExistingBackupValidator, multi: true }]
                    }), 
                    __metadata('design:paramtypes', [])
                ], ExistingBackupValidator);
                return ExistingBackupValidator;
            }());
            exports_1("ExistingBackupValidator", ExistingBackupValidator);
            BackupFileValidator = (function () {
                function BackupFileValidator() {
                }
                BackupFileValidator.prototype.ngOnChanges = function (changes) {
                    this.backupFileBlob = changes["backupFileBlob"].currentValue;
                    this.control.control.updateValueAndValidity(false, true);
                };
                BackupFileValidator.prototype.validate = function (control) {
                    if (!!this.backupFileBlob && this.backupFileBlob.type === "application/zip")
                        return null;
                    if (!this.backupFileBlob)
                        return { "emptyBackupFile": true };
                    return { "invalidBackupFileFormat": true };
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], BackupFileValidator.prototype, "backupFileBlob", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], BackupFileValidator.prototype, "control", void 0);
                BackupFileValidator = __decorate([
                    core_1.Directive({
                        selector: '[backup-file]',
                        providers: [{ provide: forms_1.NG_VALIDATORS, useExisting: BackupFileValidator, multi: true }]
                    }), 
                    __metadata('design:paramtypes', [])
                ], BackupFileValidator);
                return BackupFileValidator;
            }());
            exports_1("BackupFileValidator", BackupFileValidator);
            OneControlValidValidator = (function () {
                function OneControlValidValidator() {
                }
                OneControlValidValidator.prototype.validate = function (formGroup) {
                    for (var control in formGroup.controls) {
                        if (!!formGroup.controls[control].valid)
                            return null;
                    }
                    return { "invalidForm": true };
                };
                OneControlValidValidator = __decorate([
                    core_1.Directive({
                        selector: '[one-control-valid]',
                        providers: [{ provide: forms_1.NG_VALIDATORS, useExisting: OneControlValidValidator, multi: true }]
                    }), 
                    __metadata('design:paramtypes', [])
                ], OneControlValidValidator);
                return OneControlValidValidator;
            }());
            exports_1("OneControlValidValidator", OneControlValidValidator);
        }
    }
});

//# sourceMappingURL=custom-validators.js.map
