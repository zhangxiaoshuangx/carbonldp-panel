System.register(["@angular/core", "@angular/router", "./../my-apps-sidebar.service", "./../app-context.service", "./app", "./app-content.view.html!", "./app-content.view.css!text"], function(exports_1, context_1) {
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
    var core_1, router_1, my_apps_sidebar_service_1, app_context_service_1, App, app_content_view_html_1, app_content_view_css_text_1;
    var AppContentView;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
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
            function (app_content_view_html_1_1) {
                app_content_view_html_1 = app_content_view_html_1_1;
            },
            function (app_content_view_css_text_1_1) {
                app_content_view_css_text_1 = app_content_view_css_text_1_1;
            }],
        execute: function() {
            AppContentView = (function () {
                //constructor( router:Router, routeParams:RouteParams, myAppsSidebarService:MyAppsSidebarService, appContextService:AppContextService ) {
                function AppContentView(router, myAppsSidebarService, appContextService) {
                    this.router = router;
                    //this.routeParams = routeParams;
                    this.myAppsSidebarService = myAppsSidebarService;
                    this.appContextService = appContextService;
                }
                AppContentView.prototype.routerOnActivate = function () {
                    var _this = this;
                    // let slug:string = this.routeParams.get( "slug" );
                    //TODO: fix routeparams
                    var slug = "great-expectations";
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
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, my_apps_sidebar_service_1.MyAppsSidebarService, app_context_service_1.AppContextService])
                ], AppContentView);
                return AppContentView;
            }());
            exports_1("AppContentView", AppContentView);
            exports_1("default",AppContentView);
        }
    }
});

//# sourceMappingURL=app-content.view.js.map
