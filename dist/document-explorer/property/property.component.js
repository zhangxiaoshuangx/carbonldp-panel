System.register(["@angular/core", "@angular/common/src/forms-deprecated", "carbonldp/RDF/RDFNode", "carbonldp/RDF/Literal", "carbonldp/RDF/List", "carbonldp/RDF/URI", "carbonldp/Utils", "jquery", "semantic-ui/semantic", "./property.component.html!", "./property.component.css!text"], function(exports_1, context_1) {
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
    var core_1, forms_deprecated_1, SDKRDFNode, SDKLiteral, SDKList, URI, Utils, jquery_1, property_component_html_1, property_component_css_text_1;
    var PropertyComponent, Modes;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forms_deprecated_1_1) {
                forms_deprecated_1 = forms_deprecated_1_1;
            },
            function (SDKRDFNode_1) {
                SDKRDFNode = SDKRDFNode_1;
            },
            function (SDKLiteral_1) {
                SDKLiteral = SDKLiteral_1;
            },
            function (SDKList_1) {
                SDKList = SDKList_1;
            },
            function (URI_1) {
                URI = URI_1;
            },
            function (Utils_1) {
                Utils = Utils_1;
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
                    this.literals = [];
                    this.pointers = [];
                    this.lists = [];
                    this.tempProperty = {};
                    this.existingFragments = [];
                    this.value = [];
                    this.addNewLiteral = new core_1.EventEmitter();
                    this.addNewPointer = new core_1.EventEmitter();
                    this.commonToken = ["@id", "@type", "@value"];
                    this.modes = Modes;
                    this.nameInput = new forms_deprecated_1.Control(this.name, forms_deprecated_1.Validators.compose([forms_deprecated_1.Validators.required, this.nameValidator.bind(this)]));
                    this.idInput = new forms_deprecated_1.Control(this.value, forms_deprecated_1.Validators.compose([forms_deprecated_1.Validators.required, this.idValidator.bind(this)]));
                    this.mode = Modes.READ;
                    this.documentURI = "";
                    this.bNodes = [];
                    this.namedFragments = [];
                    this.isPartOfNamedFragment = false;
                    this.canEdit = true;
                    this.existingProperties = [];
                    this.onGoToBlankNode = new core_1.EventEmitter();
                    this.onGoToNamedFragment = new core_1.EventEmitter();
                    this.onChangeProperty = new core_1.EventEmitter();
                    this.onDeleteProperty = new core_1.EventEmitter();
                    this.onDeleteNewProperty = new core_1.EventEmitter();
                    this.onSaveNewProperty = new core_1.EventEmitter();
                    this.onChangeNewProperty = new core_1.EventEmitter();
                    this.onRefreshDocument = new core_1.EventEmitter();
                    this.nameHasChanged = false;
                    this.valueHasChanged = false;
                    this.literalsHaveChanged = false;
                    this.pointersHaveChanged = false;
                    this.element = element;
                }
                Object.defineProperty(PropertyComponent.prototype, "property", {
                    get: function () { return this._property; },
                    set: function (prop) {
                        var _this = this;
                        this.copyOrAdded = !!prop.copy ? (!!prop.modified ? "modified" : "copy") : "added";
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
                            this.idInput.updateValue(this.value);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PropertyComponent.prototype, "propertyHasChanged", {
                    get: function () { return this.nameHasChanged || this.valueHasChanged || this.literalsHaveChanged || this.pointersHaveChanged; },
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
                    this.onGoToBlankNode.emit(id);
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
                PropertyComponent.prototype.onEditId = function () {
                    var _this = this;
                    this.mode = Modes.EDIT;
                    this.existingFragments = [];
                    this.namedFragments.forEach(function (nameFragment) { _this.existingFragments.push(nameFragment.name); });
                    this.idInput.updateValue(this.unescape(this.value));
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
                PropertyComponent.prototype.cancelIdEdition = function () {
                    if (this.idInput.valid) {
                        this.mode = Modes.READ;
                        this.idInput.updateValue(this.value);
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
                    this.checkForChangesOnName(this.sanitize(this.nameInput.value));
                    this.mode = Modes.READ;
                };
                PropertyComponent.prototype.saveId = function () {
                    this.checkForChangesOnId(this.sanitize(this.idInput.value));
                    this.mode = Modes.READ;
                };
                PropertyComponent.prototype.sanitize = function (value) {
                    var sanitized = value;
                    var slug = this.getSlug(value);
                    var parts = value.split(slug);
                    if (parts.length > 0)
                        sanitized = parts[0] + this.escape(slug);
                    return sanitized;
                };
                PropertyComponent.prototype.fillLiteralsAndPointers = function () {
                    var _this = this;
                    this.literals = [];
                    this.tempLiterals = [];
                    this.pointers = [];
                    this.tempPointers = [];
                    this.lists = [];
                    this.tempLists = [];
                    if (typeof this.property.modifiedLiterals !== "undefined") {
                        this.literals = this.property.modifiedLiterals;
                        this.tempLiterals = this.property.modifiedLiterals;
                    }
                    else {
                        this.property[this.copyOrAdded].value.forEach(function (literalOrRDFNode) {
                            if (SDKLiteral.Factory.is(literalOrRDFNode)) {
                                _this.literals.push({ copy: literalOrRDFNode });
                                _this.tempLiterals.push({ copy: literalOrRDFNode });
                            }
                        });
                    }
                    if (typeof this.property.modifiedPointers !== "undefined") {
                        this.pointers = this.property.modifiedPointers;
                        this.tempPointers = this.property.modifiedPointers;
                    }
                    else {
                        this.property[this.copyOrAdded].value.forEach(function (literalOrRDFNode) {
                            if (SDKRDFNode.Factory.is(literalOrRDFNode)) {
                                _this.pointers.push({ copy: literalOrRDFNode });
                                _this.tempPointers.push({ copy: literalOrRDFNode });
                            }
                        });
                    }
                    if (typeof this.property.modifiedLists !== "undefined") {
                        this.lists = this.property.modifiedLists;
                        this.tempLists = this.property.modifiedLists;
                    }
                    else {
                        this.property[this.copyOrAdded].value.forEach(function (literalOrRDFNodeOrList) {
                            if (SDKList.Factory.is(literalOrRDFNodeOrList)) {
                                _this.lists.push({ copy: literalOrRDFNodeOrList });
                                _this.tempLists.push({ copy: literalOrRDFNodeOrList });
                            }
                        });
                    }
                    console.log(this.property);
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
                PropertyComponent.prototype.checkForChangesOnId = function (newId) {
                    this.value = newId;
                    if (typeof this.value !== "undefined" && (this.value !== this.property[this.copyOrAdded].value || this.value !== this.tempProperty.value)) {
                        this.tempProperty.value = this.value;
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
                    this.tempProperty.value = this.value;
                    this.nameHasChanged = false;
                    this.valueHasChanged = false;
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
                        if (this.literalsHaveChanged) {
                            this.property.modifiedLiterals = this.tempLiterals;
                        }
                        else {
                            delete this.property.modifiedLiterals;
                        }
                        if (this.pointersHaveChanged) {
                            this.property.modifiedPointers = this.tempPointers;
                        }
                        else {
                            delete this.property.modifiedPointers;
                        }
                    }
                    else {
                        // Change value because it is a single string
                        if ((!!this.property.copy)) {
                            if ((this.tempProperty.value !== this.property.copy.value)) {
                                this.property.modified = this.tempProperty;
                                this.valueHasChanged = true;
                            }
                            else {
                                this.valueHasChanged = false;
                            }
                        }
                    }
                    this.property.isBeingCreated = false;
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
                        }
                        this.property.added = this.tempProperty;
                        if (this.existingProperties.indexOf(this.tempProperty.id) === -1)
                            this.onSaveNewProperty.emit(this.tempProperty);
                        else
                            this.onChangeNewProperty.emit(this.tempProperty);
                    }
                };
                PropertyComponent.prototype.refreshDocument = function () {
                    this.onRefreshDocument.emit(this.documentURI);
                };
                PropertyComponent.prototype.escape = function (uri) {
                    return encodeURI(uri);
                };
                PropertyComponent.prototype.unescape = function (uri) {
                    return decodeURI(uri);
                };
                PropertyComponent.prototype.nameValidator = function (control) {
                    if (!!control) {
                        if (typeof control.value === "undefined" || control.value === null || !control.value)
                            return null;
                        if (this.existingProperties.indexOf(control.value) !== -1 && (this.property.added ? this.id !== control.value : this.name !== control.value))
                            return { "duplicatedPropertyName": true };
                        var url = new RegExp("(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})", "g");
                        if (!url.test(control.value))
                            return { "invalidName": true };
                        if (control.value.split("#").length > 2)
                            return { "duplicatedHashtag": true };
                    }
                    return null;
                };
                PropertyComponent.prototype.idValidator = function (control) {
                    if (!!control) {
                        if (typeof control.value === "undefined" || control.value === null || !control.value)
                            return null;
                        if (typeof control.value === "string" && !control.value.startsWith(this.documentURI))
                            return { "invalidParent": true };
                        if (this.existingFragments.indexOf(control.value) !== -1 && (this.property.added ? this.id !== control.value : this.value !== control.value))
                            return { "duplicatedNamedFragmentName": true };
                        var url = new RegExp("(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})", "g");
                        if (!url.test(control.value))
                            return { "invalidValue": true };
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
                ], PropertyComponent.prototype, "isPartOfNamedFragment", void 0);
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
                ], PropertyComponent.prototype, "onGoToBlankNode", void 0);
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
                ], PropertyComponent.prototype, "onChangeNewProperty", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], PropertyComponent.prototype, "onRefreshDocument", void 0);
                PropertyComponent = __decorate([
                    core_1.Component({
                        selector: "cp-property",
                        template: property_component_html_1.default,
                        styles: [property_component_css_text_1.default],
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
