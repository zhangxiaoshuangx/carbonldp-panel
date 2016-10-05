System.register(["carbonldp/NS", "carbonldp/Utils", "carbonldp/RDF/Literal", "carbonldp/RDF/URI", "@angular/core", "@angular/forms"], function(exports_1, context_1) {
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
    var NS, Utils, SDKLiteral, URI, core_1, forms_1;
    var EmailValidator, PasswordValidator, SlugValidator, MatchValidator, DomainValidator, URIValidator, ExistingBackupValidator, BackupFileValidator, OneControlValidValidator, NameExplorerValidator, IdValidator, ValueValidator, IdPointerValidator;
    return {
        setters:[
            function (NS_1) {
                NS = NS_1;
            },
            function (Utils_1) {
                Utils = Utils_1;
            },
            function (SDKLiteral_1) {
                SDKLiteral = SDKLiteral_1;
            },
            function (URI_1) {
                URI = URI_1;
            },
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
                MatchValidator.prototype.ngOnChanges = function (changes) {
                    this.control.control.updateValueAndValidity(false, true);
                };
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
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], MatchValidator.prototype, "control", void 0);
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
            NameExplorerValidator = (function () {
                function NameExplorerValidator() {
                }
                NameExplorerValidator.prototype.ngOnChanges = function (changes) {
                    this.control.control.updateValueAndValidity(false, true);
                };
                NameExplorerValidator.prototype.validate = function (control) {
                    if (!!control) {
                        if (typeof control.value === "undefined" || control.value === null || !control.value)
                            return null;
                        if (this.existingProperties.indexOf(control.value) !== -1 && (this.property.added ? this.id !== control.value : this.name !== control.value))
                            return { "duplicatedPropertyName": true };
                        var url = new RegExp("(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})", "g");
                        if (!url.test(control.value))
                            return { "invalidName": true };
                        if (control.value.split("#").length > 2)
                            return { "duplicatedHashtag": true };
                    }
                    return null;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], NameExplorerValidator.prototype, "existingProperties", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], NameExplorerValidator.prototype, "property", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], NameExplorerValidator.prototype, "id", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], NameExplorerValidator.prototype, "name", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], NameExplorerValidator.prototype, "control", void 0);
                NameExplorerValidator = __decorate([
                    core_1.Directive({
                        selector: '[name-explorer-validator]',
                        providers: [{ provide: forms_1.NG_VALIDATORS, useExisting: NameExplorerValidator, multi: true }]
                    }), 
                    __metadata('design:paramtypes', [])
                ], NameExplorerValidator);
                return NameExplorerValidator;
            }());
            exports_1("NameExplorerValidator", NameExplorerValidator);
            IdValidator = (function () {
                function IdValidator() {
                }
                IdValidator.prototype.ngOnChanges = function (changes) {
                    // if(changes["value"].currentValue) this.control.control.setValue( this.value );
                    this.control.control.updateValueAndValidity(false, true);
                };
                IdValidator.prototype.validate = function (control) {
                    if (!!control) {
                        if (typeof control.value === "undefined" || control.value === null || !control.value)
                            return null;
                        if (typeof control.value === "string" && !control.value.startsWith(this.documentURI))
                            return { "invalidParent": true };
                        if (this.existingFragments.indexOf(control.value) !== -1 && (this.property.added ? this.id !== control.value : true))
                            return { "duplicatedNamedFragmentName": true };
                        var url = new RegExp("(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})", "g");
                        if (!url.test(control.value))
                            return { "invalidValue": true };
                        if (control.value.split("#").length > 2)
                            return { "duplicatedHashtag": true };
                    }
                    return null;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], IdValidator.prototype, "existingFragments", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], IdValidator.prototype, "property", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], IdValidator.prototype, "documentURI", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], IdValidator.prototype, "id", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], IdValidator.prototype, "control", void 0);
                IdValidator = __decorate([
                    core_1.Directive({
                        selector: '[id-validator]',
                        providers: [{ provide: forms_1.NG_VALIDATORS, useExisting: IdValidator, multi: true }]
                    }), 
                    __metadata('design:paramtypes', [])
                ], IdValidator);
                return IdValidator;
            }());
            exports_1("IdValidator", IdValidator);
            ValueValidator = (function () {
                function ValueValidator() {
                }
                ValueValidator.prototype.ngOnChanges = function (changes) {
                    this.control.control.updateValueAndValidity(false, true);
                };
                ValueValidator.prototype.validate = function (control) {
                    var valid;
                    switch (this.type) {
                        // Boolean
                        case NS.XSD.DataType.boolean:
                            switch (control.value) {
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
                        case NS.XSD.DataType.int:
                        case NS.XSD.DataType.integer:
                            valid = !isNaN(control.value) && !isNaN(SDKLiteral.Factory.parse(control.value, this.type)) && Utils.isInteger(SDKLiteral.Factory.parse(control.value, this.type));
                            break;
                        case NS.XSD.DataType.byte:
                        case NS.XSD.DataType.decimal:
                        case NS.XSD.DataType.long:
                        case NS.XSD.DataType.negativeInteger:
                        case NS.XSD.DataType.nonNegativeInteger:
                        case NS.XSD.DataType.nonPositiveInteger:
                        case NS.XSD.DataType.positiveInteger:
                        case NS.XSD.DataType.short:
                        case NS.XSD.DataType.unsignedLong:
                        case NS.XSD.DataType.unsignedInt:
                        case NS.XSD.DataType.unsignedShort:
                        case NS.XSD.DataType.unsignedByte:
                        case NS.XSD.DataType.double:
                        case NS.XSD.DataType.float:
                            valid = !isNaN(control.value) && !isNaN(SDKLiteral.Factory.parse(control.value, this.type)) && Utils.isNumber(SDKLiteral.Factory.parse(control.value, this.type));
                            break;
                        // Dates
                        case NS.XSD.DataType.date:
                        case NS.XSD.DataType.dateTime:
                        case NS.XSD.DataType.time:
                            valid = Utils.isDate(SDKLiteral.Factory.parse(control.value, this.type));
                            break;
                        case NS.XSD.DataType.string:
                            valid = Utils.isString(SDKLiteral.Factory.parse(control.value, this.type));
                            break;
                        default:
                            valid = Utils.isString(control.value);
                            break;
                    }
                    if (!valid) {
                        return { "invalidTypeError": true };
                    }
                    return null;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], ValueValidator.prototype, "type", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], ValueValidator.prototype, "control", void 0);
                ValueValidator = __decorate([
                    core_1.Directive({
                        selector: '[value-validator]',
                        providers: [{ provide: forms_1.NG_VALIDATORS, useExisting: ValueValidator, multi: true }]
                    }), 
                    __metadata('design:paramtypes', [])
                ], ValueValidator);
                return ValueValidator;
            }());
            exports_1("ValueValidator", ValueValidator);
            IdPointerValidator = (function () {
                function IdPointerValidator() {
                }
                IdPointerValidator.prototype.validate = function (control) {
                    if (!!control && typeof control.value === "undefined") {
                        //if( ! ! control && (typeof control.value === "undefined" || control.value.trim().length === 0) ) {
                        return { "emptyControl": true };
                    }
                    if (!!control.value) {
                        if (!control.value.match("(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})", "g")) {
                            if (!URI.Util.isBNodeID(control.value)) {
                                return { "invalidId": true };
                            }
                        }
                        else {
                            if (typeof control.value === "string" && !control.value.startsWith(this.documentURI))
                                return { "invalidParent": true };
                            if (control.value.split("#").length > 2)
                                return { "duplicatedHashtag": true };
                        }
                    }
                    return null;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], IdPointerValidator.prototype, "documentURI", void 0);
                IdPointerValidator = __decorate([
                    core_1.Directive({
                        selector: '[id-pointer-validator]',
                        providers: [{ provide: forms_1.NG_VALIDATORS, useExisting: IdPointerValidator, multi: true }]
                    }), 
                    __metadata('design:paramtypes', [])
                ], IdPointerValidator);
                return IdPointerValidator;
            }());
            exports_1("IdPointerValidator", IdPointerValidator);
        }
    }
});

//# sourceMappingURL=custom-validators.js.map
