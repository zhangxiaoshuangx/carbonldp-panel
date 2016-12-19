System.register(["@angular/core", "carbonldp-panel/my-apps/app-content/app-content.service", "./roles-list.view.html!"], function(exports_1, context_1) {
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
    var core_1, app_content_service_1, roles_list_view_html_1;
    var RolesListView;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (app_content_service_1_1) {
                app_content_service_1 = app_content_service_1_1;
            },
            function (roles_list_view_html_1_1) {
                roles_list_view_html_1 = roles_list_view_html_1_1;
            }],
        execute: function() {
            RolesListView = (function () {
                function RolesListView(appContentService) {
                    var _this = this;
                    this.canDisplay = true;
                    this.app = appContentService.activeApp;
                    appContentService.onAppHasChanged.subscribe(function (app) {
                        _this.app = app;
                        _this.canDisplay = false;
                        setTimeout(function () { _this.canDisplay = true; }, 0);
                    });
                }
                RolesListView = __decorate([
                    core_1.Component({
                        selector: "cp-roles-list-view",
                        template: roles_list_view_html_1.default,
                        styles: [":host { display: block; }"]
                    }), 
                    __metadata('design:paramtypes', [app_content_service_1.AppContentService])
                ], RolesListView);
                return RolesListView;
            }());
            exports_1("RolesListView", RolesListView);
            exports_1("default",RolesListView);
        }
    }
});

//# sourceMappingURL=roles-list.view.js.map
