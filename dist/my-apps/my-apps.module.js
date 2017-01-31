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
var common_1 = require('@angular/common');
var forms_1 = require("@angular/forms");
//Providers
var boot_1 = require("angular2-carbonldp/boot");
var services_1 = require("angular2-carbonldp/services");
var my_apps_routing_1 = require("./my-apps.routing");
// Components
var my_apps_view_1 = require("./my-apps.view");
var create_app_view_1 = require("./create-app/create-app.view");
var create_app_component_1 = require("./create-app/create-app.component");
var apps_catalog_view_1 = require("./apps-catalog/apps-catalog.view");
var apps_catalog_component_1 = require("./apps-catalog/apps-catalog.component");
var apps_tiles_component_1 = require("./apps-catalog/apps-tiles/apps-tiles.component");
var app_tile_component_1 = require("./apps-catalog/apps-tiles/app-tile.component");
var apps_list_component_1 = require("./apps-catalog/apps-list/apps-list.component");
var app_action_buttons_component_1 = require("./apps-catalog/app-action-buttons/app-action-buttons.component");
var app_not_found_view_1 = require("./app-not-found.view");
// Modules
var panel_module_1 = require("./../panel.module");
var directives_module_1 = require("./../directives.module");
// Services
var app_context_service_1 = require("./app-context.service");
var MyAppsModule = (function () {
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
exports.MyAppsModule = MyAppsModule;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MyAppsModule;

//# sourceMappingURL=my-apps.module.js.map
