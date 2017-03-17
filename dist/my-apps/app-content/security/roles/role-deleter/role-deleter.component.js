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
var App = require("carbonldp/App");
var error_message_generator_1 = require("carbonldp-panel/messages-area/error/error-message-generator");
var roles_service_1 = require("../roles.service");
require("semantic-ui/semantic");
var RoleDeleterComponent = (function () {
    function RoleDeleterComponent(element, rolesService) {
        this.errorMessages = [];
        this.deletingRole = false;
        this.onSuccess = new core_1.EventEmitter();
        this.onError = new core_1.EventEmitter();
        this.element = element;
        this.rolesService = rolesService;
    }
    RoleDeleterComponent.prototype.ngAfterViewInit = function () {
        this.$element = $(this.element.nativeElement);
        this.$deleteRoleModal = this.$element.find(".delete.role.modal").modal({
            closable: false,
            blurring: true,
            onApprove: function () { return false; },
        });
    };
    RoleDeleterComponent.prototype.onSubmitDeleteRole = function () {
        var _this = this;
        this.deletingRole = true;
        this.rolesService.getDescendants(this.appContext, this.role).then(function (rolesToDelete) {
            return rolesToDelete;
        }).then(function (rolesToDelete) {
            var promises = [];
            rolesToDelete.forEach(function (role) {
                promises.push(_this.deleteRole(role.id));
            });
            return Promise.all(promises);
        }, function (error) {
            var retrievalError = error_message_generator_1.ErrorMessageGenerator.getErrorMessage(error);
            retrievalError.title = retrievalError.title + " - An error occurred while trying to delete the descendants of the role.";
            _this.errorMessages.push(retrievalError);
            return Promise.reject(null);
        }).then(function () {
            _this.onSuccess.emit(_this.role);
            _this.hide();
        }).catch(function (error) {
            _this.onError.emit(error);
        }).then(function () {
            _this.deletingRole = false;
        });
    };
    RoleDeleterComponent.prototype.deleteRole = function (roleID) {
        var _this = this;
        return this.rolesService.delete(this.appContext, roleID).catch(function (error) {
            _this.errorMessages.push(error_message_generator_1.ErrorMessageGenerator.getErrorMessage(error));
            throw error;
        });
    };
    RoleDeleterComponent.prototype.clearErrorMessage = function () {
        this.errorMessages = [];
    };
    RoleDeleterComponent.prototype.removeErrorMessage = function (index) {
        this.errorMessages.splice(index, 1);
    };
    RoleDeleterComponent.prototype.show = function () {
        this.$deleteRoleModal.modal("show");
    };
    RoleDeleterComponent.prototype.hide = function () {
        this.hideDeleteRoleForm();
    };
    RoleDeleterComponent.prototype.hideDeleteRoleForm = function () {
        this.$deleteRoleModal.modal("hide");
        this.clearErrorMessage();
    };
    RoleDeleterComponent.prototype.toggle = function () {
        this.$deleteRoleModal.modal("toggle");
    };
    return RoleDeleterComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", App.Context)
], RoleDeleterComponent.prototype, "appContext", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], RoleDeleterComponent.prototype, "role", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], RoleDeleterComponent.prototype, "onSuccess", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], RoleDeleterComponent.prototype, "onError", void 0);
RoleDeleterComponent = __decorate([
    core_1.Component({
        selector: "cp-role-deleter",
        templateUrl: "./role-deleter.component.html",
        styleUrls: ["./role-deleter.component.scss"],
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, roles_service_1.RolesService])
], RoleDeleterComponent);
exports.RoleDeleterComponent = RoleDeleterComponent;
