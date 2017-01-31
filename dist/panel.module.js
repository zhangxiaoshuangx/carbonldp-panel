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
var core_1 = require('@angular/core');
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
// Components
var header_component_1 = require("./header.component");
var header_item_component_1 = require("./header-item.component");
var login_component_1 = require("./login.component");
var register_component_1 = require("./register.component");
var sidebar_component_1 = require("./sidebar.component");
var sidebar_items_component_1 = require("./sidebar-items.component");
var error_message_component_1 = require("./errors-area/error-message.component");
var errors_area_component_1 = require("./errors-area/errors-area.component");
var menu_bar_component_1 = require("./menu-bar.component");
var paginator_component_1 = require("./paginator/paginator.component");
// Modules
var semantic_module_1 = require("./semantic/semantic.module");
var directives_module_1 = require("./directives.module");
// Services
var router_service_1 = require("./router.service");
var header_service_1 = require("./header.service");
var sidebar_service_1 = require("./sidebar.service");
var my_apps_sidebar_service_1 = require("./my-apps/my-apps-sidebar.service");
var errors_area_service_1 = require("./errors-area/errors-area.service");
var PanelModule = (function () {
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
exports.PanelModule = PanelModule;

//# sourceMappingURL=panel.module.js.map
