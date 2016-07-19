System.register(["@angular/core", "carbonldp/RDF/RDFNode", "./../property/property.component", "jquery", "semantic-ui/semantic", "./named-fragment.component.html!"], function(exports_1, context_1) {
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
    var core_1, RDFNode, property_component_1, property_component_2, jquery_1, named_fragment_component_html_1;
    var NamedFragmentComponent, NamedFragment, NamedFragmentRecords;
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
                property_component_2 = property_component_1_1;
            },
            function (jquery_1_1) {
                jquery_1 = jquery_1_1;
            },
            function (_1) {},
            function (named_fragment_component_html_1_1) {
                named_fragment_component_html_1 = named_fragment_component_html_1_1;
            }],
        execute: function() {
            NamedFragmentComponent = (function () {
                function NamedFragmentComponent(element) {
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
                Object.defineProperty(NamedFragmentComponent.prototype, "namedFragmentChanged", {
                    get: function () {
                        return this.namedFragmentChanged;
                    },
                    set: function (hasChanged) {
                        this._namedFragmentChanged = hasChanged;
                        this.onChanges.emit(this.records);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NamedFragmentComponent.prototype, "namedFragment", {
                    get: function () {
                        return this._namedFragment;
                    },
                    set: function (value) {
                        this._namedFragment = value;
                        this.getProperties();
                    },
                    enumerable: true,
                    configurable: true
                });
                NamedFragmentComponent.prototype.ngAfterViewInit = function () {
                    this.$element = jquery_1.default(this.element.nativeElement);
                };
                NamedFragmentComponent.prototype.openBNode = function (id) {
                    this.onOpenBNode.emit(id);
                };
                NamedFragmentComponent.prototype.openNamedFragment = function (id) {
                    this.onOpenNamedFragment.emit(id);
                };
                NamedFragmentComponent.prototype.changeProperty = function (property, index) {
                    if (typeof this.records === "undefined")
                        this.records = new NamedFragmentRecords();
                    if (typeof property.modified !== "undefined") {
                        this.records.changes.set(property.modified.id, property);
                    }
                    else {
                        this.records.changes.delete(property.copy.id);
                    }
                    this.updateExistingProperties();
                    this.namedFragmentChanged = this.records.changes.size > 0 || this.records.additions.size > 0 || this.records.deletions.size > 0;
                };
                NamedFragmentComponent.prototype.deleteProperty = function (property, index) {
                    if (typeof this.records === "undefined")
                        this.records = new NamedFragmentRecords();
                    if (typeof property.added !== "undefined") {
                        this.records.additions.delete(property.added.id);
                        this.properties.splice(index, 1);
                    }
                    else if (typeof property.deleted !== "undefined") {
                        this.records.deletions.set(property.deleted.id, property);
                    }
                    this.updateExistingProperties();
                    this.namedFragmentChanged = this.records.changes.size > 0 || this.records.additions.size > 0 || this.records.deletions.size > 0;
                };
                NamedFragmentComponent.prototype.addProperty = function (property, index) {
                    if (typeof this.records === "undefined")
                        this.records = new NamedFragmentRecords();
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
                    this.namedFragmentChanged = this.records.changes.size > 0 || this.records.additions.size > 0 || this.records.deletions.size > 0;
                };
                NamedFragmentComponent.prototype.createProperty = function (property, propertyRow) {
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
                NamedFragmentComponent.prototype.getProperties = function () {
                    var _this = this;
                    this.properties = [];
                    this.updateExistingProperties();
                    this.existingProperties.forEach(function (propName) {
                        _this.properties.push({
                            copy: {
                                id: propName,
                                name: propName,
                                value: _this.namedFragment[propName]
                            }
                        });
                    });
                };
                NamedFragmentComponent.prototype.updateExistingProperties = function () {
                    var _this = this;
                    this.existingProperties = Object.keys(this.namedFragment);
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
                ], NamedFragmentComponent.prototype, "bNodes", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], NamedFragmentComponent.prototype, "namedFragments", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], NamedFragmentComponent.prototype, "canEdit", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], NamedFragmentComponent.prototype, "documentURI", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object), 
                    __metadata('design:paramtypes', [Object])
                ], NamedFragmentComponent.prototype, "namedFragment", null);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], NamedFragmentComponent.prototype, "onOpenBNode", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], NamedFragmentComponent.prototype, "onOpenNamedFragment", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], NamedFragmentComponent.prototype, "onChanges", void 0);
                NamedFragmentComponent = __decorate([
                    core_1.Component({
                        selector: "cp-named-fragment",
                        template: named_fragment_component_html_1.default,
                        styles: [":host { display:block; }"],
                        directives: [property_component_2.PropertyComponent],
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], NamedFragmentComponent);
                return NamedFragmentComponent;
            }());
            exports_1("NamedFragmentComponent", NamedFragmentComponent);
            NamedFragment = (function () {
                function NamedFragment() {
                }
                return NamedFragment;
            }());
            exports_1("NamedFragment", NamedFragment);
            NamedFragmentRecords = (function () {
                function NamedFragmentRecords() {
                    this.changes = new Map();
                    this.deletions = new Map();
                    this.additions = new Map();
                }
                return NamedFragmentRecords;
            }());
            exports_1("NamedFragmentRecords", NamedFragmentRecords);
            exports_1("default",NamedFragmentComponent);
        }
    }
});

//# sourceMappingURL=named-fragment.component.js.map
