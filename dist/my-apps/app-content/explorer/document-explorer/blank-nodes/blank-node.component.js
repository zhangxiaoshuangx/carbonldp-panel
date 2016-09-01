System.register(["@angular/core", "./../property/property.component", "jquery", "semantic-ui/semantic", "./blank-node.component.html!"], function(exports_1, context_1) {
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
    var core_1, property_component_1, jquery_1, blank_node_component_html_1;
    var BlankNodeComponent, BlankNodeRecords;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (property_component_1_1) {
                property_component_1 = property_component_1_1;
            },
            function (jquery_1_1) {
                jquery_1 = jquery_1_1;
            },
            function (_1) {},
            function (blank_node_component_html_1_1) {
                blank_node_component_html_1 = blank_node_component_html_1_1;
            }],
        execute: function() {
            BlankNodeComponent = (function () {
                function BlankNodeComponent(element) {
                    this.modes = property_component_1.Modes;
                    this.nonEditableProperties = ["@id", "https://carbonldp.com/ns/v1/platform#bNodeIdentifier"];
                    this.copyOrAdded = "";
                    this.tempPropertiesNames = [];
                    this.existingPropertiesNames = [];
                    this.blankNodes = [];
                    this.namedFragments = [];
                    this.canEdit = true;
                    this.documentURI = "";
                    this.onOpenBlankNode = new core_1.EventEmitter();
                    this.onOpenNamedFragment = new core_1.EventEmitter();
                    this.onChanges = new core_1.EventEmitter();
                    this.element = element;
                }
                Object.defineProperty(BlankNodeComponent.prototype, "bNodeHasChanged", {
                    get: function () {
                        return this._bNodeHasChanged;
                    },
                    set: function (hasChanged) {
                        this._bNodeHasChanged = hasChanged;
                        delete this.blankNode.modified;
                        delete this.blankNode.records;
                        if (hasChanged) {
                            this.blankNode.records = this.records;
                            if (typeof this.blankNode.added !== "undefined")
                                this.blankNode.added = this.getRawVersion();
                            else
                                this.blankNode.modified = this.getRawVersion();
                        }
                        this.onChanges.emit(this.blankNode);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BlankNodeComponent.prototype, "blankNode", {
                    get: function () { return this._blankNode; },
                    set: function (blankNode) {
                        this._blankNode = blankNode;
                        this.rootNode = blankNode.copy;
                        if (!!blankNode.records)
                            this.records = blankNode.records;
                        this.getProperties();
                    },
                    enumerable: true,
                    configurable: true
                });
                BlankNodeComponent.prototype.ngAfterViewInit = function () {
                    this.$element = jquery_1.default(this.element.nativeElement);
                };
                BlankNodeComponent.prototype.openBlankNode = function (id) {
                    this.onOpenBlankNode.emit(id);
                };
                BlankNodeComponent.prototype.openNamedFragment = function (id) {
                    this.onOpenNamedFragment.emit(id);
                };
                BlankNodeComponent.prototype.changeProperty = function (property, index) {
                    if (typeof this.records === "undefined")
                        this.records = new BlankNodeRecords();
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
                BlankNodeComponent.prototype.deleteProperty = function (property, index) {
                    if (typeof this.records === "undefined")
                        this.records = new BlankNodeRecords();
                    if (typeof property.added !== "undefined") {
                        this.records.additions.delete(property.added.id);
                        this.properties.splice(index, 1);
                    }
                    else if (typeof property.deleted !== "undefined") {
                        this.records.deletions.set(property.deleted.id, property);
                    }
                    this.updateExistingProperties();
                };
                BlankNodeComponent.prototype.addProperty = function (property, index) {
                    if (typeof this.records === "undefined")
                        this.records = new BlankNodeRecords();
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
                BlankNodeComponent.prototype.createProperty = function (property, propertyRow) {
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
                BlankNodeComponent.prototype.canEditProperty = function (property) {
                    var copyOrAdded = !!property.added ? "added" : "copy";
                    return (this.nonEditableProperties.indexOf(property[copyOrAdded].name) === -1) && this.canEdit;
                };
                BlankNodeComponent.prototype.getProperties = function () {
                    this.updateExistingProperties();
                };
                BlankNodeComponent.prototype.updateExistingProperties = function () {
                    var _this = this;
                    this.properties = [];
                    this.existingPropertiesNames = Object.keys(this.rootNode);
                    this.sortFirstProperties(this.existingPropertiesNames, this.nonEditableProperties);
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
                    this.bNodeHasChanged = this.records.changes.size > 0 || this.records.additions.size > 0 || this.records.deletions.size > 0;
                };
                BlankNodeComponent.prototype.getRawVersion = function () {
                    var rawNode = Object.assign({}, this.blankNode.added ? this.blankNode.added : this.blankNode.copy);
                    this.records.deletions.forEach(function (property, key) {
                        delete rawNode[key];
                    });
                    this.records.changes.forEach(function (property, key) {
                        if (property.modified.id !== property.modified.name) {
                            delete rawNode[key];
                            rawNode[property.modified.name] = property.modified.value;
                        }
                        else {
                            rawNode[key] = property.modified.value;
                        }
                    });
                    this.records.additions.forEach(function (property, key) {
                        rawNode[key] = property.added.value;
                    });
                    return rawNode;
                };
                BlankNodeComponent.prototype.sortFirstProperties = function (propertiesNames, firstPropertiesToShow) {
                    var tempIdx = -1;
                    firstPropertiesToShow.forEach(function (propToShow, index) {
                        tempIdx = propertiesNames.findIndex(function (propName) { return propName === propToShow; });
                        if (tempIdx !== -1) {
                            var name_1 = propertiesNames[tempIdx];
                            propertiesNames.splice(tempIdx, 1);
                            propertiesNames.splice(index, 0, name_1);
                        }
                    });
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], BlankNodeComponent.prototype, "blankNodes", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], BlankNodeComponent.prototype, "namedFragments", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], BlankNodeComponent.prototype, "canEdit", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], BlankNodeComponent.prototype, "documentURI", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object), 
                    __metadata('design:paramtypes', [Object])
                ], BlankNodeComponent.prototype, "blankNode", null);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], BlankNodeComponent.prototype, "onOpenBlankNode", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], BlankNodeComponent.prototype, "onOpenNamedFragment", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], BlankNodeComponent.prototype, "onChanges", void 0);
                BlankNodeComponent = __decorate([
                    core_1.Component({
                        selector: "cp-blank-node",
                        template: blank_node_component_html_1.default,
                        styles: [":host { display:block; }"],
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], BlankNodeComponent);
                return BlankNodeComponent;
            }());
            exports_1("BlankNodeComponent", BlankNodeComponent);
            BlankNodeRecords = (function () {
                function BlankNodeRecords() {
                    this.changes = new Map();
                    this.deletions = new Map();
                    this.additions = new Map();
                }
                return BlankNodeRecords;
            }());
            exports_1("BlankNodeRecords", BlankNodeRecords);
            exports_1("default",BlankNodeComponent);
        }
    }
});

//# sourceMappingURL=blank-node.component.js.map
