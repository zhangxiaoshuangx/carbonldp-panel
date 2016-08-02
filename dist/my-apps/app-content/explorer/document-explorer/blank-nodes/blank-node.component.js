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
    var BlankNodeComponent, BlankNode, BlankNodeRecords;
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
                    this.copyOrModifiedOrAdded = "";
                    this.tempPropertiesNames = [];
                    this.blankNodes = [];
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
                        if (hasChanged) {
                            if (!!this.blankNode.copy) {
                                this.blankNode.modified = this.tempBlankNode;
                            }
                            else {
                                this.blankNode.added = this.tempBlankNode;
                            }
                            this.blankNode.records = this.records;
                        }
                        else {
                            delete this.blankNode.modified;
                            delete this.blankNode.added;
                        }
                        this.updateTempProperties();
                        this.onChanges.emit(this.blankNode);
                    },
                    enumerable: true,
                    configurable: true
                });
                BlankNodeComponent.prototype.ngAfterViewInit = function () {
                    this.$element = jquery_1.default(this.element.nativeElement);
                };
                BlankNodeComponent.prototype.ngOnChanges = function (changes) {
                    if ((changes["blankNode"].currentValue !== changes["blankNode"].previousValue)) {
                        console.log("Blank Node: %o", this.blankNode);
                        this.copyOrModifiedOrAdded = !!this.blankNode.copy ? (!!this.blankNode.modified ? "modified" : "copy") : "added";
                        if (!!this.blankNode.records)
                            this.records = this.blankNode.records;
                        this.tempBlankNode = Object.assign({}, this.blankNode[this.copyOrModifiedOrAdded]);
                        this.tempPropertiesNames = Object.keys(this.tempBlankNode);
                        this.tempProperties = this.getProperties(this.blankNode);
                    }
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
                    this.bNodeHasChanged = this.records.changes.size > 0 || this.records.additions.size > 0 || this.records.deletions.size > 0;
                };
                BlankNodeComponent.prototype.deleteProperty = function (property, index) {
                    if (typeof this.records === "undefined")
                        this.records = new BlankNodeRecords();
                    if (typeof property.added !== "undefined") {
                        this.records.additions.delete(property.added.id);
                        this.tempProperties.splice(index, 1);
                    }
                    else if (typeof property.deleted !== "undefined") {
                        this.records.deletions.set(property.deleted.id, property);
                    }
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
                    this.tempProperties.splice(1, 0, newProperty);
                    if (!!this.$element)
                        setTimeout(function () { return _this.$element.find("cp-property.added-property").first().transition("drop"); });
                };
                BlankNodeComponent.prototype.getPropertiesNames = function (object) {
                    var tempNames = Object.keys(object);
                    // console.log( "Original without records: %o", tempNames );
                    // if( ! this.records ) return tempNames;
                    //
                    // let idx:number;
                    // this.records.deletions.forEach( ( property:PropertyRow, key:string )=> {
                    // 	idx = tempNames.indexOf( key );
                    // 	if( idx !== - 1 ) tempNames.splice( idx, 1 );
                    // } );
                    // this.records.changes.forEach( ( property:PropertyRow, key:string )=> {
                    // 	idx = tempNames.indexOf( key );
                    // 	if( idx !== - 1 ) tempNames.splice( idx, 1, property.modified[ "@id" ] );
                    // } );
                    // this.records.additions.forEach( ( property:PropertyRow, key:string )=> {
                    // 	tempNames.splice( 0, 0, key );
                    // } );
                    // console.log( "Original with records: %o", tempNames );
                    return tempNames;
                };
                BlankNodeComponent.prototype.getProperties = function (blankNode) {
                    var tempProperties = [], copyOrAdded = blankNode.added ? "added" : "copy";
                    var propertiesNames = Object.keys(blankNode[copyOrAdded]);
                    propertiesNames.forEach(function (propName) {
                        tempProperties.push({
                            copy: {
                                id: propName,
                                name: propName,
                                value: blankNode[copyOrAdded][propName]
                            }
                        });
                    });
                    if (!this.records)
                        return tempProperties;
                    var idx;
                    this.records.deletions.forEach(function (property, key) {
                        idx = tempProperties.findIndex(function (propertyRow) { return propertyRow.copy.id === key; });
                        tempProperties.splice(idx, 1);
                    });
                    this.records.changes.forEach(function (property, key) {
                        idx = tempProperties.findIndex(function (propertyRow) { return propertyRow.copy.id === key; });
                        tempProperties.splice(idx, 1, property);
                    });
                    this.records.additions.forEach(function (property, key) {
                        tempProperties.splice(0, 0, property);
                    });
                    return tempProperties;
                };
                BlankNodeComponent.prototype.updateTempProperties = function () {
                    var _this = this;
                    if (!this.records)
                        return;
                    this.records.deletions.forEach(function (property, key) {
                        delete _this.tempBlankNode[key];
                    });
                    this.records.changes.forEach(function (property, key) {
                        if (property.modified.id !== property.modified.name) {
                            delete _this.tempBlankNode[key];
                            _this.tempBlankNode[property.modified.name] = property.modified.value;
                        }
                        else {
                            _this.tempBlankNode[key] = property.modified.value;
                        }
                    });
                    this.records.additions.forEach(function (property, key) {
                        _this.tempBlankNode[key] = property.added.value;
                    });
                    this.tempPropertiesNames = Object.keys(this.tempBlankNode);
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
                    __metadata('design:type', Object)
                ], BlankNodeComponent.prototype, "blankNode", void 0);
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
                        directives: [property_component_1.PropertyComponent],
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
