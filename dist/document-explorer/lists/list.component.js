System.register(["@angular/core", "semantic-ui/semantic", "carbonldp/RDF/RDFNode", "carbonldp/RDF/Literal", "carbonldp/Utils", "./list.component.html!", "./list.component.css!text"], function(exports_1, context_1) {
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
    var core_1, SDKRDFNode, SDKLiteral, Utils, list_component_html_1, list_component_css_text_1;
    var ListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (_1) {},
            function (SDKRDFNode_1) {
                SDKRDFNode = SDKRDFNode_1;
            },
            function (SDKLiteral_1) {
                SDKLiteral = SDKLiteral_1;
            },
            function (Utils_1) {
                Utils = Utils_1;
            },
            function (list_component_html_1_1) {
                list_component_html_1 = list_component_html_1_1;
            },
            function (list_component_css_text_1_1) {
                list_component_css_text_1 = list_component_css_text_1_1;
            }],
        execute: function() {
            ListComponent = (function () {
                function ListComponent(element) {
                    this.tempList = [];
                    this.orderHasChanged = false;
                    this.documentURI = "";
                    this.pointers = [];
                    this.blankNodes = [];
                    this.namedFragments = [];
                    this.onSave = new core_1.EventEmitter();
                    this.onDeleteList = new core_1.EventEmitter();
                    this.onGoToBlankNode = new core_1.EventEmitter();
                    this.onGoToNamedFragment = new core_1.EventEmitter();
                    this.headers = [];
                    this.element = element;
                }
                Object.defineProperty(ListComponent.prototype, "list", {
                    get: function () { return this._list; },
                    set: function (list) {
                        var _this = this;
                        this.copyOrAddedOrModified = !!list.copy ? (!!list.modified ? "modified" : "copy") : "added";
                        this._list = list;
                        list[this.copyOrAddedOrModified].forEach(function (literalOrPointer) {
                            _this.tempList.push(Object.assign({}, literalOrPointer));
                        });
                    },
                    enumerable: true,
                    configurable: true
                });
                ListComponent.prototype.ngAfterViewInit = function () {
                    this.$element = $(this.element.nativeElement);
                    this.initializeDeletionDimmer();
                };
                ListComponent.prototype.isLiteral = function (item) {
                    return SDKLiteral.Factory.is(item[!!item.copy ? (!!item.modified ? "modified" : "copy") : "added"]);
                };
                ListComponent.prototype.isPointer = function (item) {
                    return SDKRDFNode.Factory.is(item[!!item.copy ? (!!item.modified ? "modified" : "copy") : "added"]);
                };
                ListComponent.prototype.moveUp = function (pointerOrLiteral, index) {
                    this.tempList.splice(index, 1);
                    this.tempList.splice(index - 1, 0, pointerOrLiteral);
                    if (typeof this.list.copy === "undefined")
                        return;
                    this.orderHasChanged = !this.areEquals(this.list.copy, this.tempList);
                    this.updateTempList();
                };
                ListComponent.prototype.moveDown = function (pointerOrLiteral, index) {
                    this.tempList.splice(index, 1);
                    this.tempList.splice(index + 1, 0, pointerOrLiteral);
                    if (typeof this.list.copy === "undefined")
                        return;
                    this.orderHasChanged = !this.areEquals(this.list.copy, this.tempList);
                    this.updateTempList();
                };
                ListComponent.prototype.addPointer = function () {
                    var newPointerRow = {};
                    newPointerRow.added = { "@id": "" };
                    newPointerRow.isBeingCreated = true;
                    this.tempList.splice(this.tempList.length, 0, newPointerRow);
                    this.updateTempList();
                };
                ListComponent.prototype.addLiteral = function () {
                    var newLiteralRow = {};
                    newLiteralRow.added = { "@value": "" };
                    newLiteralRow.isBeingCreated = true;
                    this.tempList.splice(this.tempList.length, 0, newLiteralRow);
                    this.updateTempList();
                };
                ListComponent.prototype.saveItem = function (modifiedPointer, originalPointer, index) {
                    if (typeof originalPointer.added !== "undefined")
                        delete originalPointer.isBeingCreated;
                    this.updateTempList();
                };
                ListComponent.prototype.deleteItem = function (deletingItem, index) {
                    if (typeof deletingItem.added !== "undefined")
                        this.tempList.splice(index, 1);
                    this.updateTempList();
                };
                ListComponent.prototype.getAddedItems = function () {
                    return this.tempList.filter(function (item) { return typeof item.added !== "undefined"; });
                };
                ListComponent.prototype.getDeletedItems = function () {
                    return this.tempList.filter(function (item) { return typeof item.deleted !== "undefined"; });
                };
                ListComponent.prototype.getModifiedItems = function () {
                    return this.tempList.filter(function (item) { return typeof item.modified !== "undefined" && typeof item.deleted === "undefined"; });
                };
                ListComponent.prototype.getUntouchedItems = function () {
                    return this.tempList.filter(function (item) { return typeof item.modified === "undefined" && typeof item.deleted === "undefined"; });
                };
                ListComponent.prototype.areEquals = function (original, modified) {
                    return Utils.O.areEqual(original, modified, { arrays: true, objects: true });
                };
                ListComponent.prototype.updateTempList = function () {
                    var hasBeenModified = this.hasBeenModified();
                    if (typeof this.list.copy !== "undefined" && hasBeenModified) {
                        this.list.modified = this.tempList;
                    }
                    else if (typeof this.list.copy !== "undefined" && !hasBeenModified) {
                        delete this.list.modified;
                    }
                    else {
                        this.list.added = this.tempList;
                    }
                    this.onSave.emit(this.list);
                };
                ListComponent.prototype.hasBeenModified = function () {
                    return this.orderHasChanged || (this.tempList.findIndex(function (item) { return typeof item.modified !== "undefined" || typeof item.added !== "undefined" || typeof item.deleted !== "undefined"; }) !== -1);
                };
                ListComponent.prototype.goToBlankNode = function (id) {
                    this.onGoToBlankNode.emit(id);
                };
                ListComponent.prototype.goToNamedFragment = function (id) {
                    this.onGoToNamedFragment.emit(id);
                };
                ListComponent.prototype.initializeDeletionDimmer = function () {
                    this.$element.find(".list.confirm-deletion.dimmer").dimmer({ closable: false });
                };
                ListComponent.prototype.askToConfirmDeletion = function () {
                    this.$element.find(".list.confirm-deletion.dimmer").dimmer("show");
                };
                ListComponent.prototype.cancelDeletion = function () {
                    this.$element.find(".list.confirm-deletion.dimmer").dimmer("hide");
                };
                ListComponent.prototype.deleteList = function () {
                    if (this.list.added)
                        this.onDeleteList.emit(this.list);
                    if (this.list.copy) {
                        this.list.deleted = this.list.copy;
                        this.updateTempList();
                    }
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], ListComponent.prototype, "list", null);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], ListComponent.prototype, "documentURI", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], ListComponent.prototype, "pointers", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], ListComponent.prototype, "blankNodes", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], ListComponent.prototype, "namedFragments", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], ListComponent.prototype, "onSave", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], ListComponent.prototype, "onDeleteList", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], ListComponent.prototype, "onGoToBlankNode", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], ListComponent.prototype, "onGoToNamedFragment", void 0);
                ListComponent = __decorate([
                    core_1.Component({
                        selector: "cp-list",
                        template: list_component_html_1.default,
                        styles: [list_component_css_text_1.default],
                        host: { "[class.modified]": "list.modified", "[class.deleted]": "list.deleted", "[class.added]": "list.added" },
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], ListComponent);
                return ListComponent;
            }());
            exports_1("ListComponent", ListComponent);
            exports_1("default",ListComponent);
        }
    }
});

//# sourceMappingURL=list.component.js.map
