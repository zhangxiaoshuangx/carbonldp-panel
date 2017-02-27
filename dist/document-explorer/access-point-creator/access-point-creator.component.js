System.register(["@angular/core", "carbonldp/SDKContext", "../documents-resolver.service", "carbonldp-panel/document-explorer/document-explorer-library", "carbonldp-panel/messages-area/error/error-message-generator", "semantic-ui/semantic", "./access-point-creator.component.html!"], function(exports_1, context_1) {
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
    var core_1, SDKContext, documents_resolver_service_1, document_explorer_library_1, error_message_generator_1, access_point_creator_component_html_1;
    var AccessPointCreatorComponent;
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
            function (access_point_creator_component_html_1_1) {
                access_point_creator_component_html_1 = access_point_creator_component_html_1_1;
            }],
        execute: function() {
            AccessPointCreatorComponent = (function () {
                function AccessPointCreatorComponent(element, documentsResolverService) {
                    this.visible = true;
                    this.createAccessPointFormModel = {
                        slug: "",
                        hasMemberRelation: "",
                        isMemberOfRelation: ""
                    };
                    this.parentURI = "";
                    this.onSuccess = new core_1.EventEmitter();
                    this.onError = new core_1.EventEmitter();
                    this.element = element;
                    this.documentsResolverService = documentsResolverService;
                }
                AccessPointCreatorComponent.prototype.ngAfterViewInit = function () {
                    this.$element = $(this.element.nativeElement);
                    this.$createAccessPointModal = this.$element.find(".create.accesspoint.modal").modal({ closable: false });
                };
                AccessPointCreatorComponent.prototype.onSubmitAccessPoint = function (data, $event, form) {
                    var _this = this;
                    $event.preventDefault();
                    var slug = data.slug;
                    var accessPoint = {
                        hasMemberRelation: data.hasMemberRelation
                    };
                    if (!!data.isMemberOfRelation)
                        accessPoint.isMemberOfRelation = data.isMemberOfRelation;
                    this.context.documents.get(this.parentURI).then(function (_a) {
                        var document = _a[0], response = _a[1];
                        return _this.documentsResolverService.createAccessPoint(document, accessPoint, slug);
                    }).then(function (document) {
                        _this.onSuccess.emit(document);
                        form.resetForm();
                        _this.hide();
                    }).catch(function (error) {
                        _this.onError.emit(error);
                        _this.errorMessage = error_message_generator_1.ErrorMessageGenerator.getErrorMessage(error);
                    });
                };
                AccessPointCreatorComponent.prototype.clearErrorMessage = function () {
                    this.errorMessage = null;
                };
                AccessPointCreatorComponent.prototype.getSanitizedSlug = function (slug) {
                    return document_explorer_library_1.DocumentExplorerLibrary.getSanitizedSlug(slug);
                };
                AccessPointCreatorComponent.prototype.slugLostFocus = function (evt) {
                    evt.target.value = document_explorer_library_1.DocumentExplorerLibrary.getAppendedSlashSlug(evt.target.value);
                };
                AccessPointCreatorComponent.prototype.show = function () {
                    this.$createAccessPointModal.modal("show");
                };
                AccessPointCreatorComponent.prototype.hide = function () {
                    this.hideForm();
                };
                AccessPointCreatorComponent.prototype.hideForm = function () {
                    this.$createAccessPointModal.modal("hide");
                    this.clearErrorMessage();
                    this.createAccessPointFormModel.slug = "";
                    this.createAccessPointFormModel.hasMemberRelation = "";
                    this.createAccessPointFormModel.isMemberOfRelation = "";
                };
                AccessPointCreatorComponent.prototype.toggle = function () {
                    this.$createAccessPointModal.modal("toggle");
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', SDKContext.Class)
                ], AccessPointCreatorComponent.prototype, "context", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], AccessPointCreatorComponent.prototype, "parentURI", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], AccessPointCreatorComponent.prototype, "onSuccess", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], AccessPointCreatorComponent.prototype, "onError", void 0);
                AccessPointCreatorComponent = __decorate([
                    core_1.Component({
                        selector: "cp-access-point-creator",
                        template: access_point_creator_component_html_1.default,
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, documents_resolver_service_1.DocumentsResolverService])
                ], AccessPointCreatorComponent);
                return AccessPointCreatorComponent;
            }());
            exports_1("AccessPointCreatorComponent", AccessPointCreatorComponent);
            exports_1("default",AccessPointCreatorComponent);
        }
    }
});

//# sourceMappingURL=access-point-creator.component.js.map
