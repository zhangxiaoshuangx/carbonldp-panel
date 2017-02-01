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
var SDKLiteral = require("carbonldp/RDF/Literal");
var SDKList = require("carbonldp/RDF/List");
var URI = require("carbonldp/RDF/URI");
var RDFNode = require("carbonldp/RDF/Node");
var Utils = require("carbonldp/Utils");
var jquery_1 = require("jquery");
require("semantic-ui/semantic");
var PropertyComponent = (function () {
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
        this.addNewList = new core_1.EventEmitter();
        this.commonToken = ["@id", "@type", "@value"];
        this.modes = Modes;
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
        this.nameHasChanged = false;
        this.valueHasChanged = false;
        this.literalsHaveChanged = false;
        this.pointersHaveChanged = false;
        this.listsHaveChanged = false;
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
            this.originalId = prop[this.copyOrAdded].value;
            this.name = prop[this.copyOrAdded].name;
            this.tempProperty.name = prop[this.copyOrAdded].name;
            this.originalName = this.name;
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
        get: function () { return this.nameHasChanged || this.valueHasChanged || this.literalsHaveChanged || this.pointersHaveChanged || this.listsHaveChanged; },
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
        var parts = uri.split("#");
        uri = "".concat(parts[0]).concat("#" + parts[1]);
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
        this.$element.find(".property.confirm-deletion.dimmer").dimmer({ closable: false });
    };
    PropertyComponent.prototype.onEditName = function () {
        this.mode = Modes.EDIT;
        this.name = this.unescape((this.name));
    };
    PropertyComponent.prototype.onEditId = function () {
        var _this = this;
        this.mode = Modes.EDIT;
        this.existingFragments = [];
        this.namedFragments.forEach(function (nameFragment) { _this.existingFragments.push(nameFragment.name); });
        this.value = this.unescape(this.value);
    };
    PropertyComponent.prototype.cancelDeletion = function () {
        this.$element.find(".property.confirm-deletion.dimmer").dimmer("hide");
    };
    PropertyComponent.prototype.cancelEdition = function () {
        if (this.nameInputControl.valid) {
            this.mode = Modes.READ;
        }
    };
    PropertyComponent.prototype.cancelIdEdition = function () {
        if (this.idInputControl.valid) {
            this.mode = Modes.READ;
        }
    };
    PropertyComponent.prototype.askToConfirmDeletion = function () {
        this.$element.find(".property.confirm-deletion.dimmer").dimmer("show");
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
        this.checkForChangesOnName(this.sanitize(this.name));
        this.mode = Modes.READ;
    };
    PropertyComponent.prototype.saveId = function () {
        this.checkForChangesOnId(this.sanitize(this.value)); //check changes on idInput
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
                if (RDFNode.Factory.is(literalOrRDFNode)) {
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
                    _this.lists.push({ copy: literalOrRDFNodeOrList["@list"].map(function (item) { return { copy: item }; }) });
                    _this.tempLists.push({ copy: literalOrRDFNodeOrList });
                }
            });
        }
    };
    PropertyComponent.prototype.addLiteral = function () {
        // Notify LiteralsComponent to add literal
        this.addNewLiteral.emit(true);
    };
    PropertyComponent.prototype.addPointer = function () {
        // Notify PointersComponent to add pointer
        this.addNewPointer.emit(true);
    };
    PropertyComponent.prototype.addList = function () {
        // Notify ListsComponent to add pointer
        this.addNewList.emit(true);
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
    PropertyComponent.prototype.checkForChangesOnLists = function (lists) {
        this.lists = lists;
        this.tempLists = lists;
        this.changePropertyContent();
    };
    PropertyComponent.prototype.convertToListRow = function (lists) {
        var _this = this;
        var resultingLists = [];
        lists.forEach(function (list) {
            var resultingList = {};
            if (list["added"]) {
                resultingList.added = { "@list": _this.getRDFList(list, "added") };
            }
            else if (list["deleted"]) {
                resultingList.deleted = { "@list": _this.getRDFList(list, "deleted") };
            }
            else if (list["modified"]) {
                resultingList.modified = { "@list": _this.getRDFList(list, "modified") };
            }
            else if (list["copy"]) {
                resultingList.copy = { "@list": _this.getRDFList(list, "copy") };
            }
            resultingLists.push(resultingList);
        });
        return resultingLists;
    };
    PropertyComponent.prototype.getRDFList = function (list, copyOrAddedOrModified) {
        var resultingListContent = [];
        list[copyOrAddedOrModified].forEach(function (literalOrPointer) {
            if (!!literalOrPointer["deleted"])
                return;
            if (copyOrAddedOrModified === "copy")
                resultingListContent.push(literalOrPointer["copy"]);
            else
                resultingListContent.push(literalOrPointer[!!literalOrPointer["modified"] ? "modified" : !!literalOrPointer["added"] ? "added" : "copy"]);
        });
        return resultingListContent;
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
            var tempLists = this.convertToListRow(this.tempLists);
            [].concat(this.tempLiterals).concat(this.tempPointers).concat(tempLists).forEach(function (literalOrPointerOrListRow) {
                if (!literalOrPointerOrListRow.deleted)
                    _this.tempProperty.value.push(!!literalOrPointerOrListRow.added ? literalOrPointerOrListRow.added : !!literalOrPointerOrListRow.modified ? literalOrPointerOrListRow.modified : literalOrPointerOrListRow.copy);
            });
            this.literalsHaveChanged = !!this.tempLiterals.find(function (literalRow) { return !!literalRow.modified || !!literalRow.added || !!literalRow.deleted; });
            this.pointersHaveChanged = !!this.tempPointers.find(function (pointerRow) { return !!pointerRow.modified || !!pointerRow.added || !!pointerRow.deleted; });
            this.listsHaveChanged = !!tempLists.find(function (listRow) { return !!listRow.modified || !!listRow.added || !!listRow.deleted; });
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
            if (this.listsHaveChanged) {
                this.property.modifiedLists = this.tempLists;
            }
            else {
                delete this.property.modifiedLists;
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
    PropertyComponent.prototype.escape = function (uri) {
        return encodeURI(uri);
    };
    PropertyComponent.prototype.unescape = function (uri) {
        return decodeURI(uri);
    };
    __decorate([
        core_1.ViewChild("nameInput"), 
        __metadata('design:type', Object)
    ], PropertyComponent.prototype, "nameInputControl", void 0);
    __decorate([
        core_1.ViewChild("idInput"), 
        __metadata('design:type', Object)
    ], PropertyComponent.prototype, "idInputControl", void 0);
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
    PropertyComponent = __decorate([
        core_1.Component({
            selector: "cp-property",
            templateUrl: "./property.component.html",
            styleUrls: ["./property.component.scss"],
            host: { "[class.has-changed]": "property.modified", "[class.deleted-property]": "property.deleted", "[class.added-property]": "property.added" },
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], PropertyComponent);
    return PropertyComponent;
}());
exports.PropertyComponent = PropertyComponent;
var Modes = (function () {
    function Modes() {
    }
    Modes.EDIT = "EDIT";
    Modes.READ = "READ";
    return Modes;
}());
exports.Modes = Modes;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PropertyComponent;

//# sourceMappingURL=property.component.js.map
