System.register(['@angular/core', '@angular/router', "./app", "./../app-context.service", "./app-content.service"], function(exports_1, context_1) {
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
    var core_1, router_1, App, app_context_service_1, app_content_service_1;
    var AppContentResolver;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (App_1) {
                App = App_1;
            },
            function (app_context_service_1_1) {
                app_context_service_1 = app_context_service_1_1;
            },
            function (app_content_service_1_1) {
                app_content_service_1 = app_content_service_1_1;
            }],
        execute: function() {
            AppContentResolver = (function () {
                function AppContentResolver(router, route, appContextService, appContentService) {
                    this.router = router;
                    this.activatedRoute = route;
                    this.appContextService = appContextService;
                    this.appContentService = appContentService;
                }
                AppContentResolver.prototype.resolve = function (route) {
                    var _this = this;
                    var slug = route.params["slug"];
                    return this.appContextService.get(slug).then(function (appContext) {
                        var app = App.Factory.createFrom(appContext);
                        _this.appContentService.activeApp = app;
                        return app;
                    }).catch(function (error) {
                        console.error(error);
                        _this.router.navigate(["my-apps", "app-not-found"]);
                        return false;
                    });
                };
                AppContentResolver = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, app_context_service_1.AppContextService, app_content_service_1.AppContentService])
                ], AppContentResolver);
                return AppContentResolver;
            }());
            exports_1("AppContentResolver", AppContentResolver);
        }
    }
});

//# sourceMappingURL=app-content.resolver.js.map
