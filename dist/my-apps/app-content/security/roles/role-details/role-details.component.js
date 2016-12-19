System.register(["@angular/core", "carbonldp/App", "carbonldp/Auth/PersistedRole", "./../roles.service", "carbonldp-panel/document-explorer/document-explorer-library", "./role-details.component.html!", "./role-details.component.css!text"], function(exports_1, context_1) {
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
    var core_1, App, PersistedRole, roles_service_1, document_explorer_library_1, role_details_component_html_1, role_details_component_css_text_1;
    var RoleDetailsComponent, Modes;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (App_1) {
                App = App_1;
            },
            function (PersistedRole_1) {
                PersistedRole = PersistedRole_1;
            },
            function (roles_service_1_1) {
                roles_service_1 = roles_service_1_1;
            },
            function (document_explorer_library_1_1) {
                document_explorer_library_1 = document_explorer_library_1_1;
            },
            function (role_details_component_html_1_1) {
                role_details_component_html_1 = role_details_component_html_1_1;
            },
            function (role_details_component_css_text_1_1) {
                role_details_component_css_text_1 = role_details_component_css_text_1_1;
            }],
        execute: function() {
            RoleDetailsComponent = (function () {
                function RoleDetailsComponent(rolesService) {
                    this.Modes = Modes;
                    this.roleFormModel = {
                        slug: "",
                        name: "",
                        description: "",
                        parentRole: "",
                    };
                    this.availableRoles = [];
                    this.mode = Modes.READ;
                    this.onClose = new core_1.EventEmitter();
                    this.onSuccess = new core_1.EventEmitter();
                    this.onError = new core_1.EventEmitter();
                    this.rolesService = rolesService;
                }
                RoleDetailsComponent.prototype.ngAfterViewInit = function () {
                    var _this = this;
                    this.getAllRoles().then(function (roles) {
                        _this.availableRoles = roles;
                    });
                };
                RoleDetailsComponent.prototype.changeMode = function (mode) {
                    this.mode = mode;
                };
                RoleDetailsComponent.prototype.onSubmit = function (data, $event) {
                    $event.preventDefault();
                    console.log(data);
                    // switch( this.mode ) {
                    // 	case Modes.EDIT:
                    // 		this.editAgent( this.agent, data );
                    // 		break;
                    // 	case Modes.CREATE:
                    // 		this.createAgent( this.agent, data );
                    // 		break;
                    // }
                };
                RoleDetailsComponent.prototype.getSanitizedSlug = function (slug) {
                    return document_explorer_library_1.DocumentExplorerLibrary.getSanitizedSlug(slug);
                };
                RoleDetailsComponent.prototype.slugLostFocus = function (evt) {
                    evt.target.value = document_explorer_library_1.DocumentExplorerLibrary.getAppendedSlashSlug(evt.target.value);
                };
                RoleDetailsComponent.prototype.getAllRoles = function () {
                    return this.rolesService.getAll(this.appContext);
                };
                RoleDetailsComponent.prototype.changeRoles = function (selectedRoles) {
                    var _this = this;
                    this.roleFormModel.parentRole = null;
                    selectedRoles.forEach(function (selectedRole) {
                        _this.roleFormModel.parentRole = selectedRole.id;
                    });
                };
                RoleDetailsComponent.prototype.cancelForm = function () {
                    if (this.mode === Modes.CREATE) {
                        this.close();
                    }
                    else {
                        this.mode = Modes.READ;
                    }
                };
                RoleDetailsComponent.prototype.close = function () {
                    this.onClose.emit(true);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], RoleDetailsComponent.prototype, "mode", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], RoleDetailsComponent.prototype, "role", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', App.Context)
                ], RoleDetailsComponent.prototype, "appContext", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], RoleDetailsComponent.prototype, "onClose", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], RoleDetailsComponent.prototype, "onSuccess", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], RoleDetailsComponent.prototype, "onError", void 0);
                RoleDetailsComponent = __decorate([
                    core_1.Component({
                        selector: "cp-role-details",
                        template: role_details_component_html_1.default,
                        styles: [role_details_component_css_text_1.default],
                    }), 
                    __metadata('design:paramtypes', [roles_service_1.RolesService])
                ], RoleDetailsComponent);
                return RoleDetailsComponent;
            }());
            exports_1("RoleDetailsComponent", RoleDetailsComponent);
            Modes = (function () {
                function Modes() {
                }
                Modes.READ = "READ";
                Modes.EDIT = "EDIT";
                Modes.CREATE = "CREATE";
                return Modes;
            }());
            exports_1("Modes", Modes);
            exports_1("default",RoleDetailsComponent);
        }
    }
});

//# sourceMappingURL=role-details.component.js.map
