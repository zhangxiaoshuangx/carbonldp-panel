System.register(["@angular/core", "@angular/router-deprecated", "./../my-apps-sidebar.service", "./../app-context.service", "./app", "./dashboard/dashboard.view", "./sparql-client/sparql-client.view", "./edit-app/edit-app.view", "./explorer/explorer.view", "./configuration/configuration.view", "./app-content.view.html!", "./app-content.view.css!text"], function(exports_1, context_1) {
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
    var core_1, router_deprecated_1, my_apps_sidebar_service_1, app_context_service_1, App, dashboard_view_1, sparql_client_view_1, edit_app_view_1, explorer_view_1, configuration_view_1, app_content_view_html_1, app_content_view_css_text_1;
    var AppContentView;
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
            function (app_context_service_1_1) {
                app_context_service_1 = app_context_service_1_1;
            },
            function (App_1) {
                App = App_1;
            },
            function (dashboard_view_1_1) {
                dashboard_view_1 = dashboard_view_1_1;
            },
            function (sparql_client_view_1_1) {
                sparql_client_view_1 = sparql_client_view_1_1;
            },
            function (edit_app_view_1_1) {
                edit_app_view_1 = edit_app_view_1_1;
            },
            function (explorer_view_1_1) {
                explorer_view_1 = explorer_view_1_1;
            },
            function (configuration_view_1_1) {
                configuration_view_1 = configuration_view_1_1;
            },
            function (app_content_view_html_1_1) {
                app_content_view_html_1 = app_content_view_html_1_1;
            },
            function (app_content_view_css_text_1_1) {
                app_content_view_css_text_1 = app_content_view_css_text_1_1;
            }],
        execute: function() {
            AppContentView = (function () {
                function AppContentView(router, routeParams, myAppsSidebarService, appContextService) {
                    this.router = router;
                    this.routeParams = routeParams;
                    this.myAppsSidebarService = myAppsSidebarService;
                    this.appContextService = appContextService;
                }
                AppContentView.prototype.routerOnActivate = function () {
                    var _this = this;
                    var slug = this.routeParams.get("slug");
                    this.appContextService.get(slug).then(function (appContext) {
                        _this.app = App.Factory.createFrom(appContext);
                        _this.myAppsSidebarService.addApp(_this.app);
                        _this.myAppsSidebarService.openApp(_this.app);
                    }).catch(function (error) {
                        _this.timer = 5;
                        var countDown = setInterval(function () {
                            _this.timer--;
                            if (_this.timer === 0) {
                                _this.router.navigate(["List"]);
                                clearInterval(countDown);
                            }
                        }, 1000);
                    });
                };
                AppContentView = __decorate([
                    core_1.Component({
                        selector: "cp-app-content",
                        template: app_content_view_html_1.default,
                        styles: [app_content_view_css_text_1.default],
                        directives: [router_deprecated_1.ROUTER_DIRECTIVES, router_deprecated_1.RouterOutlet],
                        providers: [app_context_service_1.AppContextService,],
                    }),
                    router_deprecated_1.RouteConfig([
                        {
                            path: "/",
                            as: "AppDashboard",
                            component: dashboard_view_1.DashboardView,
                            useAsDefault: true,
                            data: {
                                alias: "AppDashboard",
                                displayName: "App Dashboard",
                            },
                        },
                        {
                            path: "/sparql-client",
                            as: "SPARQLClient",
                            component: sparql_client_view_1.SPARQLClientView,
                            data: {
                                alias: "SPARQLClient",
                                displayName: "SPARQL Client",
                            },
                        },
                        {
                            path: "/edit",
                            as: "Edit",
                            component: edit_app_view_1.EditAppView,
                            data: {
                                alias: "Edit",
                                displayName: "Edit",
                            },
                        },
                        {
                            path: "/explore",
                            as: "Explorer",
                            component: explorer_view_1.ExplorerView,
                            data: {
                                alias: "Explorer",
                                displayName: "Explorer",
                            },
                        },
                        {
                            path: "/configure",
                            as: "Configuration",
                            component: configuration_view_1.ConfigurationView,
                            data: {
                                alias: "Configuration",
                                displayName: "Configuration",
                            },
                        },
                    ]), 
                    __metadata('design:paramtypes', [router_deprecated_1.Router, router_deprecated_1.RouteParams, my_apps_sidebar_service_1.MyAppsSidebarService, app_context_service_1.AppContextService])
                ], AppContentView);
                return AppContentView;
            }());
            exports_1("AppContentView", AppContentView);
            exports_1("default",AppContentView);
        }
    }
});

//# sourceMappingURL=app-content.view.js.map
