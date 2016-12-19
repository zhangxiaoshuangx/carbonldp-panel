System.register(["@angular/core", '@angular/common', "@angular/forms", "angular2-carbonldp/boot", "angular2-carbonldp/services", "./my-apps.routing", "./my-apps.view", "./create-app/create-app.view", "./create-app/create-app.component", "./apps-catalog/apps-catalog.view", "./apps-catalog/apps-catalog.component", "./apps-catalog/apps-tiles/apps-tiles.component", "./apps-catalog/apps-tiles/app-tile.component", "./apps-catalog/apps-list/apps-list.component", "./apps-catalog/app-action-buttons/app-action-buttons.component", "./app-not-found.view", "./../panel.module", "./../directives.module", "./app-context.service"], function(exports_1, context_1) {
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
    var core_1, common_1, forms_1, boot_1, services_1, my_apps_routing_1, my_apps_view_1, create_app_view_1, create_app_component_1, apps_catalog_view_1, apps_catalog_component_1, apps_tiles_component_1, app_tile_component_1, apps_list_component_1, app_action_buttons_component_1, app_not_found_view_1, panel_module_1, directives_module_1, app_context_service_1;
    var MyAppsModule;
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
            function (boot_1_1) {
                boot_1 = boot_1_1;
            },
            function (services_1_1) {
                services_1 = services_1_1;
            },
            function (my_apps_routing_1_1) {
                my_apps_routing_1 = my_apps_routing_1_1;
            },
            function (my_apps_view_1_1) {
                my_apps_view_1 = my_apps_view_1_1;
            },
            function (create_app_view_1_1) {
                create_app_view_1 = create_app_view_1_1;
            },
            function (create_app_component_1_1) {
                create_app_component_1 = create_app_component_1_1;
            },
            function (apps_catalog_view_1_1) {
                apps_catalog_view_1 = apps_catalog_view_1_1;
            },
            function (apps_catalog_component_1_1) {
                apps_catalog_component_1 = apps_catalog_component_1_1;
            },
            function (apps_tiles_component_1_1) {
                apps_tiles_component_1 = apps_tiles_component_1_1;
            },
            function (app_tile_component_1_1) {
                app_tile_component_1 = app_tile_component_1_1;
            },
            function (apps_list_component_1_1) {
                apps_list_component_1 = apps_list_component_1_1;
            },
            function (app_action_buttons_component_1_1) {
                app_action_buttons_component_1 = app_action_buttons_component_1_1;
            },
            function (app_not_found_view_1_1) {
                app_not_found_view_1 = app_not_found_view_1_1;
            },
            function (panel_module_1_1) {
                panel_module_1 = panel_module_1_1;
            },
            function (directives_module_1_1) {
                directives_module_1 = directives_module_1_1;
            },
            function (app_context_service_1_1) {
                app_context_service_1 = app_context_service_1_1;
            }],
        execute: function() {
            MyAppsModule = (function () {
                function MyAppsModule() {
                }
                MyAppsModule = __decorate([
                    core_1.NgModule({
                        imports: [
                            common_1.CommonModule,
                            forms_1.FormsModule,
                            my_apps_routing_1.routing,
                            panel_module_1.PanelModule,
                            directives_module_1.DirectivesModule,
                        ],
                        declarations: [
                            my_apps_view_1.MyAppsView,
                            create_app_view_1.CreateAppView,
                            apps_catalog_view_1.AppsCatalogView,
                            apps_catalog_component_1.AppsCatalogComponent,
                            apps_tiles_component_1.AppsTilesComponent,
                            app_tile_component_1.AppTileComponent,
                            apps_list_component_1.AppsListComponent,
                            app_action_buttons_component_1.AppActionButtonsComponent,
                            create_app_component_1.CreateAppComponent,
                            app_not_found_view_1.AppNotFoundView,
                        ],
                        providers: [
                            app_context_service_1.AppContextService,
                            boot_1.CARBON_PROVIDERS,
                            services_1.CARBON_SERVICES_PROVIDERS
                        ],
                    }), 
                    __metadata('design:paramtypes', [])
                ], MyAppsModule);
                return MyAppsModule;
            }());
            exports_1("MyAppsModule", MyAppsModule);
            exports_1("default",MyAppsModule);
        }
    }
});

//# sourceMappingURL=my-apps.module.js.map
