System.register(["@angular/core", "@angular/router", "carbonldp/App", "carbonldp/RDF/URI", "../roles.service", "carbonldp-panel/errors-area/error-message-generator", "./roles-list.component.html!", "./roles-list.component.css!text"], function(exports_1, context_1) {
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
    var core_1, router_1, App, URI, roles_service_1, error_message_generator_1, roles_list_component_html_1, roles_list_component_css_text_1;
    var RolesListComponent, RoleDetailsModes;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (App_1) {
                App = App_1;
            },
            function (URI_1) {
                URI = URI_1;
            },
            function (roles_service_1_1) {
                roles_service_1 = roles_service_1_1;
            },
            function (error_message_generator_1_1) {
                error_message_generator_1 = error_message_generator_1_1;
            },
            function (roles_list_component_html_1_1) {
                roles_list_component_html_1 = roles_list_component_html_1_1;
            },
            function (roles_list_component_css_text_1_1) {
                roles_list_component_css_text_1 = roles_list_component_css_text_1_1;
            }],
        execute: function() {
            RolesListComponent = (function () {
                function RolesListComponent(router, route, rolesService) {
                    this.roles = [];
                    this._loading = false;
                    this.activePage = 0;
                    this.totalRoles = 0;
                    this.rolesPerPage = 5;
                    this.headers = [{ name: "Name", value: "name" }, { name: "Created", value: "created" }, { name: "Modified", value: "modified" }];
                    this.sortedColumn = "name";
                    this.ascending = false;
                    this.onLoading = new core_1.EventEmitter();
                    this.router = router;
                    this.route = route;
                    this.rolesService = rolesService;
                }
                Object.defineProperty(RolesListComponent.prototype, "loading", {
                    get: function () {
                        return this._loading;
                    },
                    set: function (value) {
                        this._loading = value;
                        this.onLoading.emit(this.loading);
                    },
                    enumerable: true,
                    configurable: true
                });
                ;
                ;
                RolesListComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.refresher.subscribe(function (canRefresh) {
                        if (canRefresh)
                            _this.loadRoles();
                    });
                    this.loadRoles();
                };
                RolesListComponent.prototype.loadRoles = function () {
                    var _this = this;
                    this.loading = true;
                    this.getNumberOfRoles().then(function (amount) {
                        _this.totalRoles = amount;
                        return _this.getRoles();
                    }).then(function (roles) {
                        _this.roles = roles;
                    }).catch(function (error) {
                        console.error(error);
                        _this.errorMessage = error_message_generator_1.ErrorMessageGenerator.getErrorMessage(error);
                    }).then(function () {
                        _this.loading = false;
                    });
                };
                RolesListComponent.prototype.getRoles = function () {
                    return this.rolesService.getAll(this.appContext, this.rolesPerPage, this.activePage, this.sortedColumn, this.ascending);
                };
                RolesListComponent.prototype.openRole = function (event, role) {
                    event.stopPropagation();
                    this.goToRole(role);
                };
                RolesListComponent.prototype.onClickEditRole = function (event, role) {
                    event.stopPropagation();
                    this.goToRole(role, true);
                };
                RolesListComponent.prototype.goToRole = function (role, edit) {
                    var slug = URI.Util.getSlug(role.id);
                    var extras = { relativeTo: this.route };
                    if (edit)
                        extras.queryParams = { mode: RoleDetailsModes.EDIT };
                    this.router.navigate([slug], extras);
                };
                RolesListComponent.prototype.refreshRoles = function () {
                    this.loadRoles();
                };
                RolesListComponent.prototype.onClickDeleteRole = function (event, role) {
                    event.stopPropagation();
                    this.deletingRole = role;
                };
                RolesListComponent.prototype.getNumberOfRoles = function () {
                    return this.rolesService.getNumberOfRoles(this.appContext);
                };
                RolesListComponent.prototype.changePage = function (page) {
                    this.activePage = page;
                    this.loadRoles();
                };
                RolesListComponent.prototype.changeRolesPerPage = function (rolesPerPage) {
                    this.rolesPerPage = rolesPerPage;
                    this.loadRoles();
                };
                RolesListComponent.prototype.sortColumn = function (header) {
                    if (this.sortedColumn === header.value)
                        this.ascending = !this.ascending;
                    this.sortedColumn = header.value;
                    this.loadRoles();
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', App.Context)
                ], RolesListComponent.prototype, "appContext", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], RolesListComponent.prototype, "refresher", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], RolesListComponent.prototype, "onLoading", void 0);
                RolesListComponent = __decorate([
                    core_1.Component({
                        selector: "cp-roles-list",
                        template: roles_list_component_html_1.default,
                        styles: [roles_list_component_css_text_1.default],
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, roles_service_1.RolesService])
                ], RolesListComponent);
                return RolesListComponent;
            }());
            exports_1("RolesListComponent", RolesListComponent);
            RoleDetailsModes = (function () {
                function RoleDetailsModes() {
                }
                RoleDetailsModes.READ = "READ";
                RoleDetailsModes.EDIT = "EDIT";
                RoleDetailsModes.CREATE = "CREATE";
                return RoleDetailsModes;
            }());
            exports_1("RoleDetailsModes", RoleDetailsModes);
            exports_1("default",RolesListComponent);
        }
    }
});

//# sourceMappingURL=roles-list.component.js.map
