System.register(["@angular/core", "./../property/property.component", "semantic-ui/semantic", "./pointers.component.html!", "./pointers.component.css!text"], function(exports_1, context_1) {
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
    var core_1, property_component_1, pointers_component_html_1, pointers_component_css_text_1;
    var PointersComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (property_component_1_1) {
                property_component_1 = property_component_1_1;
            },
            function (_1) {},
            function (pointers_component_html_1_1) {
                pointers_component_html_1 = pointers_component_html_1_1;
            },
            function (pointers_component_css_text_1_1) {
                pointers_component_css_text_1 = pointers_component_css_text_1_1;
            }],
        execute: function() {
            PointersComponent = (function () {
                function PointersComponent() {
                    this.modes = property_component_1.Modes;
                    this.tokens = ["@id", "@type"];
                    this.tempPointers = [];
                    this.isEditingPointer = false;
                    this.documentURI = "";
                    this.pointers = [];
                    this.onAddNewPointer = new core_1.EventEmitter();
                    this.bNodes = [];
                    this.namedFragments = [];
                    this.canEdit = true;
                    this.onPointersChanges = new core_1.EventEmitter();
                    this.onGoToBNode = new core_1.EventEmitter();
                    this.onGoToNamedFragment = new core_1.EventEmitter();
                }
                PointersComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.onAddNewPointer.subscribe(function () {
                        _this.addNewPointer();
                    });
                };
                PointersComponent.prototype.addNewPointer = function () {
                    var newPointerRow = {};
                    newPointerRow.added = {};
                    this.pointers.push(newPointerRow);
                };
                PointersComponent.prototype.savePointer = function (modifiedPointer, originalPointer, index) {
                    if (modifiedPointer.hasOwnProperty("@id")) {
                        this.pointers[index].modified = modifiedPointer;
                    }
                    this.onPointersChanges.emit(this.pointers);
                };
                PointersComponent.prototype.saveNewPointer = function (newPointer, originalPointer, index) {
                    if (newPointer.hasOwnProperty("@id")) {
                        this.pointers[index].added = newPointer;
                    }
                    this.onPointersChanges.emit(this.pointers);
                };
                PointersComponent.prototype.deletePointer = function (deletingPointer, index) {
                    this.onPointersChanges.emit(this.pointers);
                };
                PointersComponent.prototype.deleteNewPointer = function (deletingPointer, index) {
                    this.pointers.splice(index, 1);
                    this.onPointersChanges.emit(this.pointers);
                };
                PointersComponent.prototype.canDisplayPointers = function () {
                    return this.getUntouchedPointers().length > 0 || this.getAddedPointers().length > 0 || this.getModifiedPointers().length > 0;
                };
                PointersComponent.prototype.getAddedPointers = function () {
                    return this.pointers.filter(function (pointer) { return typeof pointer.added !== "undefined"; });
                };
                PointersComponent.prototype.getModifiedPointers = function () {
                    return this.pointers.filter(function (pointer) { return typeof pointer.modified !== "undefined"; });
                };
                PointersComponent.prototype.getDeletedPointers = function () {
                    return this.pointers.filter(function (pointer) { return typeof pointer.deleted !== "undefined"; });
                };
                PointersComponent.prototype.getUntouchedPointers = function () {
                    return this.pointers.filter(function (pointer) { return typeof pointer.modified === "undefined" && typeof pointer.deleted === "undefined"; });
                };
                PointersComponent.prototype.goToBNode = function (id) {
                    this.onGoToBNode.emit(id);
                };
                PointersComponent.prototype.goToNamedFragment = function (id) {
                    this.onGoToNamedFragment.emit(id);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], PointersComponent.prototype, "documentURI", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], PointersComponent.prototype, "pointers", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], PointersComponent.prototype, "onAddNewPointer", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], PointersComponent.prototype, "bNodes", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], PointersComponent.prototype, "namedFragments", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], PointersComponent.prototype, "canEdit", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], PointersComponent.prototype, "onPointersChanges", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], PointersComponent.prototype, "onGoToBNode", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], PointersComponent.prototype, "onGoToNamedFragment", void 0);
                PointersComponent = __decorate([
                    core_1.Component({
                        selector: "cp-pointers",
                        template: pointers_component_html_1.default,
                        styles: [pointers_component_css_text_1.default],
                    }), 
                    __metadata('design:paramtypes', [])
                ], PointersComponent);
                return PointersComponent;
            }());
            exports_1("PointersComponent", PointersComponent);
            exports_1("default",PointersComponent);
        }
    }
});

//# sourceMappingURL=pointers.component.js.map
