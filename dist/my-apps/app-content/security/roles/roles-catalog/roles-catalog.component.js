System.register(["@angular/core", "carbonldp/App", "../roles-list/role.decorator", "./roles-catalog.component.html!"], function(exports_1, context_1) {
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
    var core_1, App, role_decorator_1, roles_catalog_component_html_1;
    var RolesCatalogComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (App_1) {
                App = App_1;
            },
            function (role_decorator_1_1) {
                role_decorator_1 = role_decorator_1_1;
            },
            function (roles_catalog_component_html_1_1) {
                roles_catalog_component_html_1 = roles_catalog_component_html_1_1;
            }],
        execute: function() {
            RolesCatalogComponent = (function () {
                function RolesCatalogComponent() {
                    this.view = "tree";
                    this.refresher = new core_1.EventEmitter();
                }
                RolesCatalogComponent.prototype.setView = function (view) {
                    this.view = view;
                };
                RolesCatalogComponent.prototype.refreshRoles = function () {
                    this.refresher.emit(true);
                };
                RolesCatalogComponent.prototype.changeLoadingState = function (state) {
                    this.loading = state;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', App.Context)
                ], RolesCatalogComponent.prototype, "appContext", void 0);
                RolesCatalogComponent = __decorate([
                    role_decorator_1.Log("hello"),
                    core_1.Component({
                        selector: "cp-roles-catalog",
                        template: roles_catalog_component_html_1.default,
                    }), 
                    __metadata('design:paramtypes', [])
                ], RolesCatalogComponent);
                return RolesCatalogComponent;
            }());
            exports_1("RolesCatalogComponent", RolesCatalogComponent);
            exports_1("default",RolesCatalogComponent);
        }
    }
});

//# sourceMappingURL=roles-catalog.component.js.map
