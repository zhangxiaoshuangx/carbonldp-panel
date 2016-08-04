System.register(["@angular/core", "@angular/router-deprecated", "@angular/platform-browser", "./apps-catalog.component", "semantic-ui/semantic", "./apps-catalog.view.html!"], function(exports_1, context_1) {
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
    var core_1, router_deprecated_1, platform_browser_1, apps_catalog_component_1, apps_catalog_view_html_1;
    var AppsCatalogView;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (apps_catalog_component_1_1) {
                apps_catalog_component_1 = apps_catalog_component_1_1;
            },
            function (_1) {},
            function (apps_catalog_view_html_1_1) {
                apps_catalog_view_html_1 = apps_catalog_view_html_1_1;
            }],
        execute: function() {
            AppsCatalogView = (function () {
                function AppsCatalogView(router, routeData, title) {
                    this.title = title;
                    this.routeData = routeData;
                    this.router = router;
                }
                AppsCatalogView.prototype.routerOnActivate = function () {
                    var rootComponent = this.router.root.currentInstruction.component.routeData.data["displayName"];
                    var title = rootComponent + " | " + this.routeData.data["displayName"];
                    this.title.setTitle(title);
                    //let title:string = this.title.getTitle() +" | "+ this.routeData.data["displayName"];
                };
                AppsCatalogView = __decorate([
                    core_1.Component({
                        selector: "cp-apps-catalog-view",
                        template: apps_catalog_view_html_1.default,
                        styles: [":host { display: block; }"],
                        directives: [router_deprecated_1.ROUTER_DIRECTIVES, apps_catalog_component_1.AppsCatalogComponent],
                    }), 
                    __metadata('design:paramtypes', [router_deprecated_1.Router, router_deprecated_1.RouteData, platform_browser_1.Title])
                ], AppsCatalogView);
                return AppsCatalogView;
            }());
            exports_1("AppsCatalogView", AppsCatalogView);
            exports_1("default",AppsCatalogView);
        }
    }
});

//# sourceMappingURL=apps-catalog.view.js.map
