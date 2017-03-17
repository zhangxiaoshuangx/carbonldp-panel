"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
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
var message_component_1 = require("./messages-area/message.component");
var messages_area_component_1 = require("./messages-area/messages-area.component");
var menu_bar_component_1 = require("./menu-bar.component");
var paginator_component_1 = require("./paginator/paginator.component");
var error_label_component_1 = require("./messages-area/error/error-label.component");
// Modules
var semantic_module_1 = require("./semantic/semantic.module");
var directives_module_1 = require("./directives/directives.module");
// Services
var router_service_1 = require("./router.service");
var header_service_1 = require("./header.service");
var sidebar_service_1 = require("./sidebar.service");
var my_apps_sidebar_service_1 = require("./my-apps/my-apps-sidebar.service");
var messages_area_service_1 = require("./messages-area/messages-area.service");
var PanelModule = PanelModule_1 = (function () {
    function PanelModule() {
    }
    PanelModule.forRoot = function () {
        return {
            ngModule: PanelModule_1,
            providers: [header_service_1.HeaderService, sidebar_service_1.SidebarService, router_service_1.RouterService, my_apps_sidebar_service_1.MyAppsSidebarService, messages_area_service_1.MessagesAreaService]
        };
    };
    return PanelModule;
}());
PanelModule = PanelModule_1 = __decorate([
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
            message_component_1.MessageComponent,
            messages_area_component_1.MessagesAreaComponent,
            menu_bar_component_1.MenuBarComponent,
            paginator_component_1.PaginatorComponent,
            error_label_component_1.ErrorLabelComponent,
        ],
        exports: [
            header_component_1.HeaderComponent,
            login_component_1.LoginComponent,
            register_component_1.RegisterComponent,
            sidebar_component_1.SidebarComponent,
            menu_bar_component_1.MenuBarComponent,
            message_component_1.MessageComponent,
            messages_area_component_1.MessagesAreaComponent,
            paginator_component_1.PaginatorComponent,
            error_label_component_1.ErrorLabelComponent,
        ],
        providers: []
    })
], PanelModule);
exports.PanelModule = PanelModule;
var PanelModule_1;
