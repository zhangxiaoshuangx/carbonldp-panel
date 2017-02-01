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
var RDFNode = require("carbonldp/RDF/Node");
var property_component_1 = require("./../property/property.component");
var jquery_1 = require("jquery");
require("semantic-ui/semantic");
var DocumentResourceComponent = (function () {
    function DocumentResourceComponent(element) {
        this.modes = property_component_1.Modes;
        this.properties = [];
        this.existingPropertiesNames = [];
        this.displayOnly = [];
        this.hiddenProperties = [];
        this.blankNodes = [];
        this.namedFragments = [];
        this.canEdit = true;
        this.documentURI = "";
        this.onOpenBlankNode = new core_1.EventEmitter();
        this.onOpenNamedFragment = new core_1.EventEmitter();
        this.onChanges = new core_1.EventEmitter();
        this.element = element;
    }
    Object.defineProperty(DocumentResourceComponent.prototype, "rootHasChanged", {
        get: function () {
            return this._rootHasChanged;
        },
        set: function (hasChanged) {
            this._rootHasChanged = hasChanged;
            this.onChanges.emit(this.records);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentResourceComponent.prototype, "rootNode", {
        get: function () {
            return this._rootNode;
        },
        set: function (value) {
            this._rootNode = value;
            this.records = new RootRecords();
            this.getProperties();
        },
        enumerable: true,
        configurable: true
    });
    DocumentResourceComponent.prototype.ngAfterViewInit = function () {
        this.$element = jquery_1.default(this.element.nativeElement);
    };
    DocumentResourceComponent.prototype.openBlankNode = function (id) {
        this.onOpenBlankNode.emit(id);
    };
    DocumentResourceComponent.prototype.openNamedFragment = function (id) {
        this.onOpenNamedFragment.emit(id);
    };
    DocumentResourceComponent.prototype.canDisplay = function (propertyName) {
        if (typeof propertyName === "undefined")
            return false;
        if (this.displayOnly.length === 0 && this.hiddenProperties.length === 0)
            return true;
        if (this.displayOnly.length > 0)
            return this.displayOnly.indexOf(propertyName) !== -1 ? true : false;
        return this.hiddenProperties.indexOf(propertyName) !== -1 ? false : true;
    };
    DocumentResourceComponent.prototype.changeProperty = function (property, index) {
        if (typeof this.records === "undefined")
            this.records = new RootRecords();
        if (typeof property.modified !== "undefined") {
            this.records.changes.set(property.modified.id, property);
        }
        else if (typeof property.added === "undefined") {
            this.records.changes.delete(property.copy.id);
        }
        if (typeof property.added !== "undefined") {
            this.records.additions.delete(property.added.id);
            property.added.id = property.added.name;
            this.records.additions.set(property.added.id, property);
        }
        this.updateExistingProperties();
    };
    DocumentResourceComponent.prototype.deleteProperty = function (property, index) {
        if (typeof this.records === "undefined")
            this.records = new RootRecords();
        if (typeof property.added !== "undefined") {
            this.records.additions.delete(property.added.id);
            this.properties.splice(index, 1);
        }
        else if (typeof property.deleted !== "undefined") {
            this.records.deletions.set(property.deleted.id, property);
        }
        this.updateExistingProperties();
    };
    DocumentResourceComponent.prototype.addProperty = function (property, index) {
        if (typeof this.records === "undefined")
            this.records = new RootRecords();
        if (typeof property.added !== "undefined") {
            if (property.added.id === property.added.name) {
                this.records.additions.set(property.added.id, property);
            }
            else {
                this.records.additions.delete(property.added.id);
                property.added.id = property.added.name;
                this.records.additions.set(property.added.name, property);
            }
        }
        this.updateExistingProperties();
    };
    DocumentResourceComponent.prototype.createProperty = function (property, propertyRow) {
        var _this = this;
        var numberOfProperty = !!this.records ? (this.records.additions.size + 1) : 1;
        var newProperty = {
            added: {
                id: "",
                name: "http://www.example.com#New Property " + numberOfProperty,
                value: []
            },
            isBeingCreated: true,
            isBeingModified: false,
            isBeingDeleted: false
        };
        this.properties.splice(2, 0, newProperty);
        // Animates created property
        setTimeout(function () {
            var createdPropertyComponent = _this.$element.find("cp-property.added-property").first();
            createdPropertyComponent.addClass("transition hidden");
            createdPropertyComponent.transition({ animation: "drop" });
        });
    };
    DocumentResourceComponent.prototype.getProperties = function () {
        this.updateExistingProperties();
    };
    DocumentResourceComponent.prototype.updateExistingProperties = function () {
        var _this = this;
        this.properties = [];
        this.existingPropertiesNames = Object.keys(this.rootNode);
        this.existingPropertiesNames.forEach(function (propName) {
            _this.properties.push({
                copy: {
                    id: propName,
                    name: propName,
                    value: _this.rootNode[propName]
                }
            });
        });
        if (!this.records)
            return;
        this.records.additions.forEach(function (value, key) {
            _this.existingPropertiesNames.push(key);
            _this.properties.splice(2, 0, value);
        });
        var idx;
        this.records.changes.forEach(function (value, key) {
            if (value.modified.id !== value.modified.name) {
                idx = _this.existingPropertiesNames.indexOf(value.modified.id);
                if (idx !== -1)
                    _this.existingPropertiesNames.splice(idx, 1, value.modified.name);
            }
            idx = _this.properties.findIndex(function (property) { return !!property.copy && property.copy.id === key; });
            if (idx !== -1)
                _this.properties.splice(idx, 1, value);
        });
        this.records.deletions.forEach(function (value, key) {
            idx = _this.existingPropertiesNames.indexOf(key);
            if (idx !== -1)
                _this.existingPropertiesNames.splice(idx, 1);
            idx = _this.properties.findIndex(function (property) { return !!property.copy && property.copy.id === key; });
            if (idx !== -1)
                _this.properties.splice(idx, 1);
        });
        this.rootHasChanged = this.records.changes.size > 0 || this.records.additions.size > 0 || this.records.deletions.size > 0;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DocumentResourceComponent.prototype, "displayOnly", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DocumentResourceComponent.prototype, "hiddenProperties", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DocumentResourceComponent.prototype, "blankNodes", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DocumentResourceComponent.prototype, "namedFragments", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DocumentResourceComponent.prototype, "canEdit", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DocumentResourceComponent.prototype, "documentURI", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], DocumentResourceComponent.prototype, "rootNode", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DocumentResourceComponent.prototype, "onOpenBlankNode", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DocumentResourceComponent.prototype, "onOpenNamedFragment", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DocumentResourceComponent.prototype, "onChanges", void 0);
    DocumentResourceComponent = __decorate([
        core_1.Component({
            selector: "cp-document-resource",
            templateUrl: "./document-resource.component.html",
            styles: [":host { display:block; }"],
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], DocumentResourceComponent);
    return DocumentResourceComponent;
}());
exports.DocumentResourceComponent = DocumentResourceComponent;
var RootRecords = (function () {
    function RootRecords() {
        this.changes = new Map();
        this.deletions = new Map();
        this.additions = new Map();
    }
    return RootRecords;
}());
exports.RootRecords = RootRecords;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DocumentResourceComponent;

//# sourceMappingURL=document-resource.component.js.map
