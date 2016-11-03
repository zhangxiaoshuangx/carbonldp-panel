System.register(["@angular/core", "carbonldp/SDKContext", "carbonldp/HTTP", "carbonldp/JSONLD/Parser", "carbonldp/RDF/URI", "./documents-resolver.service", "semantic-ui/semantic", "./document-explorer.component.html!", "./document-explorer.component.css!text"], function(exports_1, context_1) {
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
    var core_1, SDKContext, HTTP, JSONLDParser, URI, documents_resolver_service_1, document_explorer_component_html_1, document_explorer_component_css_text_1;
    var DocumentExplorerComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (SDKContext_1) {
                SDKContext = SDKContext_1;
            },
            function (HTTP_1) {
                HTTP = HTTP_1;
            },
            function (JSONLDParser_1) {
                JSONLDParser = JSONLDParser_1;
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
                    this.createChildFormModel = {
                        slug: "",
                        advancedOptions: {
                            hasMemberRelation: "http://www.w3.org/ns/ldp#member",
                            isMemberOfRelation: ""
                        }
                    };
                    this.createAccessPointFormModel = {
                        slug: "",
                        hasMemberRelation: "http://www.w3.org/ns/ldp#member",
                        isMemberOfRelation: ""
                    };
                    this.onRefreshNode = new core_1.EventEmitter();
                    this.onOpenNode = new core_1.EventEmitter();
                    this.onDisplaySuccessMessage = new core_1.EventEmitter();
                    this.element = element;
                    this.documentsResolverService = documentsResolverService;
                    this.zone = zone;
                }
                DocumentExplorerComponent.prototype.ngAfterViewInit = function () {
                    this.$element = $(this.element.nativeElement);
                    this.$createAccessPointModal = this.$element.find(".create.accesspoint.modal").modal({ closable: false });
                    this.$createDocumentModal = this.$element.find(".create.document.modal").modal({ closable: false });
                    this.$deleteDocumentModal = this.$element.find(".delete.document.modal").modal({ closable: false });
                    this.$createDocumentModal.find(".advancedoptions.accordion").accordion();
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
                //<editor-fold desc="#region Create child">
                DocumentExplorerComponent.prototype.changeSelection = function (documentURI) {
                    this.selectedDocumentURI = documentURI;
                };
                DocumentExplorerComponent.prototype.showModal = function (element) {
                    $(element).modal("show");
                };
                DocumentExplorerComponent.prototype.hideCreateChildForm = function () {
                    this.$createDocumentModal.modal("hide");
                    this.clearSavingError();
                    this.createChildFormModel.slug = "";
                    this.createChildFormModel.advancedOptions.hasMemberRelation = "http://www.w3.org/ns/ldp#member";
                    this.createChildFormModel.advancedOptions.isMemberOfRelation = "";
                };
                DocumentExplorerComponent.prototype.hideCreateAccessPointForm = function () {
                    this.$createAccessPointModal.modal("hide");
                    this.clearSavingError();
                    this.createAccessPointFormModel.slug = "";
                    this.createAccessPointFormModel.hasMemberRelation = "http://www.w3.org/ns/ldp#member";
                    this.createAccessPointFormModel.isMemberOfRelation = "";
                };
                DocumentExplorerComponent.prototype.hideDeleteDocumentForm = function () {
                    this.$deleteDocumentModal.modal("hide");
                };
                DocumentExplorerComponent.prototype.slugLostControl = function (evt) {
                    if (typeof (evt.target) === "undefined")
                        return;
                    if (!evt.target.value.endsWith("/") && evt.target.value.trim() !== "")
                        evt.target.value += "/";
                };
                DocumentExplorerComponent.prototype.getSanitizedSlug = function (slug) {
                    if (!slug)
                        return slug;
                    return slug.toLowerCase().replace(/ - | -|- /g, "-").replace(/[^-\w ]+/g, "").replace(/ +/g, "-");
                };
                DocumentExplorerComponent.prototype.onSubmitCreateChild = function (data, $event) {
                    var _this = this;
                    $event.preventDefault();
                    var childSlug = null;
                    if (!!data.slug)
                        childSlug = data.slug + ((data.slug.endsWith("/") && data.slug.trim() !== "") ? "/" : "");
                    var childContent = {
                        hasMemberRelation: data.advancedOptions.hasMemberRelation
                    };
                    if (!!data.advancedOptions.isMemberOfRelation)
                        childContent["isMemberOfRelation"] = data.advancedOptions.isMemberOfRelation;
                    this.loadingDocument = true;
                    this.documentsResolverService.createChild(this.documentContext, this.selectedDocumentURI, childContent, childSlug).then(function (createdChild) {
                        _this.onRefreshNode.emit(_this.selectedDocumentURI);
                        _this.hideCreateChildForm();
                        _this.onDisplaySuccessMessage.emit("<p>The child document was created correctly</p>");
                    }).catch(function (error) {
                        _this.savingErrorMessage = _this.getErrorMessage(error);
                    }).then(function () {
                        _this.loadingDocument = false;
                    });
                };
                DocumentExplorerComponent.prototype.onSubmitAccessPoint = function (data, $event) {
                    var _this = this;
                    $event.preventDefault();
                    var slug = data.slug;
                    var accessPoint = {
                        hasMemberRelation: data.hasMemberRelation
                    };
                    if (!!data.isMemberOfRelation)
                        accessPoint.isMemberOfRelation = data.isMemberOfRelation;
                    this.documentContext.documents.get(this.selectedDocumentURI).then(function (_a) {
                        var document = _a[0], response = _a[1];
                        return _this.documentsResolverService.createAccessPoint(document, accessPoint, slug);
                    }).then(function (document) {
                        _this.onRefreshNode.emit(_this.selectedDocumentURI);
                        _this.hideCreateAccessPointForm();
                        _this.onDisplaySuccessMessage.emit("<p>The Access Point was created correctly</p>");
                    }).catch(function (error) {
                        _this.savingErrorMessage = _this.getErrorMessage(error);
                    });
                };
                //</editor-fold>
                //<editor-fold desc="#region Delete child">
                DocumentExplorerComponent.prototype.deleteDocument = function () {
                    var _this = this;
                    this.documentsResolverService.delete(this.documentContext, this.selectedDocumentURI).then(function (result) {
                        _this.refreshNode(_this.getParentURI(_this.selectedDocumentURI));
                        _this.hideDeleteDocumentForm();
                    }).catch(function (error) {
                        _this.savingErrorMessage = _this.getErrorMessage(error);
                    });
                };
                DocumentExplorerComponent.prototype.getParentURI = function (documentURI) {
                    var slug = URI.Util.getSlug(documentURI), slugIdx = documentURI.indexOf(slug);
                    return documentURI.substr(0, slugIdx);
                };
                //</editor-fold>
                // Start:Error Handling
                DocumentExplorerComponent.prototype.clearSavingError = function () {
                    this.savingErrorMessage = null;
                };
                DocumentExplorerComponent.prototype.handleExternalError = function (error) {
                    this.messages.push(this.getErrorMessage(error));
                };
                DocumentExplorerComponent.prototype.getErrorMessage = function (error) {
                    var errorMessage = {
                        title: "",
                        content: "",
                        statusCode: "",
                        statusMessage: "",
                        endpoint: ""
                    };
                    errorMessage.title = error.hasOwnProperty("name") ? error.name : "";
                    errorMessage.content = error.hasOwnProperty("message") ? error.message : "";
                    // If it's a HTTP error
                    if (error.hasOwnProperty("statusCode")) {
                        errorMessage.content = errorMessage.content === "" ? this.getFriendlyHTTPMessage(error) : errorMessage.content;
                        errorMessage.statusCode = error.hasOwnProperty("message") ? "" + error.statusCode : "";
                        errorMessage.statusMessage = error.response.request.statusText;
                        errorMessage.title = errorMessage.statusMessage;
                        errorMessage.endpoint = error.response.request.responseURL;
                        if (!!error.response.data)
                            this.getErrors(error).then(function (errors) { errorMessage["errors"] = errors; });
                    }
                    else if (error.hasOwnProperty("stack")) {
                        // If it's an uncaught exception
                        errorMessage.title = error.message;
                        errorMessage.stack = error.stack;
                    }
                    return errorMessage;
                };
                DocumentExplorerComponent.prototype.getErrors = function (error) {
                    var parser = new JSONLDParser.Class();
                    var mainError = {};
                    var errors = [];
                    return parser.parse(error.response.data).then(function (mainErrors) {
                        mainError = mainErrors.find(function (error) { return error["@type"].indexOf("https://carbonldp.com/ns/v1/platform#ErrorResponse") !== -1; });
                        errors = mainErrors.filter(function (error) { return error["@type"].indexOf("https://carbonldp.com/ns/v1/platform#Error") !== -1; });
                        return errors;
                    });
                };
                DocumentExplorerComponent.prototype.getFriendlyHTTPMessage = function (error) {
                    var tempMessage = "";
                    switch (true) {
                        case error instanceof HTTP.Errors.ForbiddenError:
                            tempMessage = "Forbidden Action.";
                            break;
                        case error instanceof HTTP.Errors.NotFoundError:
                            tempMessage = "Couldn't found the requested resource.";
                            break;
                        case error instanceof HTTP.Errors.UnauthorizedError:
                            tempMessage = "Unauthorized operation.";
                            break;
                        case error instanceof HTTP.Errors.InternalServerErrorError:
                            tempMessage = "An internal error occurred while trying to fetch the resource. Please try again later. Error: " + error.response.status;
                            break;
                        case error instanceof HTTP.Errors.ServiceUnavailableError:
                            tempMessage = "Service currently unavailable.";
                            break;
                        case error instanceof HTTP.Errors.UnknownError:
                            // TODO: Check if the UnknownError is due to a bad CORS configuration.
                            tempMessage = "An error occurred while trying to fetch the resource content. This could be caused by a missing allowed domain for your App. Please, make sure this is not the case and try again later.";
                            break;
                        default:
                            tempMessage = "There was a problem processing the request. Error: " + error.response.status;
                            break;
                    }
                    return tempMessage;
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
