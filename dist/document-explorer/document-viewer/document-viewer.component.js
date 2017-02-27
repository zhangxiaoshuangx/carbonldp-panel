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
var SDKContext = require("carbonldp/SDKContext");
var RDFDocument = require("carbonldp/RDF/Document");
var JSONLDParser = require("carbonldp/JSONLD/Parser");
var documents_resolver_service_1 = require("./../documents-resolver.service");
var document_resource_component_1 = require("./../document-resource/document-resource.component");
var blank_nodes_component_1 = require("./../blank-nodes/blank-nodes.component");
var named_fragments_component_1 = require("./../named-fragments/named-fragments.component");
var $ = require("jquery");
require("semantic-ui/semantic");
var DocumentViewerComponent = (function () {
    function DocumentViewerComponent(element, documentsResolverService) {
        this.successMessageContent = "";
        this.sections = ["bNodes", "namedFragments", "documentResource"];
        this.bNodes = [];
        this.namedFragments = [];
        this.documentURI = "";
        this.rootNodeHasChanged = false;
        this.bNodesHaveChanged = false;
        this.namedFragmentsHaveChanged = false;
        this.displaySuccessMessage = new core_1.EventEmitter();
        this.onError = new core_1.EventEmitter();
        this.onOpenNode = new core_1.EventEmitter();
        this.onRefreshNode = new core_1.EventEmitter();
        this.onLoadingDocument = new core_1.EventEmitter();
        this.onSavingDocument = new core_1.EventEmitter();
        this.onRefreshDocument = new core_1.EventEmitter();
        this._savingDocument = false;
        this._loadingDocument = false;
        this.element = element;
        this.documentsResolverService = documentsResolverService;
    }
    Object.defineProperty(DocumentViewerComponent.prototype, "documentContentHasChanged", {
        get: function () {
            return this.rootNodeHasChanged || this.bNodesHaveChanged || this.namedFragmentsHaveChanged;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentViewerComponent.prototype, "document", {
        get: function () { return this._document; },
        set: function (value) {
            this._document = value;
            this.receiveDocument(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentViewerComponent.prototype, "savingDocument", {
        get: function () { return this._savingDocument; },
        set: function (value) {
            this._savingDocument = value;
            this.onSavingDocument.emit(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentViewerComponent.prototype, "loadingDocument", {
        get: function () { return this._loadingDocument; },
        set: function (value) {
            this._loadingDocument = value;
            this.onLoadingDocument.emit(value);
        },
        enumerable: true,
        configurable: true
    });
    DocumentViewerComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.$element = $(this.element.nativeElement);
        this.$successMessage = this.$element.find(".success.message");
        this.displaySuccessMessage.subscribe(function (content) {
            _this.showSuccessMessage(content, 2500);
        });
    };
    DocumentViewerComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes["uri"] && !!changes["uri"].currentValue && changes["uri"].currentValue !== changes["uri"].previousValue) {
            this.loadingDocument = true;
            this.getDocument(this.uri, this.documentContext).then(function (document) {
                _this.document = document[0];
            });
        }
    };
    DocumentViewerComponent.prototype.receiveDocument = function (document) {
        var _this = this;
        if (!!document) {
            this.loadingDocument = true;
            this.setRoot();
            this.generateFragments();
            this.clearDocumentChanges();
            this.loadingDocument = false;
            this.documentURI = this.document["@id"];
            setTimeout(function () {
                _this.goToSection("documentResource");
                _this.initializeTabs();
            }, 250);
        }
    };
    DocumentViewerComponent.prototype.setRoot = function () {
        this.rootNode = RDFDocument.Util.getDocumentResources(this.document)[0];
    };
    DocumentViewerComponent.prototype.getDocument = function (uri, documentContext) {
        return this.documentsResolverService.get(uri, documentContext);
    };
    DocumentViewerComponent.prototype.generateFragments = function () {
        this.bNodes = RDFDocument.Util.getBNodeResources(this.document).map(function (bNode) {
            return {
                id: bNode["@id"],
                bNodeIdentifier: bNode["https://carbonldp.com/ns/v1/platform#bNodeIdentifier"][0]["@value"],
                copy: bNode
            };
        });
        this.namedFragments = RDFDocument.Util.getFragmentResources(this.document).map(function (namedFragment) {
            return {
                id: namedFragment["@id"],
                name: namedFragment["@id"],
                copy: namedFragment
            };
        });
    };
    DocumentViewerComponent.prototype.openBlankNode = function (id) {
        this.documentBNodes.openBlankNode(id);
        this.goToSection("bNodes");
    };
    DocumentViewerComponent.prototype.openNamedFragment = function (id) {
        this.documentNamedFragments.openNamedFragment(id);
        this.goToSection("namedFragments");
    };
    DocumentViewerComponent.prototype.initializeTabs = function () {
        this.$element.find(".secondary.menu.document.tabs .item").tab();
    };
    DocumentViewerComponent.prototype.goToSection = function (section) {
        if (this.sections.indexOf(section) === -1)
            return;
        this.scrollTo(">div:first-child");
        this.$element.find(".secondary.menu.document.tabs .item").tab("changeTab", section);
    };
    DocumentViewerComponent.prototype.registerRootNodeChanges = function (records) {
        this.rootNodeRecords = records;
        this.rootNodeHasChanged = records.changes.size > 0 || records.additions.size > 0 || records.deletions.size > 0;
    };
    DocumentViewerComponent.prototype.registerBlankNodesChanges = function (bNodeChanges) {
        this.bNodesChanges = bNodeChanges;
        this.bNodesHaveChanged = bNodeChanges.changes.size > 0 || bNodeChanges.additions.size > 0 || bNodeChanges.deletions.size > 0;
    };
    DocumentViewerComponent.prototype.registerNamedFragmentsChanges = function (namedFragmentsChanges) {
        this.namedFragmentsChanges = namedFragmentsChanges;
        this.namedFragmentsHaveChanged = namedFragmentsChanges.changes.size > 0 || namedFragmentsChanges.additions.size > 0 || namedFragmentsChanges.deletions.size > 0;
    };
    DocumentViewerComponent.prototype.modifyRootNodeWithChanges = function (rootNode) {
        if (!!this.rootNodeRecords) {
            this.rootNodeRecords.deletions.forEach(function (property, key) {
                delete rootNode[key];
            });
            this.rootNodeRecords.changes.forEach(function (property, key) {
                if (property.modified.id !== property.modified.name) {
                    delete rootNode[key];
                    rootNode[property.modified.name] = property.modified.value;
                }
                else {
                    rootNode[key] = property.modified.value;
                }
            });
            this.rootNodeRecords.additions.forEach(function (property, key) {
                rootNode[key] = property.added.value;
            });
        }
    };
    DocumentViewerComponent.prototype.modifyBNodesWithChanges = function (document) {
        var tempIdx;
        if (!this.bNodesChanges)
            return;
        this.bNodesChanges.deletions.forEach(function (blankNodeRow, bNodeId) {
            tempIdx = document["@graph"].findIndex((function (bNode) { return bNode["@id"] === bNodeId; }));
            document["@graph"].splice(tempIdx, 1);
        });
        tempIdx = -1;
        this.bNodesChanges.changes.forEach(function (blankNodeRow, bNodeId) {
            tempIdx = document["@graph"].findIndex((function (bNode) { return bNode["@id"] === bNodeId; }));
            document["@graph"][tempIdx] = blankNodeRow.modified;
        });
        this.bNodesChanges.additions.forEach(function (blankNodeRow, bNodeId) {
            document["@graph"].push(blankNodeRow.added);
        });
    };
    DocumentViewerComponent.prototype.modifyNamedFragmentsWithChanges = function (document) {
        var tempIdx;
        if (!this.namedFragmentsChanges)
            return;
        this.namedFragmentsChanges.deletions.forEach(function (namedFragmentRow, namedFragmentId) {
            tempIdx = document["@graph"].findIndex((function (namedFragment) { return namedFragment["@id"] === namedFragmentId; }));
            document["@graph"].splice(tempIdx, 1);
        });
        tempIdx = -1;
        this.namedFragmentsChanges.changes.forEach(function (namedFragmentRow, namedFragmentId) {
            tempIdx = document["@graph"].findIndex((function (namedFragment) { return namedFragment["@id"] === namedFragmentId; }));
            document["@graph"][tempIdx] = namedFragmentRow.modified;
        });
        this.namedFragmentsChanges.additions.forEach(function (namedFragmentRow, namedFragmentId) {
            document["@graph"].push(namedFragmentRow.added);
        });
    };
    DocumentViewerComponent.prototype.clearDocumentChanges = function () {
        this.rootNodeRecords = new document_resource_component_1.RootRecords();
        this.bNodesChanges = new blank_nodes_component_1.BlankNodesRecords();
        this.namedFragmentsChanges = new blank_nodes_component_1.BlankNodesRecords();
        this.rootNodeHasChanged = false;
        this.bNodesHaveChanged = false;
        this.namedFragmentsHaveChanged = false;
    };
    DocumentViewerComponent.prototype.saveDocument = function () {
        var _this = this;
        this.savingDocument = true;
        var backupDocument = JSON.parse(JSON.stringify(this.document));
        var backupRootNode = RDFDocument.Util.getDocumentResources(backupDocument)[0];
        this.modifyRootNodeWithChanges(backupRootNode);
        this.modifyBNodesWithChanges(backupDocument);
        this.modifyNamedFragmentsWithChanges(backupDocument);
        var body = JSON.stringify(backupDocument, null, "\t");
        this.documentsResolverService.update(backupDocument["@id"], body, this.documentContext).then(function (updatedDocument) {
            _this.document = updatedDocument;
            _this.showSuccessMessage("<p>Changes saved successfully</p>", 4500);
        }).catch(function (error) {
            _this.onError.emit(error);
        }).then(function () {
            _this.savingDocument = false;
            _this.rootNodeHasChanged = _this.rootNodeRecords.changes.size > 0 || _this.rootNodeRecords.additions.size > 0 || _this.rootNodeRecords.deletions.size > 0;
            _this.bNodesHaveChanged = _this.bNodesChanges.changes.size > 0 || _this.bNodesChanges.additions.size > 0 || _this.bNodesChanges.deletions.size > 0;
            _this.namedFragmentsHaveChanged = _this.namedFragmentsChanges.changes.size > 0 || _this.namedFragmentsChanges.additions.size > 0 || _this.namedFragmentsChanges.deletions.size > 0;
        });
    };
    DocumentViewerComponent.prototype.getErrors = function (error) {
        var parser = new JSONLDParser.Class();
        var mainError = {};
        var errors = [];
        return parser.parse(error.response.data).then(function (mainErrors) {
            mainError = mainErrors.find(function (error) { return error["@type"].indexOf("https://carbonldp.com/ns/v1/platform#ErrorResponse") !== -1; });
            errors = mainErrors.filter(function (error) { return error["@type"].indexOf("https://carbonldp.com/ns/v1/platform#Error") !== -1; });
            return errors;
        });
    };
    DocumentViewerComponent.prototype.closeMessage = function (message) {
        $(message).transition("fade");
    };
    DocumentViewerComponent.prototype.showSuccessMessage = function (content, timeout) {
        var _this = this;
        this.successMessageContent = content;
        this.$successMessage.transition({
            onComplete: function () {
                setTimeout(function () {
                    if (!_this.$successMessage.hasClass("hidden"))
                        _this.$successMessage.transition("fade");
                    _this.successMessageContent = "";
                }, typeof timeout !== "undefined" ? timeout : 2500);
            }
        });
    };
    DocumentViewerComponent.prototype.beforeRefreshDocument = function (documentURI) {
        if (this.documentContentHasChanged)
            this.toggleConfirmRefresh();
        else
            this.refreshDocument(documentURI);
    };
    DocumentViewerComponent.prototype.refreshDocument = function (documentURI) {
        this.onRefreshDocument.emit(documentURI);
        this.$element.find(".unsaved.prompt.message").transition({ animation: "fade" }).transition("hide");
    };
    DocumentViewerComponent.prototype.toggleConfirmRefresh = function () {
        this.$element.find(".unsaved.prompt.message").transition({ animation: "fade" });
    };
    DocumentViewerComponent.prototype.scrollTo = function (selector) {
        if (!this.$element)
            return;
        var divPosition = this.$element.find(selector).position();
        if (!divPosition)
            return;
        this.$element.animate({ scrollTop: divPosition.top }, "fast");
    };
    return DocumentViewerComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DocumentViewerComponent.prototype, "uri", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", SDKContext.Class)
], DocumentViewerComponent.prototype, "documentContext", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", core_1.EventEmitter)
], DocumentViewerComponent.prototype, "displaySuccessMessage", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DocumentViewerComponent.prototype, "document", null);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DocumentViewerComponent.prototype, "onError", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DocumentViewerComponent.prototype, "onOpenNode", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DocumentViewerComponent.prototype, "onRefreshNode", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DocumentViewerComponent.prototype, "onLoadingDocument", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DocumentViewerComponent.prototype, "onSavingDocument", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DocumentViewerComponent.prototype, "onRefreshDocument", void 0);
__decorate([
    core_1.ViewChild(blank_nodes_component_1.BlankNodesComponent),
    __metadata("design:type", blank_nodes_component_1.BlankNodesComponent)
], DocumentViewerComponent.prototype, "documentBNodes", void 0);
__decorate([
    core_1.ViewChild(named_fragments_component_1.NamedFragmentsComponent),
    __metadata("design:type", named_fragments_component_1.NamedFragmentsComponent)
], DocumentViewerComponent.prototype, "documentNamedFragments", void 0);
DocumentViewerComponent = __decorate([
    core_1.Component({
        selector: "cp-document-viewer",
        host: { "[class.ui]": "true", "[class.basic]": "true", "[class.segment]": "true", },
        templateUrl: "./document-viewer.component.html",
        styleUrls: ["./document-viewer.component.scss"],
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, documents_resolver_service_1.DocumentsResolverService])
], DocumentViewerComponent);
exports.DocumentViewerComponent = DocumentViewerComponent;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DocumentViewerComponent;

//# sourceMappingURL=document-viewer.component.js.map
