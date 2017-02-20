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
var ListsComponent = (function () {
    function ListsComponent() {
        this.modes = property_component_1.Modes;
        this.canDisplayLists = false;
        this.documentURI = "";
        this.lists = [];
        this.onAddNewList = new core_1.EventEmitter();
        this.blankNodes = [];
        this.namedFragments = [];
        this.canEdit = true;
        this.onListsChanges = new core_1.EventEmitter();
        this.onGoToBlankNode = new core_1.EventEmitter();
        this.onGoToNamedFragment = new core_1.EventEmitter();
    }
    ListsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.onAddNewList.subscribe(function () {
            _this.addNewList();
        });
        this.updateCanDisplayLists();
    };
    ListsComponent.prototype.addNewList = function () {
        var newListRow = {};
        newListRow.added = [];
        newListRow.isBeingCreated = true;
        this.lists.splice(0, 0, newListRow);
        this.saveList(null, null, 0);
    };
    ListsComponent.prototype.saveList = function (modifiedList, originalList, index) {
        if (typeof this.lists[index].added !== "undefined")
            delete this.lists[index].isBeingCreated;
        this.onListsChanges.emit(this.lists);
        this.updateCanDisplayLists();
    };
    ListsComponent.prototype.deleteList = function (deletingList, index) {
        if (typeof deletingList.added !== "undefined")
            this.lists.splice(index, 1);
        this.onListsChanges.emit(this.lists);
        this.updateCanDisplayLists();
    };
    ListsComponent.prototype.updateCanDisplayLists = function () {
        this.canDisplayLists = this.getUntouchedLists().length > 0 || this.getAddedLists().length > 0 || this.getModifiedLists().length > 0;
    };
    ListsComponent.prototype.getAddedLists = function () {
        return this.lists.filter(function (list) { return typeof list.added !== "undefined"; });
    };
    ListsComponent.prototype.getDeletedLists = function () {
        return this.lists.filter(function (list) { return typeof list.deleted !== "undefined"; });
    };
    ListsComponent.prototype.getModifiedLists = function () {
        return this.lists.filter(function (list) { return typeof list.modified !== "undefined" && typeof list.deleted === "undefined"; });
    };
    ListsComponent.prototype.getUntouchedLists = function () {
        return this.lists.filter(function (list) { return typeof list.modified === "undefined" && typeof list.deleted === "undefined"; });
    };
    ListsComponent.prototype.goToBlankNode = function (id) {
        this.onGoToBlankNode.emit(id);
    };
    ListsComponent.prototype.goToNamedFragment = function (id) {
        this.onGoToNamedFragment.emit(id);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ListsComponent.prototype, "documentURI", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ListsComponent.prototype, "lists", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ListsComponent.prototype, "onAddNewList", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ListsComponent.prototype, "blankNodes", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ListsComponent.prototype, "namedFragments", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ListsComponent.prototype, "canEdit", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ListsComponent.prototype, "onListsChanges", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ListsComponent.prototype, "onGoToBlankNode", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ListsComponent.prototype, "onGoToNamedFragment", void 0);
    ListsComponent = __decorate([
        core_1.Component({
            selector: "cp-lists",
            templateUrl: "./lists.component.html",
            styleUrls: ["./lists.component.scss"],
        }), 
        __metadata('design:paramtypes', [])
    ], ListsComponent);
    return ListsComponent;
}());
exports.ListsComponent = ListsComponent;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ListsComponent;

//# sourceMappingURL=lists.component.js.map
