System.register(["@angular/core", "carbonldp/SDKContext", "carbonldp/RDF/URI", "./documents-resolver.service", "semantic-ui/semantic", "./document-explorer.component.html!", "./document-explorer.component.css!text"], function(exports_1, context_1) {
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
    var core_1, SDKContext, URI, documents_resolver_service_1, document_explorer_component_html_1, document_explorer_component_css_text_1;
    var DocumentExplorerComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (SDKContext_1) {
                SDKContext = SDKContext_1;
            },
            function (URI_1) {
                URI = URI_1;
            },
            function (documents_resolver_service_1_1) {
                documents_resolver_service_1 = documents_resolver_service_1_1;
            },
            function (_1) {},
            function (document_explorer_component_html_1_1) {
                document_explorer_component_html_1 = document_explorer_component_html_1_1;
            },
            function (document_explorer_component_css_text_1_1) {
                document_explorer_component_css_text_1 = document_explorer_component_css_text_1_1;
            }],
        execute: function() {
            DocumentExplorerComponent = (function () {
                function DocumentExplorerComponent(element, documentsResolverService, zone) {
                    this.selectedDocumentURI = "";
                    this.loadingDocument = false;
                    this.savingDocument = false;
                    this.messages = [];
                    this.onRefreshNode = new core_1.EventEmitter();
                    this.onOpenNode = new core_1.EventEmitter();
                    this.onDisplaySuccessMessage = new core_1.EventEmitter();
                    this.element = element;
                    this.documentsResolverService = documentsResolverService;
                    this.zone = zone;
                }
                DocumentExplorerComponent.prototype.ngAfterViewInit = function () {
                    this.$element = $(this.element.nativeElement);
                    this.$deleteDocumentModal = this.$element.find(".delete.document.modal").modal({ closable: false });
                };
                DocumentExplorerComponent.prototype.onLoadingDocument = function (loadingDocument) {
                    this.loadingDocument = loadingDocument;
                };
                DocumentExplorerComponent.prototype.showLoading = function (savingDocument) {
                    this.savingDocument = savingDocument;
                };
                DocumentExplorerComponent.prototype.resolveDocument = function (uri) {
                    var _this = this;
                    this.loadingDocument = true;
                    this.documentsResolverService.get(uri, this.documentContext).then(function (document) {
                        _this.zone.run(function () {
                            _this.inspectingDocument = document[0];
                            _this.loadingDocument = false;
                        });
                    });
                };
                DocumentExplorerComponent.prototype.refreshDocument = function (documentURI) {
                    this.resolveDocument(documentURI);
                };
                DocumentExplorerComponent.prototype.refreshNode = function (nodeId) {
                    this.onRefreshNode.emit(nodeId);
                };
                DocumentExplorerComponent.prototype.openNode = function (nodeId) {
                    this.onOpenNode.emit(nodeId);
                };
                DocumentExplorerComponent.prototype.changeSelection = function (documentURI) {
                    this.selectedDocumentURI = documentURI;
                };
                DocumentExplorerComponent.prototype.showModal = function (element) {
                    $(element).modal("show");
                };
                DocumentExplorerComponent.prototype.hideDeleteDocumentForm = function () {
                    this.$deleteDocumentModal.modal("hide");
                };
                DocumentExplorerComponent.prototype.onSuccessAccessPoint = function ($event) {
                    this.onRefreshNode.emit(this.selectedDocumentURI);
                    this.onDisplaySuccessMessage.emit("<p>The Access Point was created correctly</p>");
                };
                DocumentExplorerComponent.prototype.onSuccessCreateDocument = function ($event) {
                    this.onRefreshNode.emit(this.selectedDocumentURI);
                    this.onDisplaySuccessMessage.emit("<p>The child document was created correctly</p>");
                };
                DocumentExplorerComponent.prototype.deleteDocument = function () {
                    var _this = this;
                    this.documentsResolverService.delete(this.documentContext, this.selectedDocumentURI).then(function (result) {
                        _this.refreshNode(_this.getParentURI(_this.selectedDocumentURI));
                        _this.hideDeleteDocumentForm();
                    }).catch(function (error) {
                        // this.savingErrorMessage = this.getErrorMessage( error );
                    });
                };
                DocumentExplorerComponent.prototype.getParentURI = function (documentURI) {
                    var slug = URI.Util.getSlug(documentURI), slugIdx = documentURI.indexOf(slug);
                    return documentURI.substr(0, slugIdx);
                };
                DocumentExplorerComponent.prototype.clearSavingError = function () {
                    this.savingErrorMessage = null;
                };
                DocumentExplorerComponent.prototype.handleExternalError = function (error) {
                    // this.messages.push( this.getErrorMessage( error ) );
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', SDKContext.Class)
                ], DocumentExplorerComponent.prototype, "documentContext", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], DocumentExplorerComponent.prototype, "onRefreshNode", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], DocumentExplorerComponent.prototype, "onOpenNode", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], DocumentExplorerComponent.prototype, "onDisplaySuccessMessage", void 0);
                DocumentExplorerComponent = __decorate([
                    core_1.Component({
                        selector: "cp-document-explorer",
                        template: document_explorer_component_html_1.default,
                        styles: [document_explorer_component_css_text_1.default],
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, documents_resolver_service_1.DocumentsResolverService, core_1.NgZone])
                ], DocumentExplorerComponent);
                return DocumentExplorerComponent;
            }());
            exports_1("DocumentExplorerComponent", DocumentExplorerComponent);
            exports_1("default",DocumentExplorerComponent);
        }
    }
});

//# sourceMappingURL=document-explorer.component.js.map
