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
var core_1 = require("@angular/core");
var property_component_1 = require("./../property/property.component");
require("semantic-ui/semantic");
var LiteralsComponent = (function () {
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
    return LiteralsComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], LiteralsComponent.prototype, "literals", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", core_1.EventEmitter)
], LiteralsComponent.prototype, "onAddNewLiteral", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], LiteralsComponent.prototype, "canEdit", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], LiteralsComponent.prototype, "onLiteralsChanges", void 0);
LiteralsComponent = __decorate([
    core_1.Component({
        selector: "cp-literals",
        templateUrl: "./literals.component.html",
        styleUrls: ["./literals.component.scss"],
    }),
    __metadata("design:paramtypes", [])
], LiteralsComponent);
exports.LiteralsComponent = LiteralsComponent;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LiteralsComponent;

//# sourceMappingURL=literals.component.js.map
