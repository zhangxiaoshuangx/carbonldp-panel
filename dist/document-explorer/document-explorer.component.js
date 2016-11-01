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
                function DocumentExplorerComponent(element, documentsResolverService) {
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
                }
                DocumentExplorerComponent.prototype.ngAfterViewInit = function () {
                    this.$element = $(this.element.nativeElement);
                    this.$createChildSuccessMessage = this.$element.find(".success.createchild.message");
                    this.$createDocumentDimmer = this.$element.find(".create.document.dimmer").dimmer({ closable: false });
                    this.$deleteDocumentDimmer = this.$element.find(".delete.document.dimmer").dimmer({ closable: false });
                    this.$createAccessPointDimmer = this.$element.find(".create.accesspoint.dimmer").dimmer({ closable: false });
                    this.$createChildForm = this.$element.find(".createchild.form");
                    this.$createChildForm.find(".advancedoptions.accordion").accordion();
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
                        _this.inspectingDocument = document[0];
                        _this.loadingDocument = false;
                    });
                };
                DocumentExplorerComponent.prototype.handleError = function (error) {
                    var errorMessage;
                    if (error.response)
                        errorMessage = this.getHTTPErrorMessage(error, this.getErrorMessage(error));
                    else {
                        errorMessage = {
                            title: error.name,
                            content: JSON.stringify(error)
                        };
                    }
                    this.messages.push(errorMessage);
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
                DocumentExplorerComponent.prototype.showCreateChildForm = function () {
                    this.$createDocumentDimmer.dimmer("show");
                };
                DocumentExplorerComponent.prototype.showCreateAccessPointForm = function () {
                    this.$createAccessPointDimmer.dimmer("show");
                };
                DocumentExplorerComponent.prototype.hideCreateChildForm = function () {
                    this.$createDocumentDimmer.dimmer("hide");
                    this.clearSavingError();
                    this.createChildFormModel.slug = "";
                    this.createChildFormModel.advancedOptions.hasMemberRelation = "http://www.w3.org/ns/ldp#member";
                    this.createChildFormModel.advancedOptions.isMemberOfRelation = "";
                };
                DocumentExplorerComponent.prototype.hideCreateAccessPointForm = function () {
                    this.$createAccessPointDimmer.dimmer("hide");
                    this.clearSavingError();
                    this.createAccessPointFormModel.slug = "";
                    this.createAccessPointFormModel.hasMemberRelation = "http://www.w3.org/ns/ldp#member";
                    this.createAccessPointFormModel.isMemberOfRelation = "";
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
                DocumentExplorerComponent.prototype.createChild = function () {
                    var _this = this;
                    var childSlug = null;
                    if (!!this.createChildFormModel.slug)
                        childSlug = this.createChildFormModel.slug + ((this.createChildFormModel.slug.endsWith("/") && this.createChildFormModel.slug.trim() !== "") ? "/" : "");
                    var childContent = {
                        hasMemberRelation: this.createChildFormModel.advancedOptions.hasMemberRelation
                    };
                    if (!!this.createChildFormModel.advancedOptions.isMemberOfRelation)
                        childContent["isMemberOfRelation"] = this.createChildFormModel.advancedOptions.isMemberOfRelation;
                    this.loadingDocument = true;
                    this.documentsResolverService.createChild(this.documentContext, this.selectedDocumentURI, childContent, childSlug).then(function (createdChild) {
                        _this.onRefreshNode.emit(_this.selectedDocumentURI);
                        _this.hideCreateChildForm();
                        _this.onDisplaySuccessMessage.emit("createchild");
                    }).catch(function (error) {
                        _this.savingErrorMessage = {
                            title: error.name,
                            content: error.message,
                            statusCode: "" + error.statusCode,
                            statusMessage: error.response.request.statusText,
                            endpoint: error.response.request.responseURL,
                        };
                        if (!!error.response.data) {
                            _this.getErrors(error).then(function (errors) {
                                _this.savingErrorMessage["errors"] = errors;
                            });
                        }
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
                        _this.onDisplaySuccessMessage.emit("createchild");
                    }).catch(function (error) {
                        _this.savingErrorMessage = {
                            title: error.name,
                            content: error.message,
                            statusCode: "" + error.statusCode,
                            statusMessage: error.response.request.statusText,
                            endpoint: error.response.request.responseURL,
                        };
                        if (!!error.response.data) {
                            _this.getErrors(error).then(function (errors) {
                                _this.savingErrorMessage["errors"] = errors;
                            });
                        }
                    });
                };
                DocumentExplorerComponent.prototype.clearSavingError = function () {
                    this.savingErrorMessage = null;
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
                //</editor-fold>
                //<editor-fold desc="#region Delete child">
                DocumentExplorerComponent.prototype.deleteDocument = function () {
                    var _this = this;
                    this.documentsResolverService.delete(this.documentContext, this.selectedDocumentURI).then(function (result) {
                        _this.refreshNode(_this.getParentURI(_this.selectedDocumentURI));
                        _this.cancelDeletion();
                    }).catch(function (error) {
                        _this.savingErrorMessage = {
                            title: error.name,
                            content: error.message,
                            statusCode: "" + error.statusCode,
                            statusMessage: error.response.request.statusText,
                            endpoint: error.response.request.responseURL,
                        };
                        if (!!error.response.data) {
                            _this.getErrors(error).then(function (errors) {
                                _this.savingErrorMessage["errors"] = errors;
                            });
                        }
                    });
                };
                DocumentExplorerComponent.prototype.cancelDeletion = function () {
                    this.$deleteDocumentDimmer.dimmer("hide");
                };
                DocumentExplorerComponent.prototype.showDeleteChildForm = function () {
                    this.$deleteDocumentDimmer.dimmer("show");
                };
                DocumentExplorerComponent.prototype.getParentURI = function (documentURI) {
                    var slug = URI.Util.getSlug(documentURI), slugIdx = documentURI.indexOf(slug);
                    return documentURI.substr(0, slugIdx);
                };
                //</editor-fold>
                DocumentExplorerComponent.prototype.getHTTPErrorMessage = function (error, content) {
                    return {
                        title: error.name,
                        content: content + (!!error.message ? (" Reason: " + error.message) : ""),
                        endpoint: error.response.request.responseURL,
                        statusCode: "" + error.response.request.status + " - RequestID: " + error.requestID,
                        statusMessage: error.response.request.statusText
                    };
                };
                DocumentExplorerComponent.prototype.getErrorMessage = function (error) {
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
                    __metadata('design:paramtypes', [core_1.ElementRef, documents_resolver_service_1.DocumentsResolverService])
                ], DocumentExplorerComponent);
                return DocumentExplorerComponent;
            }());
            exports_1("DocumentExplorerComponent", DocumentExplorerComponent);
            exports_1("default",DocumentExplorerComponent);
        }
    }
});

//# sourceMappingURL=document-explorer.component.js.map
