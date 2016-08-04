System.register(["@angular/core", "@angular/platform-browser", "@angular/router-deprecated", "./../app-content.view", "./document-explorer/document-explorer.component", "semantic-ui/semantic", "./explorer.view.html!"], function(exports_1, context_1) {
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
    var core_1, platform_browser_1, router_deprecated_1, app_content_view_1, document_explorer_component_1, explorer_view_html_1;
    var ExplorerView;
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
            function (app_content_view_1_1) {
                app_content_view_1 = app_content_view_1_1;
            },
            function (document_explorer_component_1_1) {
                document_explorer_component_1 = document_explorer_component_1_1;
            },
            function (_1) {},
            function (explorer_view_html_1_1) {
                explorer_view_html_1 = explorer_view_html_1_1;
            }],
        execute: function() {
            ExplorerView = (function () {
                function ExplorerView(routeData, router, title, appContent) {
                    this.app = appContent.app;
                    this.title = title;
                    this.router = router;
                    this.routeData = routeData;
                }
                ExplorerView.prototype.routerOnActivate = function () {
                    var rootComponent = this.router.root.currentInstruction.component.routeData.data["displayName"];
                    var title = rootComponent + " | " + this.app.name + " > " + this.routeData.data["displayName"];
                    this.title.setTitle(title);
                };
                ExplorerView = __decorate([
                    core_1.Component({
                        selector: "cp-explorer-view",
                        template: explorer_view_html_1.default,
                        styles: [":host { display: block; }"],
                        directives: [document_explorer_component_1.DocumentExplorerComponent],
                    }),
                    __param(3, core_1.Host()),
                    __param(3, core_1.Inject(core_1.forwardRef(function () { return app_content_view_1.AppContentView; }))), 
                    __metadata('design:paramtypes', [router_deprecated_1.RouteData, router_deprecated_1.Router, platform_browser_1.Title, app_content_view_1.AppContentView])
                ], ExplorerView);
                return ExplorerView;
            }());
            exports_1("ExplorerView", ExplorerView);
            exports_1("default",ExplorerView);
        }
    }
});

//# sourceMappingURL=explorer.view.js.map
