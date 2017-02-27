System.register(["@angular/core", "carbonldp/SDKContext", "../documents-resolver.service", "carbonldp-panel/document-explorer/document-explorer-library", "carbonldp-panel/messages-area/error/error-message-generator", "semantic-ui/semantic", "./document-creator.component.html!"], function(exports_1, context_1) {
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
    var core_1, SDKContext, documents_resolver_service_1, document_explorer_library_1, error_message_generator_1, document_creator_component_html_1;
    var DocumentCreatorComponent;
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
            function (document_explorer_library_1_1) {
                document_explorer_library_1 = document_explorer_library_1_1;
            },
            function (error_message_generator_1_1) {
                error_message_generator_1 = error_message_generator_1_1;
            },
            function (_1) {},
            function (document_creator_component_html_1_1) {
                document_creator_component_html_1 = document_creator_component_html_1_1;
            }],
        execute: function() {
            DocumentCreatorComponent = (function () {
                function DocumentCreatorComponent(element, documentsResolverService) {
                    this.createChildFormModel = {
                        slug: "",
                        advancedOptions: {
                            hasMemberRelation: "http://www.w3.org/ns/ldp#member",
                            isMemberOfRelation: ""
                        }
                    };
                    this.parentURI = "";
                    this.onSuccess = new core_1.EventEmitter();
                    this.onError = new core_1.EventEmitter();
                    this.element = element;
                    this.documentsResolverService = documentsResolverService;
                }
                DocumentCreatorComponent.prototype.ngAfterViewInit = function () {
                    this.$element = $(this.element.nativeElement);
                    this.$createDocumentModal = this.$element.find(".create.document.modal").modal({ closable: false });
                    this.$createDocumentModal.find(".advancedoptions.accordion").accordion();
                };
                DocumentCreatorComponent.prototype.onSubmitCreateChild = function (data, $event) {
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
                    this.documentsResolverService.createChild(this.context, this.parentURI, childContent, childSlug).then(function (createdChild) {
                        _this.onSuccess.emit(createdChild);
                        _this.hide();
                    }).catch(function (error) {
                        _this.onError.emit(error);
                        _this.errorMessage = error_message_generator_1.ErrorMessageGenerator.getErrorMessage(error);
                    });
                };
                DocumentCreatorComponent.prototype.clearErrorMessage = function () {
                    this.errorMessage = null;
                };
                DocumentCreatorComponent.prototype.getSanitizedSlug = function (slug) {
                    return document_explorer_library_1.DocumentExplorerLibrary.getSanitizedSlug(slug);
                };
                DocumentCreatorComponent.prototype.slugLostFocus = function (evt) {
                    evt.target.value = document_explorer_library_1.DocumentExplorerLibrary.getAppendedSlashSlug(evt.target.value);
                };
                DocumentCreatorComponent.prototype.show = function () {
                    this.$createDocumentModal.modal("show");
                };
                DocumentCreatorComponent.prototype.hide = function () {
                    this.hideForm();
                };
                DocumentCreatorComponent.prototype.hideForm = function () {
                    this.$createDocumentModal.modal("hide");
                    this.clearErrorMessage();
                    this.createChildFormModel.slug = "";
                    this.createChildFormModel.advancedOptions.hasMemberRelation = "http://www.w3.org/ns/ldp#member";
                    this.createChildFormModel.advancedOptions.isMemberOfRelation = "";
                };
                DocumentCreatorComponent.prototype.toggle = function () {
                    this.$createDocumentModal.modal("toggle");
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', SDKContext.Class)
                ], DocumentCreatorComponent.prototype, "context", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], DocumentCreatorComponent.prototype, "parentURI", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], DocumentCreatorComponent.prototype, "onSuccess", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], DocumentCreatorComponent.prototype, "onError", void 0);
                DocumentCreatorComponent = __decorate([
                    core_1.Component({
                        selector: "cp-document-creator",
                        template: document_creator_component_html_1.default,
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, documents_resolver_service_1.DocumentsResolverService])
                ], DocumentCreatorComponent);
                return DocumentCreatorComponent;
            }());
            exports_1("DocumentCreatorComponent", DocumentCreatorComponent);
            exports_1("default",DocumentCreatorComponent);
        }
    }
});

//# sourceMappingURL=document-creator.component.js.map
