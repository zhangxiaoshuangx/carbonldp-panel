System.register(["@angular/core", "./../property/property.component", "jquery", "semantic-ui/semantic", "./named-fragment.component.html!"], function(exports_1, context_1) {
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
    var core_1, property_component_1, jquery_1, named_fragment_component_html_1;
    var NamedFragmentComponent, NamedFragmentRecords;
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
            function (named_fragment_component_html_1_1) {
                named_fragment_component_html_1 = named_fragment_component_html_1_1;
            }],
        execute: function() {
            NamedFragmentComponent = (function () {
                function NamedFragmentComponent(element) {
                    this.modes = property_component_1.Modes;
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
                Object.defineProperty(NamedFragmentComponent.prototype, "namedFragmentHasChanged", {
                    get: function () {
                        return this.namedFragmentHasChanged;
                    },
                    set: function (hasChanged) {
                        this._namedFragmentHasChanged = hasChanged;
                        delete this.namedFragment.modified;
                        delete this.namedFragment.records;
                        this.namedFragment.name = this.namedFragment.id;
                        if (hasChanged) {
                            this.namedFragment.records = this.records;
                            if (typeof this.namedFragment.added !== "undefined")
                                this.namedFragment.added = this.getRawVersion();
                            else
                                this.namedFragment.modified = this.getRawVersion();
                        }
                        this.onChanges.emit(this.records);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NamedFragmentComponent.prototype, "namedFragment", {
                    get: function () { return this._namedFragment; },
                    set: function (namedFragment) {
                        this._namedFragment = namedFragment;
                        this.rootNode = namedFragment.copy;
                        if (!!namedFragment.records)
                            this.records = namedFragment.records;
                        this.getProperties();
                    },
                    enumerable: true,
                    configurable: true
                });
                NamedFragmentComponent.prototype.ngAfterViewInit = function () {
                    this.$element = jquery_1.default(this.element.nativeElement);
                };
                NamedFragmentComponent.prototype.openBlankNode = function (id) {
                    this.onOpenBlankNode.emit(id);
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
                            property.added.id = property.added.name;
                            this.records.additions.set(property.added.name, property);
                        }
                    }
                    this.updateExistingProperties();
                };
                NamedFragmentComponent.prototype.createProperty = function (property, propertyRow) {
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
                    this.properties.splice(1, 0, newProperty);
                    // Animates created property
                    setTimeout(function () {
                        var createdPropertyComponent = _this.$element.find("cp-property.added-property").first();
                        createdPropertyComponent.addClass("transition hidden");
                        createdPropertyComponent.transition({ animation: "drop" });
                    });
                };
                NamedFragmentComponent.prototype.getProperties = function () {
                    this.updateExistingProperties();
                };
                NamedFragmentComponent.prototype.updateExistingProperties = function () {
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
                        _this.properties.splice(1, 0, value);
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
                    this.namedFragmentHasChanged = this.records.changes.size > 0 || this.records.additions.size > 0 || this.records.deletions.size > 0;
                };
                NamedFragmentComponent.prototype.getRawVersion = function () {
                    var _this = this;
                    var rawNode = Object.assign({}, this.namedFragment.added ? this.namedFragment.added : this.namedFragment.copy);
                    this.records.deletions.forEach(function (property, key) {
                        delete rawNode[key];
                    });
                    this.records.changes.forEach(function (property, key) {
                        if (property.modified.id === "@id")
                            _this.namedFragment.name = property.modified.value;
                        if (property.modified.id !== property.modified.name) {
                            delete rawNode[key];
                            rawNode[property.modified.name] = property.modified.value;
                        }
                        else {
                            rawNode[key] = property.modified.value;
                        }
                    });
                    this.records.additions.forEach(function (property, key) {
                        if (property.added.id === "@id")
                            _this.namedFragment.name = property.modified.value;
                        rawNode[key] = property.added.value;
                    });
                    return rawNode;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], NamedFragmentComponent.prototype, "blankNodes", void 0);
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
                ], NamedFragmentComponent.prototype, "onOpenBlankNode", void 0);
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
                        directives: [property_component_1.PropertyComponent],
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], NamedFragmentComponent);
                return NamedFragmentComponent;
            }());
            exports_1("NamedFragmentComponent", NamedFragmentComponent);
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
