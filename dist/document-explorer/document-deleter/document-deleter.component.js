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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SDKContext = require("carbonldp/SDKContext");
var documents_resolver_service_1 = require("../documents-resolver.service");
var document_explorer_library_1 = require("carbonldp-panel/document-explorer/document-explorer-library");
var error_message_generator_1 = require("carbonldp-panel/messages-area/error/error-message-generator");
require("semantic-ui/semantic");
var DocumentDeleterComponent = (function () {
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
    return DocumentDeleterComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", SDKContext.Class)
], DocumentDeleterComponent.prototype, "context", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DocumentDeleterComponent.prototype, "documentURI", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DocumentDeleterComponent.prototype, "onSuccess", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DocumentDeleterComponent.prototype, "onError", void 0);
DocumentDeleterComponent = __decorate([
    core_1.Component({
        selector: "cp-document-deleter",
        templateUrl: "./document-deleter.component.html",
        styleUrls: ["./document-deleter.component.scss"],
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, documents_resolver_service_1.DocumentsResolverService])
], DocumentDeleterComponent);
exports.DocumentDeleterComponent = DocumentDeleterComponent;
