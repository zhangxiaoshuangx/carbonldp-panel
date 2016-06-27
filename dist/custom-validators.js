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
    var EmailValidator, PasswordValidator;
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
                    if (control.value.match(/[a-z0-9!#$%&"*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&"*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
                        return null;
                    }
                    else {
                        return { "invalidEmailAddress": "Invalid email address" };
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
                    if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
                        return null;
                    }
                    else {
                        return { "invalidPassword": true };
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
        }
    }
});

//# sourceMappingURL=custom-validators.js.map
