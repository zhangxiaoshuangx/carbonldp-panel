System.register(["@angular/core", "@angular/platform-browser", "@angular/router-deprecated", "semantic-ui/semantic", "./create-app.component", "./create-app.view.html!"], function(exports_1, context_1) {
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
    var core_1, platform_browser_1, router_deprecated_1, create_app_component_1, create_app_view_html_1;
    var CreateAppView;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            },
            function (_1) {},
            function (create_app_component_1_1) {
                create_app_component_1 = create_app_component_1_1;
            },
            function (create_app_view_html_1_1) {
                create_app_view_html_1 = create_app_view_html_1_1;
            }],
        execute: function() {
            CreateAppView = (function () {
                function CreateAppView(title, router, routeData) {
                    this.title = title;
                    this.router = router;
                    this.routeData = routeData;
                }
                CreateAppView.prototype.routerOnActivate = function () {
                    var rootComponent = this.router.root.currentInstruction.component.routeData.data["displayName"];
                    var title = rootComponent + " | " + this.routeData.data["displayName"];
                    this.title.setTitle(title);
                };
                CreateAppView = __decorate([
                    core_1.Component({
                        selector: "cp-create-app-view",
                        template: create_app_view_html_1.default,
                        styles: [":host { display: block; }"],
                        directives: [create_app_component_1.CreateAppComponent],
                    }), 
                    __metadata('design:paramtypes', [platform_browser_1.Title, router_deprecated_1.Router, router_deprecated_1.RouteData])
                ], CreateAppView);
                return CreateAppView;
            }());
            exports_1("CreateAppView", CreateAppView);
            exports_1("default",CreateAppView);
        }
    }
});

//# sourceMappingURL=create-app.view.js.map
