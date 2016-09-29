System.register(["@angular/core", "./../property/property.component", "semantic-ui/semantic", "./literals.component.html!", "./literals.component.css!text"], function(exports_1, context_1) {
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
    var core_1, property_component_1, literals_component_html_1, literals_component_css_text_1;
    var LiteralsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (property_component_1_1) {
                property_component_1 = property_component_1_1;
            },
            function (_1) {},
            function (literals_component_html_1_1) {
                literals_component_html_1 = literals_component_html_1_1;
            },
            function (literals_component_css_text_1_1) {
                literals_component_css_text_1 = literals_component_css_text_1_1;
            }],
        execute: function() {
            LiteralsComponent = (function () {
                function LiteralsComponent() {
                    this.modes = property_component_1.Modes;
                    this.tokens = ["@value", "@type", "@language"];
                    this.tempLiterals = [];
                    this.isLanguagePresent = false;
                    this.isEditingLiteral = false;
                    this.canDisplayLiterals = false;
                    this.literals = [];
                    this.onAddNewLiteral = new core_1.EventEmitter();
                    this.canEdit = true;
                    this.onLiteralsChanges = new core_1.EventEmitter();
                }
                Object.defineProperty(LiteralsComponent.prototype, "canDisplayLanguage", {
                    get: function () {
                        return this.isLanguagePresent || this.isEditingLiteral;
                    },
                    enumerable: true,
                    configurable: true
                });
                ;
                LiteralsComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.isLanguagePresent = this.existsToken("@language");
                    this.onAddNewLiteral.subscribe(function () {
                        _this.addNewLiteral();
                    });
                    this.updateCanDisplayLiterals();
                };
                LiteralsComponent.prototype.existsToken = function (token) {
                    return !!this.literals.find(function (literal) {
                        return (!!literal.added && typeof literal.added[token] !== "undefined")
                            || (!!literal.modified && typeof literal.modified[token] !== "undefined")
                            || (!!literal.copy && typeof literal.copy[token] !== "undefined");
                    });
                };
                LiteralsComponent.prototype.editModeChanged = function (value) {
                    var _this = this;
                    setTimeout(function () {
                        _this.isEditingLiteral = value;
                    }, 1);
                };
                LiteralsComponent.prototype.saveLiteral = function (modifiedLiteral, originalLiteral, index) {
                    if (typeof this.literals[index].added !== "undefined")
                        delete this.literals[index].isBeingCreated;
                    this.isLanguagePresent = this.existsToken("@language");
                    this.onLiteralsChanges.emit(this.literals);
                    this.updateCanDisplayLiterals();
                };
                LiteralsComponent.prototype.addNewLiteral = function () {
                    var newLiteralRow = {};
                    newLiteralRow.added = {};
                    newLiteralRow.isBeingCreated = true;
                    this.literals.splice(0, 0, newLiteralRow);
                    this.updateCanDisplayLiterals();
                };
                LiteralsComponent.prototype.deleteLiteral = function (deletingLiteral, index) {
                    if (typeof deletingLiteral.added !== "undefined")
                        this.literals.splice(index, 1);
                    this.onLiteralsChanges.emit(this.literals);
                    this.updateCanDisplayLiterals();
                };
                LiteralsComponent.prototype.updateCanDisplayLiterals = function () {
                    this.canDisplayLiterals = this.getUntouchedLiterals().length > 0 || this.getAddedLiterals().length > 0 || this.getModifiedLiterals().length > 0;
                };
                LiteralsComponent.prototype.getAddedLiterals = function () {
                    return this.literals.filter(function (literal) { return typeof literal.added !== "undefined"; });
                };
                LiteralsComponent.prototype.getModifiedLiterals = function () {
                    return this.literals.filter(function (literal) { return typeof literal.modified !== "undefined" && typeof literal.deleted === "undefined"; });
                };
                LiteralsComponent.prototype.getDeletedLiterals = function () {
                    return this.literals.filter(function (literal) { return typeof literal.deleted !== "undefined"; });
                };
                LiteralsComponent.prototype.getUntouchedLiterals = function () {
                    return this.literals.filter(function (literal) { return typeof literal.modified === "undefined" && typeof literal.deleted === "undefined"; });
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], LiteralsComponent.prototype, "literals", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], LiteralsComponent.prototype, "onAddNewLiteral", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], LiteralsComponent.prototype, "canEdit", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], LiteralsComponent.prototype, "onLiteralsChanges", void 0);
                LiteralsComponent = __decorate([
                    core_1.Component({
                        selector: "cp-literals",
                        template: literals_component_html_1.default,
                        styles: [literals_component_css_text_1.default],
                    }), 
                    __metadata('design:paramtypes', [])
                ], LiteralsComponent);
                return LiteralsComponent;
            }());
            exports_1("LiteralsComponent", LiteralsComponent);
            exports_1("default",LiteralsComponent);
        }
    }
});

//# sourceMappingURL=literals.component.js.map