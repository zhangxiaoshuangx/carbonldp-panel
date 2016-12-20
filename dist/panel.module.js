System.register(['@angular/core', "@angular/common", "@angular/forms", "@angular/router", "./header.component", "./header-item.component", "./login.component", "./register.component", "./sidebar.component", "./sidebar-items.component", "./errors-area/error-message.component", "./errors-area/errors-area.component", "./menu-bar.component", "./paginator/paginator.component", "./semantic/semantic.module", "./directives.module", "./router.service", "./header.service", "./sidebar.service", "./my-apps/my-apps-sidebar.service", "./errors-area/errors-area.service"], function(exports_1, context_1) {
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
    var core_1, common_1, forms_1, router_1, header_component_1, header_item_component_1, login_component_1, register_component_1, sidebar_component_1, sidebar_items_component_1, error_message_component_1, errors_area_component_1, menu_bar_component_1, paginator_component_1, semantic_module_1, directives_module_1, router_service_1, header_service_1, sidebar_service_1, my_apps_sidebar_service_1, errors_area_service_1;
    var PanelModule;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (header_component_1_1) {
                header_component_1 = header_component_1_1;
            },
            function (header_item_component_1_1) {
                header_item_component_1 = header_item_component_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (register_component_1_1) {
                register_component_1 = register_component_1_1;
            },
            function (sidebar_component_1_1) {
                sidebar_component_1 = sidebar_component_1_1;
            },
            function (sidebar_items_component_1_1) {
                sidebar_items_component_1 = sidebar_items_component_1_1;
            },
            function (error_message_component_1_1) {
                error_message_component_1 = error_message_component_1_1;
            },
            function (errors_area_component_1_1) {
                errors_area_component_1 = errors_area_component_1_1;
            },
            function (menu_bar_component_1_1) {
                menu_bar_component_1 = menu_bar_component_1_1;
            },
            function (paginator_component_1_1) {
                paginator_component_1 = paginator_component_1_1;
            },
            function (semantic_module_1_1) {
                semantic_module_1 = semantic_module_1_1;
            },
            function (directives_module_1_1) {
                directives_module_1 = directives_module_1_1;
            },
            function (router_service_1_1) {
                router_service_1 = router_service_1_1;
            },
            function (header_service_1_1) {
                header_service_1 = header_service_1_1;
            },
            function (sidebar_service_1_1) {
                sidebar_service_1 = sidebar_service_1_1;
            },
            function (my_apps_sidebar_service_1_1) {
                my_apps_sidebar_service_1 = my_apps_sidebar_service_1_1;
            },
            function (errors_area_service_1_1) {
                errors_area_service_1 = errors_area_service_1_1;
            }],
        execute: function() {
            PanelModule = (function () {
                function PanelModule() {
                }
                PanelModule.forRoot = function () {
                    return {
                        ngModule: PanelModule,
                        providers: [header_service_1.HeaderService, sidebar_service_1.SidebarService, router_service_1.RouterService, my_apps_sidebar_service_1.MyAppsSidebarService, errors_area_service_1.ErrorsAreaService]
                    };
                };
                PanelModule = __decorate([
                    core_1.NgModule({
                        imports: [
                            common_1.CommonModule,
                            router_1.RouterModule,
                            semantic_module_1.SemanticModule,
                            directives_module_1.DirectivesModule,
                            forms_1.FormsModule
                        ],
                        declarations: [
                            header_component_1.HeaderComponent,
                            header_item_component_1.HeaderItemComponent,
                            login_component_1.LoginComponent,
                            register_component_1.RegisterComponent,
                            sidebar_component_1.SidebarComponent,
                            sidebar_items_component_1.SidebarItemsComponent,
                            error_message_component_1.ErrorMessageComponent,
                            errors_area_component_1.ErrorsAreaComponent,
                            menu_bar_component_1.MenuBarComponent,
                            paginator_component_1.PaginatorComponent,
                        ],
                        exports: [
                            header_component_1.HeaderComponent,
                            login_component_1.LoginComponent,
                            register_component_1.RegisterComponent,
                            sidebar_component_1.SidebarComponent,
                            menu_bar_component_1.MenuBarComponent,
                            error_message_component_1.ErrorMessageComponent,
                            errors_area_component_1.ErrorsAreaComponent,
                            paginator_component_1.PaginatorComponent,
                        ],
                        providers: []
                    }), 
                    __metadata('design:paramtypes', [])
                ], PanelModule);
                return PanelModule;
            }());
            exports_1("PanelModule", PanelModule);
        }
    }
});

//# sourceMappingURL=panel.module.js.map
