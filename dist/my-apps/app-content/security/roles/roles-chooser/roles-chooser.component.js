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
var core_1 = require("@angular/core");
var App = require("carbonldp/App");
var roles_service_1 = require("../roles.service");
var roles_chooser_component_html_1 = require("./roles-chooser.component.html!");
var roles_chooser_component_css_text_1 = require("./roles-chooser.component.css!text");
var RolesChooserComponent = (function () {
    function RolesChooserComponent(element, rolesService) {
        this.availableRoles = [];
        this._selectedRoles = [];
        this.bordered = true;
        this.onChangeSelection = new core_1.EventEmitter();
        this.element = element;
        this.$element = $(element.nativeElement);
        this.rolesService = rolesService;
    }
    Object.defineProperty(RolesChooserComponent.prototype, "selectedRoles", {
        get: function () {
            return this._selectedRoles;
        },
        set: function (value) {
            var selectedRoles = [];
            value.forEach(function (selectedRole) {
                selectedRoles.push(selectedRole);
            });
            this._selectedRoles = selectedRoles;
        },
        enumerable: true,
        configurable: true
    });
    RolesChooserComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.rolesService.getAll(this.appContext).then(function (roles) {
            _this.availableRoles = roles;
        }).then(function () {
            setTimeout(function () { _this.$element.find(".ui.checkbox").checkbox(); });
        });
    };
    RolesChooserComponent.prototype.hasRole = function (role, list) {
        return list.findIndex(function (persistedRole) { return role === persistedRole.id; }) !== -1;
    };
    RolesChooserComponent.prototype.onClickRole = function (role, evt) {
        evt.stopPropagation();
        this.selectRole(role);
    };
    RolesChooserComponent.prototype.selectRole = function (role) {
        var idx = this.selectedRoles.findIndex(function (persistedRole) { return role.id === persistedRole.id; });
        if (idx === -1)
            this.selectedRoles.push(role);
        else
            this.selectedRoles.splice(idx, 1);
        this.onChangeSelection.emit(this.selectedRoles);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array), 
        __metadata('design:paramtypes', [Array])
    ], RolesChooserComponent.prototype, "selectedRoles", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', App.Context)
    ], RolesChooserComponent.prototype, "appContext", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], RolesChooserComponent.prototype, "bordered", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], RolesChooserComponent.prototype, "onChangeSelection", void 0);
    RolesChooserComponent = __decorate([
        core_1.Component({
            selector: "cp-roles-chooser",
            template: roles_chooser_component_html_1.default,
            styles: [roles_chooser_component_css_text_1.default],
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, roles_service_1.RolesService])
    ], RolesChooserComponent);
    return RolesChooserComponent;
}());
exports.RolesChooserComponent = RolesChooserComponent;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RolesChooserComponent;

//# sourceMappingURL=roles-chooser.component.js.map
