"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var URI = require("carbonldp/RDF/URI");
var EmailValidator = EmailValidator_1 = (function () {
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
    return EmailValidator;
}());
EmailValidator = EmailValidator_1 = __decorate([
    core_1.Directive({
        selector: "[cp-email]",
        providers: [{ provide: forms_1.NG_VALIDATORS, useExisting: EmailValidator_1, multi: true }]
    })
], EmailValidator);
exports.EmailValidator = EmailValidator;
var SlugValidator = SlugValidator_1 = (function () {
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
    return SlugValidator;
}());
SlugValidator = SlugValidator_1 = __decorate([
    core_1.Directive({
        selector: "[cp-slug]",
        providers: [{ provide: forms_1.NG_VALIDATORS, useExisting: SlugValidator_1, multi: true }]
    })
], SlugValidator);
exports.SlugValidator = SlugValidator;
var MatchValidator = MatchValidator_1 = (function () {
    function MatchValidator() {
    }
    MatchValidator.prototype.ngOnChanges = function (changes) {
        this.control.control.updateValueAndValidity(false, true);
    };
    MatchValidator.prototype.validate = function (control) {
        if (control.value) {
            if (control.value === this.matchTo)
                return null;
            else {
                return { "matchError": true };
            }
        }
    };
    return MatchValidator;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], MatchValidator.prototype, "matchTo", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], MatchValidator.prototype, "control", void 0);
MatchValidator = MatchValidator_1 = __decorate([
    core_1.Directive({
        selector: "[cp-match]",
        providers: [{ provide: forms_1.NG_VALIDATORS, useExisting: MatchValidator_1, multi: true }]
    })
], MatchValidator);
exports.MatchValidator = MatchValidator;
var DomainValidator = DomainValidator_1 = (function () {
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
    return DomainValidator;
}());
DomainValidator = DomainValidator_1 = __decorate([
    core_1.Directive({
        selector: "[cp-domain]",
        providers: [{ provide: forms_1.NG_VALIDATORS, useExisting: DomainValidator_1, multi: true }]
    })
], DomainValidator);
exports.DomainValidator = DomainValidator;
var URIValidator = URIValidator_1 = (function () {
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
    return URIValidator;
}());
URIValidator = URIValidator_1 = __decorate([
    core_1.Directive({
        selector: "[cp-uri]",
        providers: [{ provide: forms_1.NG_VALIDATORS, useExisting: URIValidator_1, multi: true }]
    })
], URIValidator);
exports.URIValidator = URIValidator;
var FragmentValidator = FragmentValidator_1 = (function () {
    function FragmentValidator() {
    }
    FragmentValidator.prototype.validate = function (control) {
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
    return FragmentValidator;
}());
FragmentValidator = FragmentValidator_1 = __decorate([
    core_1.Directive({
        selector: "[cp-fragment]",
        providers: [{ provide: forms_1.NG_VALIDATORS, useExisting: FragmentValidator_1, multi: true }]
    })
], FragmentValidator);
exports.FragmentValidator = FragmentValidator;
var URIFragmentValidator = URIFragmentValidator_1 = (function () {
    function URIFragmentValidator() {
    }
    URIFragmentValidator.prototype.validate = function (control) {
        if (!control.value)
            return null;
        if (!control.value.match(/^(ftp|https?):\/\/(\w+:{0,1}\w*@)?((?![^\/]+\/(?:ftp|https?):)\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/))
            return { "invalidURIAddress": true };
        if (!URI.Util.hasFragment(control.value))
            return;
        if (control.value.split("#").length > 2)
            return { "multipleFragment": true };
        if (URI.Util.getFragment(control.value).trim().length === 0)
            return { "missingFragment": true };
        return null;
    };
    return URIFragmentValidator;
}());
URIFragmentValidator = URIFragmentValidator_1 = __decorate([
    core_1.Directive({
        selector: "[cp-uri-fragment]",
        providers: [{ provide: forms_1.NG_VALIDATORS, useExisting: URIFragmentValidator_1, multi: true }]
    })
], URIFragmentValidator);
exports.URIFragmentValidator = URIFragmentValidator;
var RequiredIfValidator = RequiredIfValidator_1 = (function () {
    function RequiredIfValidator() {
    }
    RequiredIfValidator.prototype.validate = function (control) {
        if (this.condition && !control.value)
            return { "requiredIf": true };
        return null;
    };
    return RequiredIfValidator;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], RequiredIfValidator.prototype, "condition", void 0);
RequiredIfValidator = RequiredIfValidator_1 = __decorate([
    core_1.Directive({
        selector: '[cp-required-if]',
        providers: [{ provide: forms_1.NG_VALIDATORS, useExisting: RequiredIfValidator_1, multi: true }]
    })
], RequiredIfValidator);
exports.RequiredIfValidator = RequiredIfValidator;
var EmailValidator_1, SlugValidator_1, MatchValidator_1, DomainValidator_1, URIValidator_1, FragmentValidator_1, URIFragmentValidator_1, RequiredIfValidator_1;
