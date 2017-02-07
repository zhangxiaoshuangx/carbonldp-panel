"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var router_service_1 = require("carbonldp-panel/router.service");
var sidebar_service_1 = require("carbonldp-panel/sidebar.service");
require("semantic-ui/semantic");
var MenuBarComponent = (function () {
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
                        if (!!routeSnapshot.data["displayName"]) {
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
            template: require("./menu-bar.component.html"),
            styles: [require("./menu-bar.component.css")],
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_service_1.RouterService, sidebar_service_1.SidebarService, router_1.ActivatedRoute])
    ], MenuBarComponent);
    return MenuBarComponent;
}());
exports.MenuBarComponent = MenuBarComponent;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MenuBarComponent;

//# sourceMappingURL=menu-bar.component.js.map
