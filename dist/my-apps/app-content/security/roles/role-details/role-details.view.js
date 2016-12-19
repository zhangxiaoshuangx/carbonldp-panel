System.register(["@angular/core", "@angular/router", "carbonldp-panel/my-apps/app-content/app-content.service", "./role-details.view.html!"], function(exports_1, context_1) {
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
    var core_1, router_1, app_content_service_1, role_details_view_html_1;
    var RoleDetailsView;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (app_content_service_1_1) {
                app_content_service_1 = app_content_service_1_1;
            },
            function (role_details_view_html_1_1) {
                role_details_view_html_1 = role_details_view_html_1_1;
            }],
        execute: function() {
            RoleDetailsView = (function () {
                function RoleDetailsView(router, route, appContentService) {
                    var _this = this;
                    this.canDisplay = true;
                    this.mode = "READ";
                    this.router = router;
                    this.activatedRoute = route;
                    this.app = appContentService.activeApp;
                    appContentService.onAppHasChanged.subscribe(function (app) {
                        _this.app = app;
                        _this.canDisplay = false;
                        setTimeout(function () { _this.canDisplay = true; }, 0);
                    });
                }
                RoleDetailsView.prototype.ngOnInit = function () {
                    var _this = this;
                    this.activatedRoute.data.forEach(function (data) {
                        _this.role = data.role;
                    });
                    this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.mode = params["mode"] ? params["mode"] : "READ";
                    });
                };
                RoleDetailsView.prototype.goToRoles = function () {
                    this.router.navigate(["../"]);
                };
                RoleDetailsView = __decorate([
                    core_1.Component({
                        selector: "cp-role-details-view",
                        template: role_details_view_html_1.default,
                        styles: [":host { display: block; }"]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, app_content_service_1.AppContentService])
                ], RoleDetailsView);
                return RoleDetailsView;
            }());
            exports_1("RoleDetailsView", RoleDetailsView);
            exports_1("default",RoleDetailsView);
        }
    }
});

//# sourceMappingURL=role-details.view.js.map
