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
var URI = require("carbonldp/RDF/URI");
var property_component_1 = require("./../property/property.component");
var $ = require("jquery");
require("semantic-ui/semantic");
var PointerComponent = (function () {
    function PointerComponent(element) {
        this.tempPointer = {};
        this.isBNode = false;
        this.isNamedFragment = false;
        this.existsOnPointers = false;
        this._mode = property_component_1.Modes.READ;
        this.modes = property_component_1.Modes;
        // Inputs and Outputs
        this._pointer = {};
        this.documentURI = "";
        this.bNodes = [];
        this.namedFragments = [];
        this.canEdit = true;
        this.partOfList = false;
        this.isFirstItem = false;
        this.isLastItem = false;
        this.onEditMode = new core_1.EventEmitter();
        this.onSave = new core_1.EventEmitter();
        this.onDeletePointer = new core_1.EventEmitter();
        this.onGoToBNode = new core_1.EventEmitter();
        this.onGoToNamedFragment = new core_1.EventEmitter();
        this.onMoveUp = new core_1.EventEmitter();
        this.onMoveDown = new core_1.EventEmitter();
        // Literal Value;
        this._id = "";
        this.element = element;
    }
    Object.defineProperty(PointerComponent.prototype, "mode", {
        get: function () {
            return this._mode;
        },
        set: function (value) {
            this._mode = value;
            this.onEditMode.emit(this.mode === property_component_1.Modes.EDIT);
            if (this.mode === property_component_1.Modes.EDIT) {
                this.initializePointersDropdown();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PointerComponent.prototype, "pointer", {
        get: function () { return this._pointer; },
        set: function (value) {
            this._pointer = value;
            if (this.pointer.isBeingCreated)
                this.mode = property_component_1.Modes.EDIT;
            if (typeof this.pointer.modified !== "undefined") {
                this.id = !!this.tempPointer["@id"] ? this.tempPointer["@id"] : this.pointer.modified["@id"];
            }
            else if (typeof this.pointer.copy !== "undefined") {
                this.id = !!this.tempPointer["@id"] ? this.tempPointer["@id"] : this.pointer.copy["@id"];
            }
            else if (typeof this.pointer.added !== "undefined") {
                this.id = !!this.tempPointer["@id"] ? this.tempPointer["@id"] : this.pointer.added["@id"];
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PointerComponent.prototype, "id", {
        get: function () { return this._id; },
        set: function (id) {
            this._id = id;
            this.checkForChangesOnPointers();
        },
        enumerable: true,
        configurable: true
    });
    PointerComponent.prototype.onEdit = function (event) {
        this.mode = property_component_1.Modes.EDIT;
    };
    PointerComponent.prototype.deletePointer = function () {
        if (typeof this.pointer.added === "undefined") {
            this.pointer.deleted = this.pointer.copy;
        }
        this.onDeletePointer.emit(this.pointer);
    };
    PointerComponent.prototype.ngOnChanges = function (changes) {
        if ((!!changes["bNodes"] && changes["bNodes"].currentValue !== changes["bNodes"].previousValue) ||
            (!!changes["namedFragments"] && changes["namedFragments"].currentValue !== changes["namedFragments"].previousValue)) {
            this.checkForChangesOnPointers();
        }
    };
    PointerComponent.prototype.checkForChangesOnPointers = function () {
        var _this = this;
        if (typeof this.id === "undefined")
            return;
        var idx = this.bNodes.concat(this.namedFragments).findIndex(function (nfOrBN) { return nfOrBN["name"] === _this.id || nfOrBN["id"] === _this.id; });
        this.isBNode = URI.Util.isBNodeID(this.id);
        this.isNamedFragment = URI.Util.isFragmentOf(this.id, this.documentURI);
        this.existsOnPointers = idx !== -1;
    };
    PointerComponent.prototype.cancelEdit = function () {
        this.mode = property_component_1.Modes.READ;
        var copyOrAdded = typeof this.pointer.copy !== "undefined" ? "copy" : "added";
        if (typeof this.tempPointer["@id"] === "undefined") {
            this.id = this.pointer[copyOrAdded]["@id"];
            delete this.tempPointer["@id"];
        }
        else
            this.id = this.tempPointer["@id"];
        if (typeof this.pointer.added !== "undefined" && (typeof this.id === "undefined" || this.id.length === 0)) {
            this.onDeletePointer.emit(this.pointer);
        }
    };
    PointerComponent.prototype.save = function () {
        var copyOrAdded = typeof this.pointer.copy !== "undefined" ? "copy" : "added";
        if (typeof this.id !== "undefined" && (this.id !== this.pointer[copyOrAdded]["@id"] || this.id !== this.tempPointer["@id"])) {
            this.tempPointer["@id"] = this.id;
        }
        if ((!!this.pointer.copy) && (this.tempPointer["@id"] === this.pointer.copy["@id"])) {
            delete this.tempPointer["@id"];
            delete this.pointer.modified;
        }
        else if (!!this.pointer.added) {
            this.pointer.added = this.tempPointer;
        }
        else {
            this.pointer.modified = this.tempPointer;
        }
        this.onSave.emit(this.tempPointer);
        this.mode = property_component_1.Modes.READ;
    };
    PointerComponent.prototype.initializePointersDropdown = function () {
        this.pointersDropdown = $(this.element.nativeElement.querySelector(".fragments.search.dropdown"));
        if (!!this.pointersDropdown) {
            this.pointersDropdown.dropdown({
                allowAdditions: true,
                onChange: this.changeId.bind(this)
            });
        }
        this.pointersDropdown.dropdown("set selected", this.id);
    };
    PointerComponent.prototype.changeId = function (id, text, choice) {
        if (id === "empty")
            id = null;
        this.id = id;
    };
    PointerComponent.prototype.getFriendlyName = function (uri) {
        if (URI.Util.hasFragment(uri))
            return URI.Util.getFragment(uri);
        return URI.Util.getSlug(uri);
    };
    PointerComponent.prototype.goToBNode = function (id) {
        var idx = this.bNodes.findIndex(function (blankNode) { return blankNode.id === id; });
        this.existsOnPointers = idx !== -1;
        if (this.existsOnPointers)
            this.onGoToBNode.emit(id);
    };
    PointerComponent.prototype.goToNamedFragment = function (id) {
        var idx = this.namedFragments.findIndex(function (namedFragment) { return namedFragment.name === id; });
        this.existsOnPointers = idx !== -1;
        if (this.existsOnPointers)
            this.onGoToNamedFragment.emit(id);
    };
    PointerComponent.prototype.moveUp = function () {
        this.onMoveUp.emit(this.pointer);
    };
    PointerComponent.prototype.moveDown = function () {
        this.onMoveDown.emit(this.pointer);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], PointerComponent.prototype, "mode", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PointerComponent.prototype, "pointer", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PointerComponent.prototype, "documentURI", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], PointerComponent.prototype, "bNodes", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], PointerComponent.prototype, "namedFragments", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PointerComponent.prototype, "canEdit", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PointerComponent.prototype, "partOfList", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PointerComponent.prototype, "isFirstItem", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PointerComponent.prototype, "isLastItem", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], PointerComponent.prototype, "onEditMode", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], PointerComponent.prototype, "onSave", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], PointerComponent.prototype, "onDeletePointer", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], PointerComponent.prototype, "onGoToBNode", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], PointerComponent.prototype, "onGoToNamedFragment", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], PointerComponent.prototype, "onMoveUp", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], PointerComponent.prototype, "onMoveDown", void 0);
    PointerComponent = __decorate([
        core_1.Component({
            selector: "tr.cp-pointer",
            template: require("./pointer.component.html"),
            styles: [require("./pointer.component.css")],
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], PointerComponent);
    return PointerComponent;
}());
exports.PointerComponent = PointerComponent;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PointerComponent;

//# sourceMappingURL=pointer.component.js.map
