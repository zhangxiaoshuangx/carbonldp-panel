System.register(["@angular/core", "carbonldp/SDKContext", "../documents-resolver.service", "carbonldp-panel/errors-area/error-message-generator", "carbonldp-panel/document-explorer/document-explorer-library", "semantic-ui/semantic", "./document-deleter.component.html!", "./document-deleter.component.css!text"], function(exports_1, context_1) {
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
    var core_1, SDKContext, documents_resolver_service_1, error_message_generator_1, document_explorer_library_1, document_deleter_component_html_1, document_deleter_component_css_text_1;
    var DocumentDeleterComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (SDKContext_1) {
                SDKContext = SDKContext_1;
            },
            function (documents_resolver_service_1_1) {
                documents_resolver_service_1 = documents_resolver_service_1_1;
            },
            function (error_message_generator_1_1) {
                error_message_generator_1 = error_message_generator_1_1;
            },
            function (document_explorer_library_1_1) {
                document_explorer_library_1 = document_explorer_library_1_1;
            },
            function (_1) {},
            function (document_deleter_component_html_1_1) {
                document_deleter_component_html_1 = document_deleter_component_html_1_1;
            },
            function (document_deleter_component_css_text_1_1) {
                document_deleter_component_css_text_1 = document_deleter_component_css_text_1_1;
            }],
        execute: function() {
            DocumentDeleterComponent = (function () {
                function DocumentDeleterComponent(element, documentsResolverService) {
                    this.deleteDocumentFormModel = {};
                    this.documentURI = "";
                    this.onSuccess = new core_1.EventEmitter();
                    this.onError = new core_1.EventEmitter();
                    this.element = element;
                    this.documentsResolverService = documentsResolverService;
                }
                DocumentDeleterComponent.prototype.ngAfterViewInit = function () {
                    this.$element = $(this.element.nativeElement);
                    this.$deleteDocumentModal = this.$element.find(".delete.document.modal").modal({ closable: false });
                };
                DocumentDeleterComponent.prototype.onSubmitDeleteDocument = function (data, $event) {
                    var _this = this;
                    this.documentsResolverService.delete(this.context, this.documentURI).then(function (result) {
                        _this.onSuccess.emit(document_explorer_library_1.DocumentExplorerLibrary.getParentURI(_this.documentURI));
                        _this.hide();
                    }).catch(function (error) {
                        _this.onError.emit(error);
                        _this.errorMessage = error_message_generator_1.ErrorMessageGenerator.getErrorMessage(error);
                    });
                };
                DocumentDeleterComponent.prototype.clearErrorMessage = function () {
                    this.errorMessage = null;
                };
                DocumentDeleterComponent.prototype.show = function () {
                    this.$deleteDocumentModal.modal("show");
                };
                DocumentDeleterComponent.prototype.hide = function () {
                    this.hideDeleteDocumentForm();
                };
                DocumentDeleterComponent.prototype.hideDeleteDocumentForm = function () {
                    this.$deleteDocumentModal.modal("hide");
                    this.clearErrorMessage();
                };
                DocumentDeleterComponent.prototype.toggle = function () {
                    this.$deleteDocumentModal.modal("toggle");
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', SDKContext.Class)
                ], DocumentDeleterComponent.prototype, "context", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], DocumentDeleterComponent.prototype, "documentURI", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], DocumentDeleterComponent.prototype, "onSuccess", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], DocumentDeleterComponent.prototype, "onError", void 0);
                DocumentDeleterComponent = __decorate([
                    core_1.Component({
                        selector: "cp-document-deleter",
                        template: document_deleter_component_html_1.default,
                        styles: [document_deleter_component_css_text_1.default],
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, documents_resolver_service_1.DocumentsResolverService])
                ], DocumentDeleterComponent);
                return DocumentDeleterComponent;
            }());
            exports_1("DocumentDeleterComponent", DocumentDeleterComponent);
            exports_1("default",DocumentDeleterComponent);
        }
    }
});

//# sourceMappingURL=document-deleter.component.js.map
