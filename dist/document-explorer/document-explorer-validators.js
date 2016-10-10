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
    var PropertyNameValidator, IdValidator, LiteralValueValidator, PointerValidator;
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
            PropertyNameValidator = (function () {
                function PropertyNameValidator() {
                    this.url = new RegExp("(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})", "g");
                }
                PropertyNameValidator.prototype.ngOnChanges = function (changes) {
                    this.control.control.updateValueAndValidity(false, true);
                };
                PropertyNameValidator.prototype.validate = function (control) {
                    if (!!control) {
                        if (typeof control.value === "undefined" || control.value === null || !control.value)
                            return null;
                        if (this.existingProperties.indexOf(control.value) !== -1 && (this.property.added ? this.id !== control.value : this.originalName !== control.value))
                            return { "duplicatedPropertyName": true };
                        if (!this.url.test(control.value))
                            return { "invalidName": true };
                        if (control.value.split("#").length > 2)
                            return { "duplicatedHashtag": true };
                    }
                    return null;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], PropertyNameValidator.prototype, "existingProperties", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], PropertyNameValidator.prototype, "property", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], PropertyNameValidator.prototype, "id", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], PropertyNameValidator.prototype, "originalName", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], PropertyNameValidator.prototype, "control", void 0);
                PropertyNameValidator = __decorate([
                    core_1.Directive({
                        selector: "[property-name]",
                        providers: [{ provide: forms_1.NG_VALIDATORS, useExisting: PropertyNameValidator, multi: true }]
                    }), 
                    __metadata('design:paramtypes', [])
                ], PropertyNameValidator);
                return PropertyNameValidator;
            }());
            exports_1("PropertyNameValidator", PropertyNameValidator);
            IdValidator = (function () {
                function IdValidator() {
                    this.url = new RegExp("(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})", "g");
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
                        if (!this.url.test(control.value))
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
                        selector: "[id-validator]",
                        providers: [{ provide: forms_1.NG_VALIDATORS, useExisting: IdValidator, multi: true }]
                    }), 
                    __metadata('design:paramtypes', [])
                ], IdValidator);
                return IdValidator;
            }());
            exports_1("IdValidator", IdValidator);
            // private idValidator( control:AbstractControl ):any {
            // 	if( ! ! control ) {
            // 		if( typeof control.value === "undefined" || control.value === null || ! control.value ) return null;
            // 		if( typeof control.value === "string" && ! control.value.startsWith( this.documentURI ) ) return { "invalidParent": true };
            // 		if( this.existingFragments.indexOf( control.value ) !== - 1 && (this.property.added ? this.id !== control.value : this.value !== control.value) ) return { "duplicatedNamedFragmentName": true };
            // 		let url = new RegExp( "(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})", "g" );
            // 		if( ! url.test( control.value ) ) return { "invalidValue": true };
            // 		if( control.value.split( "#" ).length > 2 ) return { "duplicatedHashtag": true };
            // 	}
            // 	return null;
            // }
            // }
            LiteralValueValidator = (function () {
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
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], LiteralValueValidator.prototype, "type", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], LiteralValueValidator.prototype, "control", void 0);
                LiteralValueValidator = __decorate([
                    core_1.Directive({
                        selector: "[literal-value]",
                        providers: [{ provide: forms_1.NG_VALIDATORS, useExisting: LiteralValueValidator, multi: true }]
                    }), 
                    __metadata('design:paramtypes', [])
                ], LiteralValueValidator);
                return LiteralValueValidator;
            }());
            exports_1("LiteralValueValidator", LiteralValueValidator);
            PointerValidator = (function () {
                function PointerValidator() {
                    this.url = new RegExp("(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})", "g");
                }
                PointerValidator.prototype.validate = function (control) {
                    if (!!control && typeof control.value === "undefined") {
                        //if( ! ! control && (typeof control.value === "undefined" || control.value.trim().length === 0) ) {
                        return { "emptyControl": true };
                    }
                    if (!!control.value) {
                        if (this.url.test(control.value)) {
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
                ], PointerValidator.prototype, "documentURI", void 0);
                PointerValidator = __decorate([
                    core_1.Directive({
                        selector: "[pointer-validator]",
                        providers: [{ provide: forms_1.NG_VALIDATORS, useExisting: PointerValidator, multi: true }]
                    }), 
                    __metadata('design:paramtypes', [])
                ], PointerValidator);
                return PointerValidator;
            }());
            exports_1("PointerValidator", PointerValidator);
        }
    }
});

//# sourceMappingURL=document-explorer-validators.js.map
