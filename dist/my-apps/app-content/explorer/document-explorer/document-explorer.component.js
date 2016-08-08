System.register(["@angular/core", "carbonldp/SDKContext", "carbonldp/HTTP", "./documents-resolver.service", "./document-viewer/document-viewer.component", "./document-tree-view/document-tree-view.component", "./../../../../errors-area/error-message.component", "semantic-ui/semantic", "./document-explorer.component.html!", "./document-explorer.component.css!text"], function(exports_1, context_1) {
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
    var core_1, SDKContext, HTTP, documents_resolver_service_1, document_viewer_component_1, document_tree_view_component_1, error_message_component_1, document_explorer_component_html_1, document_explorer_component_css_text_1;
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
            function (documents_resolver_service_1_1) {
                documents_resolver_service_1 = documents_resolver_service_1_1;
            },
            function (document_viewer_component_1_1) {
                document_viewer_component_1 = document_viewer_component_1_1;
            },
            function (document_tree_view_component_1_1) {
                document_tree_view_component_1 = document_tree_view_component_1_1;
            },
            function (error_message_component_1_1) {
                error_message_component_1 = error_message_component_1_1;
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
                function DocumentExplorerComponent(documentsResolverService) {
                    this.loadingDocument = false;
                    this.savingDocument = false;
                    this.messages = [];
                    this.documentsResolverService = documentsResolverService;
                }
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
                    __metadata('design:type', Object)
                ], DocumentExplorerComponent.prototype, "documentContext", void 0);
                DocumentExplorerComponent = __decorate([
                    core_1.Component({
                        selector: "cp-document-explorer",
                        template: document_explorer_component_html_1.default,
                        styles: [document_explorer_component_css_text_1.default],
                        directives: [document_tree_view_component_1.DocumentTreeViewComponent, document_viewer_component_1.DocumentViewerComponent, error_message_component_1.ErrorMessageComponent],
                    }), 
                    __metadata('design:paramtypes', [documents_resolver_service_1.DocumentsResolverService])
                ], DocumentExplorerComponent);
                return DocumentExplorerComponent;
            }());
            exports_1("DocumentExplorerComponent", DocumentExplorerComponent);
            exports_1("default",DocumentExplorerComponent);
        }
    }
});

//# sourceMappingURL=document-explorer.component.js.map
