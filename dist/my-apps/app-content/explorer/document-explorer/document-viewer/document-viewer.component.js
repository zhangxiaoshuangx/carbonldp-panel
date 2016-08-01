System.register(["@angular/core", "carbonldp/SDKContext", "carbonldp/RDF/Document", "carbonldp/HTTP", "./../documents-resolver.service", "./../document-resource/document-resource.component", "./../blank-nodes/blank-nodes.component", "./../named-fragments/named-fragments.component", "./../property/property.component", "jquery", "semantic-ui/semantic", "./document-viewer.component.html!", "./document-viewer.component.css!text"], function(exports_1, context_1) {
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
    var core_1, SDKContext, RDFDocument, HTTP_1, documents_resolver_service_1, document_resource_component_1, document_resource_component_2, blank_nodes_component_1, named_fragments_component_1, property_component_1, jquery_1, document_viewer_component_html_1, document_viewer_component_css_text_1;
    var DocumentViewerComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (SDKContext_1) {
                SDKContext = SDKContext_1;
            },
            function (RDFDocument_1) {
                RDFDocument = RDFDocument_1;
            },
            function (HTTP_1_1) {
                HTTP_1 = HTTP_1_1;
            },
            function (documents_resolver_service_1_1) {
                documents_resolver_service_1 = documents_resolver_service_1_1;
            },
            function (document_resource_component_1_1) {
                document_resource_component_1 = document_resource_component_1_1;
                document_resource_component_2 = document_resource_component_1_1;
            },
            function (blank_nodes_component_1_1) {
                blank_nodes_component_1 = blank_nodes_component_1_1;
            },
            function (named_fragments_component_1_1) {
                named_fragments_component_1 = named_fragments_component_1_1;
            },
            function (property_component_1_1) {
                property_component_1 = property_component_1_1;
            },
            function (jquery_1_1) {
                jquery_1 = jquery_1_1;
            },
            function (_1) {},
            function (document_viewer_component_html_1_1) {
                document_viewer_component_html_1 = document_viewer_component_html_1_1;
            },
            function (document_viewer_component_css_text_1_1) {
                document_viewer_component_css_text_1 = document_viewer_component_css_text_1_1;
            }],
        execute: function() {
            DocumentViewerComponent = (function () {
                function DocumentViewerComponent(element, documentsResolverService) {
                    this.sections = ["bNodes", "namedFragments", "documentResource"];
                    this.bNodes = [];
                    this.namedFragments = [];
                    this.rootNodeHasChanged = false;
                    this.bNodesHaveChanged = false;
                    this.namedFragmentsHaveChanged = false;
                    this.onLoadingDocument = new core_1.EventEmitter();
                    this.onSavingDocument = new core_1.EventEmitter();
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
                    this.$element = jquery_1.default(this.element.nativeElement);
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
                        this.savingErrorMessage = null;
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
                    // this.bNodes = RDFDocument.Util.getBNodeResources( this.document );
                    this.bNodes = RDFDocument.Util.getBNodeResources(this.document).map(function (bNode) {
                        return {
                            id: bNode["@id"],
                            bNodeIdentifier: bNode["https://carbonldp.com/ns/v1/platform#bNodeIdentifier"][0]["@value"],
                            copy: bNode
                        };
                    });
                    // this.getBlankNodes();
                    this.namedFragments = RDFDocument.Util.getFragmentResources(this.document);
                };
                DocumentViewerComponent.prototype.getBlankNodes = function () {
                    var _this = this;
                    var bNodes = RDFDocument.Util.getBNodeResources(this.document);
                    bNodes.forEach(function (bNode) {
                        _this.bNodes.push({
                            copy: bNode
                        });
                    });
                    console.log(this.bNodes);
                };
                DocumentViewerComponent.prototype.openBNode = function (id) {
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
                    this.namedFragmentsHaveChanged = namedFragmentsChanges.size > 0;
                };
                DocumentViewerComponent.prototype.modifyRootNodeWithChanges = function () {
                    var _this = this;
                    if (!!this.rootNodeRecords) {
                        this.rootNodeRecords.deletions.forEach(function (property, key) {
                            delete _this.rootNode[key];
                        });
                        this.rootNodeRecords.changes.forEach(function (property, key) {
                            if (property.modified.id !== property.modified.name) {
                                delete _this.rootNode[key];
                                _this.rootNode[property.modified.name] = property.modified.value;
                            }
                            else {
                                _this.rootNode[key] = property.modified.value;
                            }
                        });
                        this.rootNodeRecords.additions.forEach(function (property, key) {
                            _this.rootNode[key] = property.added.value;
                        });
                    }
                };
                DocumentViewerComponent.prototype.modifyBNodesWithChanges = function () {
                    var _this = this;
                    var tempIdx;
                    this.bNodesChanges.deletions.forEach(function (blankNodeRow, bNodeId) {
                        tempIdx = _this.document["@graph"].findIndex((function (bNode) { return bNode["@id"] === bNodeId; }));
                        _this.document["@graph"].splice(tempIdx, 1);
                    });
                    tempIdx = -1;
                    this.bNodesChanges.changes.forEach(function (blankNodeRow, bNodeId) {
                        tempIdx = _this.document["@graph"].findIndex((function (bNode) { return bNode["@id"] === bNodeId; }));
                        _this.document["@graph"][tempIdx] = blankNodeRow.modified;
                    });
                    this.bNodesChanges.additions.forEach(function (blankNodeRow, bNodeId) {
                        _this.document["@graph"].push(blankNodeRow.added);
                    });
                };
                DocumentViewerComponent.prototype.modifyNamedFragmentsWithChanges = function () {
                    var _this = this;
                    var tempNamedFragment;
                    this.namedFragmentsChanges.forEach(function (namedFragmentRecords, namedFragmentId) {
                        tempNamedFragment = _this.namedFragments.find((function (namedFragment) { return namedFragment["@id"] === namedFragmentId; }));
                        namedFragmentRecords.deletions.forEach(function (property, key) {
                            delete tempNamedFragment[key];
                        });
                        namedFragmentRecords.changes.forEach(function (property, key) {
                            if (property.modified.id !== property.modified.name) {
                                delete tempNamedFragment[key];
                                tempNamedFragment[property.modified.name] = property.modified.value;
                            }
                            else {
                                tempNamedFragment[key] = property.modified.value;
                            }
                        });
                        namedFragmentRecords.additions.forEach(function (property, key) {
                            tempNamedFragment[key] = property.added.value;
                        });
                    });
                };
                DocumentViewerComponent.prototype.clearDocumentChanges = function () {
                    this.rootNodeRecords = new document_resource_component_2.RootRecords();
                    this.bNodesChanges = new Map();
                    this.namedFragmentsChanges = new Map();
                    this.rootNodeHasChanged = false;
                    this.bNodesHaveChanged = false;
                    this.namedFragmentsHaveChanged = false;
                };
                DocumentViewerComponent.prototype.saveDocument = function () {
                    var _this = this;
                    this.savingDocument = true;
                    this.modifyRootNodeWithChanges();
                    this.modifyBNodesWithChanges();
                    this.modifyNamedFragmentsWithChanges();
                    var body = JSON.stringify(this.document, null, "\t");
                    this.documentsResolverService.update(this.document["@id"], body, this.documentContext).then(function (updatedDocument) {
                        _this.document = updatedDocument[0];
                    }).catch(function (error) {
                        _this.savingErrorMessage = {
                            title: error.name,
                            content: error.response.request.statusText,
                            statusCode: "" + error.response.status,
                            statusMessage: error.response.request.statusText,
                            endpoint: error.response.request.responseURL,
                        };
                        if (!!error.response.data) {
                            // TODO: Change this method to use the correct HTTPError when Javascript SDK implements it
                            _this.getErrors(error).then(function (errors) {
                                _this.savingErrorMessage["errors"] = errors;
                            });
                        }
                    }).then(function () {
                        _this.savingDocument = false;
                        _this.rootNodeHasChanged = _this.rootNodeRecords.changes.size > 0 || _this.rootNodeRecords.additions.size > 0 || _this.rootNodeRecords.deletions.size > 0;
                        _this.bNodesHaveChanged = _this.bNodesChanges.size > 0;
                        _this.namedFragmentsHaveChanged = _this.namedFragmentsChanges.size > 0;
                    });
                };
                DocumentViewerComponent.prototype.getErrors = function (error) {
                    var parser = new HTTP_1.JSONLDParser.Class();
                    var mainError = {};
                    var errors = [];
                    return parser.parse(error.response.data).then(function (mainErrors) {
                        mainError = mainErrors.find(function (error) { return error["@type"].indexOf("https://carbonldp.com/ns/v1/platform#ErrorResponse") !== -1; });
                        errors = mainErrors.filter(function (error) { return error["@type"].indexOf("https://carbonldp.com/ns/v1/platform#Error") !== -1; });
                        return errors;
                    });
                };
                DocumentViewerComponent.prototype.clearSavingError = function () {
                    this.savingErrorMessage = null;
                };
                DocumentViewerComponent.prototype.scrollTo = function (selector) {
                    if (!this.$element)
                        return;
                    var divPosition = this.$element.find(selector).position();
                    if (!divPosition)
                        return;
                    this.$element.animate({ scrollTop: divPosition.top }, "fast");
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], DocumentViewerComponent.prototype, "uri", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], DocumentViewerComponent.prototype, "documentContext", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object), 
                    __metadata('design:paramtypes', [Object])
                ], DocumentViewerComponent.prototype, "document", null);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], DocumentViewerComponent.prototype, "onLoadingDocument", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], DocumentViewerComponent.prototype, "onSavingDocument", void 0);
                __decorate([
                    core_1.ViewChild(blank_nodes_component_1.BlankNodesComponent), 
                    __metadata('design:type', blank_nodes_component_1.BlankNodesComponent)
                ], DocumentViewerComponent.prototype, "documentBNodes", void 0);
                __decorate([
                    core_1.ViewChild(named_fragments_component_1.NamedFragmentsComponent), 
                    __metadata('design:type', named_fragments_component_1.NamedFragmentsComponent)
                ], DocumentViewerComponent.prototype, "documentNamedFragments", void 0);
                DocumentViewerComponent = __decorate([
                    core_1.Component({
                        selector: "cp-document-viewer",
                        host: { "[class.ui]": "true", "[class.basic]": "true", "[class.segment]": "true", },
                        template: document_viewer_component_html_1.default,
                        styles: [document_viewer_component_css_text_1.default],
                        directives: [document_resource_component_1.DocumentResourceComponent, blank_nodes_component_1.BlankNodesComponent, named_fragments_component_1.NamedFragmentsComponent, property_component_1.PropertyComponent],
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, documents_resolver_service_1.DocumentsResolverService])
                ], DocumentViewerComponent);
                return DocumentViewerComponent;
            }());
            exports_1("DocumentViewerComponent", DocumentViewerComponent);
            exports_1("default",DocumentViewerComponent);
        }
    }
});

//# sourceMappingURL=document-viewer.component.js.map
