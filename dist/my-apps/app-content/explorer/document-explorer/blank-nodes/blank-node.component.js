System.register(["@angular/core", "carbonldp/RDF/RDFNode", "./../property/property.component", "jquery", "semantic-ui/semantic", "./blank-node.component.html!"], function(exports_1, context_1) {
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
    var core_1, RDFNode, property_component_1, jquery_1, blank_node_component_html_1;
    var BlankNodeComponent, BlankNode, BlankNodeRecords;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (RDFNode_1) {
                RDFNode = RDFNode_1;
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
                    this.properties = [];
                    this.existingProperties = [];
                    this.bNodes = [];
                    this.namedFragments = [];
                    this.canEdit = true;
                    this.documentURI = "";
                    this.onOpenBNode = new core_1.EventEmitter();
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
                        this.onChanges.emit(this.records);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BlankNodeComponent.prototype, "bNode", {
                    get: function () {
                        return this._bNode;
                    },
                    set: function (value) {
                        this._bNode = value;
                        this.getProperties();
                    },
                    enumerable: true,
                    configurable: true
                });
                BlankNodeComponent.prototype.ngAfterViewInit = function () {
                    this.$element = jquery_1.default(this.element.nativeElement);
                };
                BlankNodeComponent.prototype.openBNode = function (id) {
                    this.onOpenBNode.emit(id);
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
                    else {
                        this.records.changes.delete(property.copy.id);
                    }
                    this.updateExistingProperties();
                    this.bNodeHasChanged = this.records.changes.size > 0 || this.records.additions.size > 0 || this.records.deletions.size > 0;
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
                    this.bNodeHasChanged = this.records.changes.size > 0 || this.records.additions.size > 0 || this.records.deletions.size > 0;
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
                            this.records.additions.set(property.added.name, property);
                        }
                    }
                    this.updateExistingProperties();
                    this.bNodeHasChanged = this.records.changes.size > 0 || this.records.additions.size > 0 || this.records.deletions.size > 0;
                };
                BlankNodeComponent.prototype.createProperty = function (property, propertyRow) {
                    var _this = this;
                    var newProperty = {
                        added: {
                            id: "",
                            name: "New Property",
                            value: []
                        }
                    };
                    this.properties.splice(2, 0, newProperty);
                    if (!!this.$element)
                        setTimeout(function () { return _this.$element.find("cp-property.added-property").first().transition("drop"); });
                };
                BlankNodeComponent.prototype.getProperties = function () {
                    var _this = this;
                    this.properties = [];
                    this.updateExistingProperties();
                    this.existingProperties.forEach(function (propName) {
                        _this.properties.push({
                            copy: {
                                id: propName,
                                name: propName,
                                value: _this.bNode[propName]
                            }
                        });
                    });
                };
                BlankNodeComponent.prototype.updateExistingProperties = function () {
                    var _this = this;
                    this.existingProperties = Object.keys(this.bNode);
                    if (!this.records)
                        return;
                    this.records.additions.forEach(function (value, key) {
                        _this.existingProperties.push(key);
                    });
                    this.records.changes.forEach(function (value, key) {
                        if (value.modified.id !== value.modified.name) {
                            _this.existingProperties.splice(_this.existingProperties.indexOf(value.modified.id), 1, value.modified.name);
                        }
                    });
                    this.records.deletions.forEach(function (value, key) {
                        _this.existingProperties.splice(_this.existingProperties.indexOf(value.deleted.id), 1);
                    });
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], BlankNodeComponent.prototype, "bNodes", void 0);
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
                ], BlankNodeComponent.prototype, "bNode", null);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], BlankNodeComponent.prototype, "onOpenBNode", void 0);
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
            BlankNode = (function () {
                function BlankNode() {
                }
                return BlankNode;
            }());
            exports_1("BlankNode", BlankNode);
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
