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
var router_1 = require("@angular/router");
var App = require("carbonldp/App");
var role_details_component_1 = require("../role-details/role-details.component");
var roles_service_1 = require("../roles.service");
var error_message_generator_1 = require("carbonldp-panel/messages-area/error/error-message-generator");
var RolesBrowserComponent = (function () {
    function RolesBrowserComponent(router, route, rolesService, zone) {
        this.hasRoleOnRoute = false;
        this.loading = false;
        this.messages = [];
        this.Modes = role_details_component_1.Modes;
        this.mode = role_details_component_1.Modes.READ;
        this.onRefresh = new core_1.EventEmitter();
        this.onDelete = new core_1.EventEmitter();
        this.rolesService = rolesService;
        this.zone = zone;
        this.router = router;
        this.activatedRoute = route;
    }
    RolesBrowserComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.data.forEach(function (data) {
            _this.activeRole = data.role;
            if (!!data.role)
                _this.hasRoleOnRoute = true;
        });
    };
    RolesBrowserComponent.prototype.resolveRole = function (roleID) {
        var _this = this;
        this.loading = true;
        new Promise(function (resolve, reject) {
            if (_this.hasRoleOnRoute) {
                _this.hasRoleOnRoute = false;
                resolve(_this.activeRole);
            }
            resolve(_this.rolesService.get(roleID, _this.appContext));
        }).then(function (role) {
            _this.zone.run(function () {
                _this.activeRole = role;
                _this.loading = false;
            });
        }).catch(function (error) {
            _this.handleError(error);
        }).then(function () {
            _this.loading = false;
        });
    };
    RolesBrowserComponent.prototype.onSuccessDelete = function (roleID) {
        this.onDelete.emit(roleID);
    };
    RolesBrowserComponent.prototype.onSuccessCreate = function (roleID) {
        this.onRefresh.emit(this.selectedRole);
    };
    RolesBrowserComponent.prototype.onSuccessEdit = function (roleID) {
        this.onRefresh.emit(roleID);
    };
    RolesBrowserComponent.prototype.handleError = function (error) {
        this.messages.push(error_message_generator_1.ErrorMessageGenerator.getErrorMessage(error));
    };
    return RolesBrowserComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", App.Context)
], RolesBrowserComponent.prototype, "appContext", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], RolesBrowserComponent.prototype, "onRefresh", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], RolesBrowserComponent.prototype, "onDelete", void 0);
RolesBrowserComponent = __decorate([
    core_1.Component({
        selector: "cp-roles-browser",
        templateUrl: "./roles-browser.component.html",
        styleUrls: ["./roles-browser.component.scss"],
    }),
    __metadata("design:paramtypes", [router_1.Router, router_1.ActivatedRoute, roles_service_1.RolesService, core_1.NgZone])
], RolesBrowserComponent);
exports.RolesBrowserComponent = RolesBrowserComponent;
