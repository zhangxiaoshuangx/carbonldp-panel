System.register(["@angular/core", "./../sidebar.service"], function(exports_1, context_1) {
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
    var core_1, sidebar_service_1;
    var MyAppsSidebarService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (sidebar_service_1_1) {
                sidebar_service_1 = sidebar_service_1_1;
            }],
        execute: function() {
            MyAppsSidebarService = (function () {
                function MyAppsSidebarService(sidebarService) {
                    this.openApps = new Map();
                    this.openAppsDivider = {
                        type: "divider",
                        name: "Open Apps",
                        icon: "cubes icon",
                        index: 0,
                    };
                    this.sidebarService = sidebarService;
                    this.openAppsGroup = {
                        type: "group",
                        children: [],
                        index: 100,
                    };
                    this.sidebarService.addItem(this.openAppsGroup);
                }
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
                                route: ["./MyApps", "App", { slug: app.slug }, "AppDashboard"],
                            },
                            {
                                type: "link",
                                name: "Document Explorer",
                                icon: "list layout icon",
                                route: ["./MyApps", "App", { slug: app.slug }, "Explorer"],
                            },
                            {
                                type: "link",
                                name: "SPARQL Client",
                                icon: "terminal icon",
                                route: ["./MyApps", "App", { slug: app.slug }, "SPARQLClient"],
                            },
                            {
                                type: "link",
                                name: "Configuration",
                                icon: "settings icon",
                                route: ["./MyApps", "App", { slug: app.slug }, "Configuration"],
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
                };
                MyAppsSidebarService.prototype.addOpenAppsDivider = function () {
                    this.openAppsGroup.children.push(this.openAppsDivider);
                };
                MyAppsSidebarService.prototype.removeOpenAppsDivider = function () {
                    this.openAppsGroup.children.splice(this.openAppsGroup.children.indexOf(this.openAppsDivider), 1);
                };
                MyAppsSidebarService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [sidebar_service_1.SidebarService])
                ], MyAppsSidebarService);
                return MyAppsSidebarService;
            }());
            exports_1("MyAppsSidebarService", MyAppsSidebarService);
            exports_1("default",MyAppsSidebarService);
        }
    }
});

//# sourceMappingURL=my-apps-sidebar.service.js.map
