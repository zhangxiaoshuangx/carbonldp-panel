System.register(["@angular/core", "@angular/router", "carbonldp-panel/router.service", "carbonldp-panel/sidebar.service", "semantic-ui/semantic", "./menu-bar.component.html!", "./menu-bar.component.css!text"], function(exports_1, context_1) {
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
    var core_1, router_1, router_service_1, sidebar_service_1, menu_bar_component_html_1, menu_bar_component_css_text_1;
    var MenuBarComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (router_service_1_1) {
                router_service_1 = router_service_1_1;
            },
            function (sidebar_service_1_1) {
                sidebar_service_1 = sidebar_service_1_1;
            },
            function (_1) {},
            function (menu_bar_component_html_1_1) {
                menu_bar_component_html_1 = menu_bar_component_html_1_1;
            },
            function (menu_bar_component_css_text_1_1) {
                menu_bar_component_css_text_1 = menu_bar_component_css_text_1_1;
            }],
        execute: function() {
            MenuBarComponent = (function () {
                function MenuBarComponent(router, routerService, sidebarService, route) {
                    this.breadCrumbs = [];
                    this.route = route;
                    this.router = router;
                    this.routerService = routerService;
                    this.sidebarService = sidebarService;
                }
                MenuBarComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.router.events.subscribe(function (event) {
                        if (!(event instanceof router_1.NavigationEnd))
                            return;
                        _this.breadCrumbs = [];
                        var url = "", currentRoute = _this.route.root;
                        do {
                            var childrenRoutes = currentRoute.children;
                            currentRoute = null;
                            childrenRoutes.forEach(function (route) {
                                if (route.outlet === "primary") {
                                    var routeSnapshot = route.snapshot;
                                    if (typeof routeSnapshot === "undefined")
                                        return;
                                    url += _this.getURL(routeSnapshot);
                                    if (!!routeSnapshot.data["displayName"] && !routeSnapshot.data["hide"]) {
                                        _this.breadCrumbs.push({
                                            alias: url,
                                            displayName: routeSnapshot.data["displayName"],
                                        });
                                    }
                                    currentRoute = route;
                                }
                            });
                        } while (currentRoute);
                    });
                };
                MenuBarComponent.prototype.getURL = function (routeSnapshot) {
                    var url = "";
                    if (routeSnapshot.data["param"])
                        url += "/" + routeSnapshot.params[routeSnapshot.data["param"]];
                    else if (routeSnapshot.data["alias"])
                        url += "/" + routeSnapshot.data["alias"];
                    return url;
                };
                MenuBarComponent.prototype.toggleSidebar = function () {
                    this.sidebarService.toggle();
                };
                MenuBarComponent = __decorate([
                    core_1.Component({
                        selector: "cp-menu-bar",
                        template: menu_bar_component_html_1.default,
                        styles: [menu_bar_component_css_text_1.default],
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, router_service_1.RouterService, sidebar_service_1.SidebarService, router_1.ActivatedRoute])
                ], MenuBarComponent);
                return MenuBarComponent;
            }());
            exports_1("MenuBarComponent", MenuBarComponent);
            exports_1("default",MenuBarComponent);
        }
    }
});

//# sourceMappingURL=menu-bar.component.js.map
