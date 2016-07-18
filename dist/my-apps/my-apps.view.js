System.register(["@angular/core", "@angular/router-deprecated", "./my-apps-sidebar.service", "./app-content/app-content.view", "./apps-catalog/apps-catalog.view", "./create-app/create-app.view"], function(exports_1, context_1) {
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
    var core_1, router_deprecated_1, my_apps_sidebar_service_1, app_content_view_1, apps_catalog_view_1, create_app_view_1;
    var MyAppsView;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            },
            function (my_apps_sidebar_service_1_1) {
                my_apps_sidebar_service_1 = my_apps_sidebar_service_1_1;
            },
            function (app_content_view_1_1) {
                app_content_view_1 = app_content_view_1_1;
            },
            function (apps_catalog_view_1_1) {
                apps_catalog_view_1 = apps_catalog_view_1_1;
            },
            function (create_app_view_1_1) {
                create_app_view_1 = create_app_view_1_1;
            }],
        execute: function() {
            MyAppsView = (function () {
                function MyAppsView() {
                }
                MyAppsView = __decorate([
                    core_1.Component({
                        selector: "cp-my-apps",
                        template: "<router-outlet></router-outlet>",
                        styles: [":host { display: block; }"],
                        directives: [router_deprecated_1.ROUTER_DIRECTIVES, router_deprecated_1.RouterOutlet],
                        providers: [
                            core_1.provide(my_apps_sidebar_service_1.MyAppsSidebarService, { useClass: my_apps_sidebar_service_1.MyAppsSidebarService })
                        ]
                    }),
                    router_deprecated_1.RouteConfig([
                        {
                            path: "/",
                            as: "List",
                            component: apps_catalog_view_1.AppsCatalogView,
                            useAsDefault: true,
                            data: {
                                alias: "List",
                                displayName: "My Apps",
                            },
                        },
                        {
                            path: "/:slug/...",
                            as: "App",
                            component: app_content_view_1.AppContentView,
                            data: {
                                alias: "App",
                                displayName: "App",
                                params: {
                                    name: "slug",
                                    redirectTo: "AppDashboard",
                                },
                            },
                        },
                        {
                            path: "/create",
                            as: "Create",
                            component: create_app_view_1.CreateAppView,
                            data: {
                                alias: "Create",
                                displayName: "Create App",
                            },
                        },
                    ]), 
                    __metadata('design:paramtypes', [])
                ], MyAppsView);
                return MyAppsView;
            }());
            exports_1("MyAppsView", MyAppsView);
            exports_1("default",MyAppsView);
        }
    }
});

//# sourceMappingURL=my-apps.view.js.map
