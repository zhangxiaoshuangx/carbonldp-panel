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
var NS = require("carbonldp/NS");
var Utils = require("carbonldp/Utils");
var SDKLiteral = require("carbonldp/RDF/Literal");
var URI = require("carbonldp/RDF/URI");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var PropertyNameValidator = PropertyNameValidator_1 = (function () {
    function PropertyNameValidator() {
        this.url = new RegExp("(\b(https?|ftp|file)://)?[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]");
    }
    PropertyNameValidator.prototype.ngOnChanges = function (changes) {
        this.control.control.updateValueAndValidity(false, true);
    };
    PropertyNameValidator.prototype.validate = function (control) {
        if (!!control) {
            if (typeof control.value === "undefined" || control.value === null || !control.value)
                return null;
            if (this.existingProperties.indexOf(encodeURI(control.value)) !== -1 && (this.property.added ? this.id !== encodeURI(control.value) : this.originalName !== encodeURI(control.value)))
                return { "duplicatedPropertyName": true };
            if (!this.url.test(control.value))
                return { "invalidName": true };
            if (control.value.split("#").length > 2)
                return { "duplicatedHashtag": true };
        }
        return null;
    };
    return PropertyNameValidator;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], PropertyNameValidator.prototype, "existingProperties", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], PropertyNameValidator.prototype, "property", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], PropertyNameValidator.prototype, "id", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], PropertyNameValidator.prototype, "originalName", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], PropertyNameValidator.prototype, "control", void 0);
PropertyNameValidator = PropertyNameValidator_1 = __decorate([
    core_1.Directive({
        selector: "[cp-property-name]",
        providers: [{ provide: forms_1.NG_VALIDATORS, useExisting: PropertyNameValidator_1, multi: true }]
    })
], PropertyNameValidator);
exports.PropertyNameValidator = PropertyNameValidator;
var IdValidator = IdValidator_1 = (function () {
    function IdValidator() {
        // url = new RegExp( "(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})", "g" );
        this.url = new RegExp("(\b(https?|ftp|file)://)?[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]");
    }
    IdValidator.prototype.ngOnChanges = function (changes) {
        this.control.control.updateValueAndValidity(false, true);
    };
    IdValidator.prototype.validate = function (control) {
        if (!!control) {
            if (typeof control.value === "undefined" || control.value === null || !control.value)
                return null;
            if (typeof control.value === "string" && !control.value.startsWith(this.documentURI))
                return { "invalidParent": true };
            if (this.existingFragments.indexOf(control.value) !== -1 && (this.property.added ? this.id !== control.value : this.originalId !== control.value))
                return { "duplicatedNamedFragmentName": true };
            if (control.value.split("#").length > 2)
                return { "duplicatedHashtag": true };
        }
        return null;
    };
    return IdValidator;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], IdValidator.prototype, "existingFragments", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], IdValidator.prototype, "property", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], IdValidator.prototype, "documentURI", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], IdValidator.prototype, "id", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], IdValidator.prototype, "originalId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], IdValidator.prototype, "control", void 0);
IdValidator = IdValidator_1 = __decorate([
    core_1.Directive({
        selector: "[cp-property-id]",
        providers: [{ provide: forms_1.NG_VALIDATORS, useExisting: IdValidator_1, multi: true }]
    })
], IdValidator);
exports.IdValidator = IdValidator;
var LiteralValueValidator = LiteralValueValidator_1 = (function () {
    function LiteralValueValidator() {
    }
    LiteralValueValidator.prototype.ngOnChanges = function (changes) {
        this.control.control.updateValueAndValidity(false, true);
    };
    LiteralValueValidator.prototype.validate = function (control) {
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
    return LiteralValueValidator;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], LiteralValueValidator.prototype, "type", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], LiteralValueValidator.prototype, "control", void 0);
LiteralValueValidator = LiteralValueValidator_1 = __decorate([
    core_1.Directive({
        selector: "[cp-literal-value]",
        providers: [{ provide: forms_1.NG_VALIDATORS, useExisting: LiteralValueValidator_1, multi: true }]
    })
], LiteralValueValidator);
exports.LiteralValueValidator = LiteralValueValidator;
var PointerValidator = PointerValidator_1 = (function () {
    function PointerValidator() {
        this.url = new RegExp("(\b(https?|ftp|file)://)?[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]");
    }
    PointerValidator.prototype.validate = function (control) {
        if (!!control && typeof control.value === "undefined") {
            return { "emptyControl": true };
        }
        if (!!control.value) {
            if (URI.Util.isBNodeID(control.value) || this.url.test(control.value))
                return null;
            return { "invalidId": true };
        }
        return null;
    };
    return PointerValidator;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], PointerValidator.prototype, "documentURI", void 0);
PointerValidator = PointerValidator_1 = __decorate([
    core_1.Directive({
        selector: "[cp-pointer-id]",
        providers: [{ provide: forms_1.NG_VALIDATORS, useExisting: PointerValidator_1, multi: true }]
    })
], PointerValidator);
exports.PointerValidator = PointerValidator;
var PropertyNameValidator_1, IdValidator_1, LiteralValueValidator_1, PointerValidator_1;
