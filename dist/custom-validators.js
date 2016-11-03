System.register(["@angular/core", "@angular/forms", "carbonldp/RDF/URI"], function(exports_1, context_1) {
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
    var core_1, forms_1, URI;
    var EmailValidator, SlugValidator, MatchValidator, DomainValidator, URIValidator, URIFragmentValidator;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (URI_1) {
                URI = URI_1;
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
                        selector: "[cp-email]",
                        providers: [{ provide: forms_1.NG_VALIDATORS, useExisting: EmailValidator, multi: true }]
                    }), 
                    __metadata('design:paramtypes', [])
                ], EmailValidator);
                return EmailValidator;
            }());
            exports_1("EmailValidator", EmailValidator);
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
                        selector: "[cp-slug]",
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
                        selector: "[cp-match]",
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
                        if (control.value.match(/^((cc:|https:|http:|[/][/])([a-z]|[A-Z]|[:0-9]|[/.-]){3,})$/g))
                            return null;
                        else {
                            return { "invalidURLAddress": true };
                        }
                    }
                };
                DomainValidator = __decorate([
                    core_1.Directive({
                        selector: "[cp-domain]",
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
                        selector: "[cp-uri]",
                        providers: [{ provide: forms_1.NG_VALIDATORS, useExisting: URIValidator, multi: true }]
                    }), 
                    __metadata('design:paramtypes', [])
                ], URIValidator);
                return URIValidator;
            }());
            exports_1("URIValidator", URIValidator);
            URIFragmentValidator = (function () {
                function URIFragmentValidator() {
                }
                URIFragmentValidator.prototype.validate = function (control) {
                    if (!control.value)
                        return null;
                    if (!control.value.match(/^(ftp|https?):\/\/(\w+:{0,1}\w*@)?((?![^\/]+\/(?:ftp|https?):)\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/))
                        return { "invalidURIAddress": true };
                    if (!URI.Util.hasFragment(control.value))
                        return { "missingFragment": true };
                    if (control.value.split("#").length > 2)
                        return { "multipleFragment": true };
                    if (URI.Util.getFragment(control.value).trim().length === 0)
                        return { "missingFragment": true };
                    return null;
                };
                URIFragmentValidator = __decorate([
                    core_1.Directive({
                        selector: "[cp-uri-fragment]",
                        providers: [{ provide: forms_1.NG_VALIDATORS, useExisting: URIFragmentValidator, multi: true }]
                    }), 
                    __metadata('design:paramtypes', [])
                ], URIFragmentValidator);
                return URIFragmentValidator;
            }());
            exports_1("URIFragmentValidator", URIFragmentValidator);
        }
    }
});

//# sourceMappingURL=custom-validators.js.map
