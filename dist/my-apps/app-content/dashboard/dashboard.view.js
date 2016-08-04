System.register(["@angular/core", "@angular/router-deprecated", "@angular/platform-browser", "./../../app-content/app-content.view", "semantic-ui/semantic"], function(exports_1, context_1) {
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
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, router_deprecated_1, platform_browser_1, app_content_view_1;
    var DashboardView;
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
            function (app_content_view_1_1) {
                app_content_view_1 = app_content_view_1_1;
            },
            function (_1) {}],
        execute: function() {
            // import template from "./create-app.view.html!";
            DashboardView = (function () {
                function DashboardView(router, routeData, title, appContent) {
                    this.app = appContent.app;
                    this.title = title;
                    this.routeData = routeData;
                    this.router = router;
                }
                DashboardView.prototype.routerOnActivate = function () {
                    //let title:string = "AppDev | " + this.app.name + " | Dashboard";
                    //this.title.setTitle( title );
                    var rootComponent = this.router.root.currentInstruction.component.routeData.data["displayName"];
                    var title = rootComponent + " | " + this.app.name + " > " + this.routeData.data["displayName"];
                    this.title.setTitle(title);
                };
                DashboardView = __decorate([
                    core_1.Component({
                        selector: "cp-dashboard-view",
                        template: "<h3>Dashboard View</h3>",
                        styles: [":host { display: block; }"],
                    }),
                    __param(3, core_1.Host()),
                    __param(3, core_1.Inject(core_1.forwardRef(function () { return app_content_view_1.AppContentView; }))), 
                    __metadata('design:paramtypes', [router_deprecated_1.Router, router_deprecated_1.RouteData, platform_browser_1.Title, app_content_view_1.AppContentView])
                ], DashboardView);
                return DashboardView;
            }());
            exports_1("DashboardView", DashboardView);
            exports_1("default",DashboardView);
        }
    }
});

//# sourceMappingURL=dashboard.view.js.map
