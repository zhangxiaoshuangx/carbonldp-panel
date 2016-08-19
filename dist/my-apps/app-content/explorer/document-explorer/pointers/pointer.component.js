System.register(["@angular/core", '@angular/common', "carbonldp/RDF/URI", "./../property/property.component", "jquery", "semantic-ui/semantic", "./pointer.component.html!", "./pointer.component.css!text"], function(exports_1, context_1) {
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
    var core_1, common_1, URI, property_component_1, jquery_1, pointer_component_html_1, pointer_component_css_text_1;
    var PointerComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (URI_1) {
                URI = URI_1;
            },
            function (property_component_1_1) {
                property_component_1 = property_component_1_1;
            },
            function (jquery_1_1) {
                jquery_1 = jquery_1_1;
            },
            function (_1) {},
            function (pointer_component_html_1_1) {
                pointer_component_html_1 = pointer_component_html_1_1;
            },
            function (pointer_component_css_text_1_1) {
                pointer_component_css_text_1 = pointer_component_css_text_1_1;
            }],
        execute: function() {
            PointerComponent = (function () {
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
                    this.onEditMode = new core_1.EventEmitter();
                    this.onSave = new core_1.EventEmitter();
                    this.onDeletePointer = new core_1.EventEmitter();
                    this.onGoToBNode = new core_1.EventEmitter();
                    this.onGoToNamedFragment = new core_1.EventEmitter();
                    // Literal Value;
                    this._id = "";
                    this.idInput = new common_1.Control(this.id, common_1.Validators.compose([common_1.Validators.required, this.idValidator.bind(this)]));
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
                        if (!!this.idInput && this.idInput.value !== this.id)
                            this.idInput.updateValue(this.id);
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
                    if ((changes["bNodes"].currentValue !== changes["bNodes"].previousValue) ||
                        (changes["namedFragments"].currentValue !== changes["namedFragments"].previousValue)) {
                        this.checkForChangesOnPointers();
                    }
                };
                PointerComponent.prototype.checkForChangesOnPointers = function () {
                    var _this = this;
                    if (typeof this.id === "undefined")
                        return;
                    var idx = this.bNodes.concat(this.namedFragments).findIndex(function (nfOrBN) { return nfOrBN["@id"] === _this.id || nfOrBN["id"] === _this.id; });
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
                    if (typeof this.pointer.added !== "undefined" && typeof this.id === "undefined") {
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
                PointerComponent.prototype.idValidator = function (control) {
                    if (!!control && (typeof control.value === "undefined" || control.value.trim().length === 0)) {
                        return { "emptyControl": true };
                    }
                    if (!!control) {
                        if (!control.value.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)) {
                            if (!URI.Util.isBNodeID(control.value))
                                return { "invalidId": true };
                        }
                    }
                    return null;
                };
                PointerComponent.prototype.initializePointersDropdown = function () {
                    this.pointersDropdown = jquery_1.default(this.element.nativeElement.querySelector(".fragments.search.dropdown"));
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
                    this.idInput.updateValue(id === "empty" ? "" : id);
                    this.id = id;
                };
                PointerComponent.prototype.getFriendlyName = function (uri) {
                    if (URI.Util.hasFragment(uri))
                        return URI.Util.getFragment(uri);
                    return URI.Util.getSlug(uri);
                };
                PointerComponent.prototype.goToBNode = function (id) {
                    this.onGoToBNode.emit(id);
                };
                PointerComponent.prototype.goToNamedFragment = function (id) {
                    this.onGoToNamedFragment.emit(id);
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
                PointerComponent = __decorate([
                    core_1.Component({
                        selector: "tr.cp-pointer",
                        template: pointer_component_html_1.default,
                        styles: [pointer_component_css_text_1.default],
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], PointerComponent);
                return PointerComponent;
            }());
            exports_1("PointerComponent", PointerComponent);
            exports_1("default",PointerComponent);
        }
    }
});

//# sourceMappingURL=pointer.component.js.map
