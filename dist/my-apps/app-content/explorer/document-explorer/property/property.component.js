System.register(["@angular/core", '@angular/common', "carbonldp/RDF/RDFNode", "carbonldp/RDF/Literal", "carbonldp/RDF/URI", "carbonldp/Utils", "./../literals/literals.component", "./../pointers/pointers.component", "jquery", "semantic-ui/semantic", "./property.component.html!", "./property.component.css!text"], function(exports_1, context_1) {
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
    var core_1, common_1, SDKRDFNode, SDKLiteral, URI, Utils, literals_component_1, pointers_component_1, jquery_1, property_component_html_1, property_component_css_text_1;
    var PropertyComponent, Modes;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (SDKRDFNode_1) {
                SDKRDFNode = SDKRDFNode_1;
            },
            function (SDKLiteral_1) {
                SDKLiteral = SDKLiteral_1;
            },
            function (URI_1) {
                URI = URI_1;
            },
            function (Utils_1) {
                Utils = Utils_1;
            },
            function (literals_component_1_1) {
                literals_component_1 = literals_component_1_1;
            },
            function (pointers_component_1_1) {
                pointers_component_1 = pointers_component_1_1;
            },
            function (jquery_1_1) {
                jquery_1 = jquery_1_1;
            },
            function (_1) {},
            function (property_component_html_1_1) {
                property_component_html_1 = property_component_html_1_1;
            },
            function (property_component_css_text_1_1) {
                property_component_css_text_1 = property_component_css_text_1_1;
            }],
        execute: function() {
            PropertyComponent = (function () {
                // TODO: Add @lists and @sets support
                function PropertyComponent(element) {
                    this.tempProperty = {};
                    this.value = [];
                    this.addNewLiteral = new core_1.EventEmitter();
                    this.addNewPointer = new core_1.EventEmitter();
                    this.commonToken = ["@id", "@type", "@value"];
                    this.modes = Modes;
                    this.nameInput = new common_1.Control(this.name, common_1.Validators.compose([common_1.Validators.required, this.nameValidator.bind(this)]));
                    this.mode = Modes.READ;
                    this.bNodes = [];
                    this.namedFragments = [];
                    this.canEdit = true;
                    this.existingProperties = [];
                    this.onGoToBNode = new core_1.EventEmitter();
                    this.onGoToNamedFragment = new core_1.EventEmitter();
                    this.onChangeProperty = new core_1.EventEmitter();
                    this.onDeleteProperty = new core_1.EventEmitter();
                    this.onDeleteNewProperty = new core_1.EventEmitter();
                    this.onSaveNewProperty = new core_1.EventEmitter();
                    this.onRefreshDocument = new core_1.EventEmitter();
                    this.nameHasChanged = false;
                    this.literalsHaveChanged = false;
                    this.pointersHaveChanged = false;
                    this.element = element;
                }
                Object.defineProperty(PropertyComponent.prototype, "property", {
                    get: function () { return this._property; },
                    set: function (prop) {
                        var _this = this;
                        this.copyOrAdded = typeof prop.copy !== "undefined" ? "copy" : "added";
                        this._property = prop;
                        this.id = prop[this.copyOrAdded].id;
                        this.tempProperty.id = prop[this.copyOrAdded].id;
                        this.name = prop[this.copyOrAdded].name;
                        this.tempProperty.name = prop[this.copyOrAdded].name;
                        this.nameInput.updateValue(this.name);
                        if (Utils.isArray(prop[this.copyOrAdded].value)) {
                            this.value = [];
                            prop[this.copyOrAdded].value.forEach(function (literalOrRDFNode) { _this.value.push(Object.assign(literalOrRDFNode)); });
                        }
                        else {
                            this.value = prop[this.copyOrAdded].value;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PropertyComponent.prototype, "propertyHasChanged", {
                    get: function () { return this.nameHasChanged || this.literalsHaveChanged || this.pointersHaveChanged; },
                    enumerable: true,
                    configurable: true
                });
                PropertyComponent.prototype.ngOnInit = function () {
                    if (Utils.isArray(this.value))
                        this.fillLiteralsAndPointers();
                };
                PropertyComponent.prototype.ngAfterViewInit = function () {
                    this.$element = jquery_1.default(this.element.nativeElement);
                    this.initializeAccordions();
                    this.initializePropertyButtons();
                    this.initializeDeletionDimmer();
                };
                PropertyComponent.prototype.getDisplayName = function (uri) {
                    if (this.commonToken.indexOf(uri) > -1)
                        return uri;
                    if (URI.Util.hasFragment(uri))
                        return this.unescape(this.getFragment(uri));
                    return this.unescape(URI.Util.getSlug(uri));
                };
                PropertyComponent.prototype.getParentURI = function (uri) {
                    var slug = this.getSlug(uri);
                    return uri.substr(0, uri.indexOf(slug));
                };
                PropertyComponent.prototype.getSlug = function (uri) {
                    return URI.Util.getSlug(uri);
                };
                PropertyComponent.prototype.getFragment = function (uri) {
                    return URI.Util.getFragment(uri);
                };
                PropertyComponent.prototype.isArray = function (property) {
                    return Utils.isArray(property);
                };
                PropertyComponent.prototype.isUrl = function (uri) {
                    var r = /^(ftp|http|https):\/\/[^ "]+$/;
                    return r.test(uri);
                };
                PropertyComponent.prototype.goToBNode = function (id) {
                    this.onGoToBNode.emit(id);
                };
                PropertyComponent.prototype.goToNamedFragment = function (id) {
                    this.onGoToNamedFragment.emit(id);
                };
                PropertyComponent.prototype.getTypeIcon = function (type) {
                    switch (this.getDisplayName(type)) {
                        case "RDFSource":
                            return "file outline";
                        case "Container":
                            return "cubes";
                        case "BasicContainer":
                            return "cube";
                        default:
                            return "file excel outline";
                    }
                };
                PropertyComponent.prototype.initializeAccordions = function () {
                    this.$element.find(".ui.accordion").accordion();
                };
                PropertyComponent.prototype.initializePropertyButtons = function () {
                    this.$element.find(".ui.options.dropdown.button").dropdown({
                        transition: "swing up"
                    });
                };
                PropertyComponent.prototype.initializeDeletionDimmer = function () {
                    this.$element.find(".confirm-deletion.dimmer").dimmer({ closable: false });
                };
                PropertyComponent.prototype.onEditName = function () {
                    this.mode = Modes.EDIT;
                    this.nameInput.updateValue(this.unescape(this.name));
                };
                PropertyComponent.prototype.cancelDeletion = function () {
                    this.$element.find(".confirm-deletion.dimmer").dimmer("hide");
                };
                PropertyComponent.prototype.cancelEdition = function () {
                    if (this.nameInput.valid) {
                        this.mode = Modes.READ;
                        this.nameInput.updateValue(this.name);
                    }
                };
                PropertyComponent.prototype.askToConfirmDeletion = function () {
                    this.$element.find(".confirm-deletion.dimmer").dimmer("show");
                };
                PropertyComponent.prototype.deleteProperty = function () {
                    if (typeof this.property.added !== "undefined") {
                        this.onDeleteNewProperty.emit(this.property);
                    }
                    else {
                        this.property.deleted = this.property.copy;
                        this.onDeleteProperty.emit(this.property);
                    }
                };
                PropertyComponent.prototype.save = function () {
                    this.checkForChangesOnName(this.sanitizeName(this.nameInput.value));
                    this.mode = Modes.READ;
                };
                PropertyComponent.prototype.sanitizeName = function (name) {
                    var sanitizedName = name;
                    var slug = this.getSlug(this.nameInput.value);
                    var parts = this.nameInput.value.split(slug);
                    if (parts.length > 0)
                        sanitizedName = parts[0] + this.escape(slug);
                    return sanitizedName;
                };
                PropertyComponent.prototype.fillLiteralsAndPointers = function () {
                    var _this = this;
                    this.literals = [];
                    this.tempLiterals = [];
                    this.pointers = [];
                    this.tempPointers = [];
                    this.property[this.copyOrAdded].value.forEach(function (literalOrRDFNode) {
                        if (SDKLiteral.Factory.is(literalOrRDFNode)) {
                            _this.literals.push({ copy: literalOrRDFNode });
                            _this.tempLiterals.push({ copy: literalOrRDFNode });
                        }
                        if (SDKRDFNode.Factory.is(literalOrRDFNode)) {
                            _this.pointers.push({ copy: literalOrRDFNode });
                            _this.tempPointers.push({ copy: literalOrRDFNode });
                        }
                    });
                };
                PropertyComponent.prototype.addLiteral = function () {
                    // Notify LiteralsComponent to add literal
                    this.addNewLiteral.emit(true);
                };
                PropertyComponent.prototype.addPointer = function () {
                    // Notify PointersComponent to add pointer
                    this.addNewPointer.emit(true);
                };
                PropertyComponent.prototype.checkForChangesOnName = function (newName) {
                    this.name = newName;
                    if (typeof this.name !== "undefined" && (this.name !== this.property[this.copyOrAdded].name || this.name !== this.tempProperty.name)) {
                        this.tempProperty.name = this.name;
                        this.changePropertyContent();
                    }
                };
                PropertyComponent.prototype.checkForChangesOnLiterals = function (literals) {
                    this.tempLiterals = literals;
                    this.changePropertyContent();
                };
                PropertyComponent.prototype.checkForChangesOnPointers = function (pointers) {
                    this.tempPointers = pointers;
                    this.changePropertyContent();
                };
                PropertyComponent.prototype.changePropertyContent = function () {
                    var _this = this;
                    this.tempProperty.id = this.id;
                    this.tempProperty.name = this.name;
                    // Change name
                    if ((!!this.property.copy)) {
                        if ((this.tempProperty.name !== this.property.copy.name)) {
                            this.property.modified = this.tempProperty;
                            this.nameHasChanged = true;
                        }
                        else {
                            this.nameHasChanged = false;
                        }
                    }
                    // Change literals and pointers
                    if (Utils.isArray(this.value)) {
                        this.tempProperty.value = [];
                        [].concat(this.tempLiterals).concat(this.tempPointers).forEach(function (literalOrPointerRow) {
                            if (!literalOrPointerRow.deleted)
                                _this.tempProperty.value.push(!!literalOrPointerRow.added ? literalOrPointerRow.added : !!literalOrPointerRow.modified ? literalOrPointerRow.modified : literalOrPointerRow.copy);
                        });
                        this.literalsHaveChanged = !!this.tempLiterals.find(function (literalRow) { return !!literalRow.modified || !!literalRow.added || !!literalRow.deleted; });
                        this.pointersHaveChanged = !!this.tempPointers.find(function (pointerRow) { return !!pointerRow.modified || !!pointerRow.added || !!pointerRow.deleted; });
                    }
                    else {
                        this.tempProperty.value = this.value;
                    }
                    if (!!this.property.copy) {
                        if (this.propertyHasChanged)
                            this.property.modified = this.tempProperty;
                        else
                            delete this.property.modified;
                        this.onChangeProperty.emit(this.tempProperty);
                    }
                    else if (!!this.property.added) {
                        if ((this.tempProperty.name !== this.property.added.name)) {
                            this.id = this.name;
                            this.tempProperty.id = this.id;
                        }
                        this.property.added = this.tempProperty;
                        this.onSaveNewProperty.emit(this.tempProperty);
                    }
                };
                PropertyComponent.prototype.refreshDocument = function () {
                    this.onRefreshDocument.emit(this.documentURI);
                };
                PropertyComponent.prototype.escape = function (uri) {
                    return window.escape(uri);
                };
                PropertyComponent.prototype.unescape = function (uri) {
                    return window.unescape(uri);
                };
                PropertyComponent.prototype.nameValidator = function (control) {
                    if (!!control) {
                        if (typeof control.value === "undefined" || control.value === null || !control.value)
                            return null;
                        if (this.existingProperties.indexOf(control.value) !== -1 && this.id !== control.value)
                            return { "duplicatedPropertyName": true };
                        var url = new RegExp("(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})", "g");
                        if (!url.test(control.value))
                            return { "invalidName": true };
                        if (control.value.split("#").length > 2)
                            return { "duplicatedHashtag": true };
                    }
                    return null;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], PropertyComponent.prototype, "mode", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], PropertyComponent.prototype, "documentURI", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], PropertyComponent.prototype, "bNodes", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], PropertyComponent.prototype, "namedFragments", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], PropertyComponent.prototype, "canEdit", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], PropertyComponent.prototype, "existingProperties", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object), 
                    __metadata('design:paramtypes', [Object])
                ], PropertyComponent.prototype, "property", null);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], PropertyComponent.prototype, "onGoToBNode", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], PropertyComponent.prototype, "onGoToNamedFragment", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], PropertyComponent.prototype, "onChangeProperty", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], PropertyComponent.prototype, "onDeleteProperty", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], PropertyComponent.prototype, "onDeleteNewProperty", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], PropertyComponent.prototype, "onSaveNewProperty", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], PropertyComponent.prototype, "onRefreshDocument", void 0);
                PropertyComponent = __decorate([
                    core_1.Component({
                        selector: "cp-property",
                        template: property_component_html_1.default,
                        styles: [property_component_css_text_1.default],
                        directives: [literals_component_1.LiteralsComponent, pointers_component_1.PointersComponent],
                        host: { "[class.has-changed]": "property.modified", "[class.deleted-property]": "property.deleted", "[class.added-property]": "property.added" },
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], PropertyComponent);
                return PropertyComponent;
            }());
            exports_1("PropertyComponent", PropertyComponent);
            Modes = (function () {
                function Modes() {
                }
                Modes.EDIT = "EDIT";
                Modes.READ = "READ";
                return Modes;
            }());
            exports_1("Modes", Modes);
            exports_1("default",PropertyComponent);
        }
    }
});

//# sourceMappingURL=property.component.js.map
