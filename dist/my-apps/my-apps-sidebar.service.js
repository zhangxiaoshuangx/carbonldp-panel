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
var sidebar_service_1 = require("./../sidebar.service");
var MyAppsSidebarService = (function () {
    function MyAppsSidebarService(router, routerService, sidebarService) {
        // TODO: Find a more native approach to make this work with different routing levels 'website.com/app-dev/my-apps/slug/...' and 'workbench.com/my-apps/slug/...'
        this.base = "";
        this.openApps = new Map();
        this.openAppsDivider = {
            type: "divider",
            name: "Open Apps",
            icon: "cubes icon",
            index: 0,
        };
        this.router = router;
        this.routerService = routerService;
        this.sidebarService = sidebarService;
        this.base = this.sidebarService.base;
        this.init();
    }
    MyAppsSidebarService.prototype.init = function () {
        var _this = this;
        if (typeof this.openAppsGroup !== "undefined" && this.sidebarService.items.findIndex(function (item) { return item === _this.openAppsGroup; }) !== -1)
            return;
        this.openApps.clear();
        this.openAppsGroup = {
            type: "group",
            children: [],
            index: 100,
        };
        this.sidebarService.addItem(this.openAppsGroup);
    };
    MyAppsSidebarService.prototype.addApp = function (app) {
        var _this = this;
        if (this.openApps.has(app))
            return;
        if (this.openApps.size === 0)
            this.addOpenAppsDivider();
        var removeAppEmitter = new core_1.EventEmitter();
        removeAppEmitter.subscribe(function () {
            _this.removeApp(app);
        });
        var appSubmenu = {
            type: "submenu",
            name: app.name,
            closeable: true,
            onClose: removeAppEmitter,
            children: [
                {
                    type: "link",
                    name: "Dashboard",
                    icon: "bar chart icon",
                    route: [this.base, "my-apps", app.slug],
                },
                {
                    type: "link",
                    name: "Document Explorer",
                    icon: "list layout icon",
                    route: [this.base, "my-apps", app.slug, "explore"],
                },
                {
                    type: "link",
                    name: "SPARQL Client",
                    icon: "terminal icon",
                    route: [this.base, "my-apps", app.slug, "sparql-client"],
                },
                {
                    type: "link",
                    name: "Security",
                    icon: "lock icon",
                    route: [this.base, "my-apps", app.slug, "security", "agents"],
                },
                {
                    type: "link",
                    name: "Configuration",
                    icon: "settings icon",
                    route: [this.base, "my-apps", app.slug, "configure"],
                },
            ]
        };
        this.openAppsGroup.children.push(appSubmenu);
        this.openApps.set(app, appSubmenu);
    };
    MyAppsSidebarService.prototype.openApp = function (app) {
        if (!this.openApps.has(app))
            return;
        var appSubmenu = this.openApps.get(app);
        appSubmenu.open = true;
    };
    MyAppsSidebarService.prototype.closeApp = function (app) {
        if (!this.openApps.has(app))
            return;
        var appSubmenu = this.openApps.get(app);
        appSubmenu.open = false;
    };
    MyAppsSidebarService.prototype.removeApp = function (app) {
        if (!this.openApps.has(app))
            return;
        var appSubmenu = this.openApps.get(app);
        this.openAppsGroup.children.splice(this.openAppsGroup.children.indexOf(appSubmenu), 1);
        this.openApps.delete(app);
        if (this.openApps.size === 0)
            this.removeOpenAppsDivider();
        if (this.routerService.isActive(["my-apps", app.slug], false))
            this.router.navigate(["my-apps"]);
    };
    MyAppsSidebarService.prototype.addOpenAppsDivider = function () {
        this.openAppsGroup.children.push(this.openAppsDivider);
    };
    MyAppsSidebarService.prototype.removeOpenAppsDivider = function () {
        this.openAppsGroup.children.splice(this.openAppsGroup.children.indexOf(this.openAppsDivider), 1);
    };
    MyAppsSidebarService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, router_service_1.RouterService, sidebar_service_1.SidebarService])
    ], MyAppsSidebarService);
    return MyAppsSidebarService;
}());
exports.MyAppsSidebarService = MyAppsSidebarService;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MyAppsSidebarService;

//# sourceMappingURL=my-apps-sidebar.service.js.map
