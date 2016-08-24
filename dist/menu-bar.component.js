System.register(["@angular/core", "@angular/router-deprecated", "carbon-panel/router.service", "carbon-panel/sidebar.service", "semantic-ui/semantic", "./menu-bar.component.html!", "./menu-bar.component.css!text"], function(exports_1, context_1) {
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
    var core_1, router_deprecated_1, router_service_1, sidebar_service_1, menu_bar_component_html_1, menu_bar_component_css_text_1;
    var MenuBarComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
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
                function MenuBarComponent(element, router, routerService, sidebarService) {
                    var _this = this;
                    this.breadCrumbs = [];
                    this.instructions = [];
                    this.element = element;
                    this.router = router;
                    this.routerService = routerService;
                    this.sidebarService = sidebarService;
                    this.router.parent.subscribe(function (url) {
                        _this.updateBreadcrumbs(url);
                    });
                }
                MenuBarComponent.prototype.updateBreadcrumbs = function (url) {
                    var _this = this;
                    this.instructions = [];
                    this.breadCrumbs = [];
                    var workingInstruction;
                    this.router.recognize(url).then(function (instruction) {
                        if (!instruction)
                            return;
                        workingInstruction = instruction;
                        while (workingInstruction.child) {
                            _this.addInstruction(workingInstruction);
                            workingInstruction = workingInstruction.child;
                        }
                        if (!workingInstruction.child && !!workingInstruction.urlPath) {
                            _this.addInstruction(workingInstruction);
                        }
                    });
                };
                MenuBarComponent.prototype.getRouteAlias = function () {
                    var alias = [], params = { name: "" };
                    this.instructions.forEach(function (instruction) {
                        if (!instruction)
                            return;
                        alias.push(instruction.component.routeData.data["alias"]);
                        params = instruction.component.routeData.data["params"];
                        if (params)
                            alias.push((_a = {}, _a[params.name] = instruction.urlPath, _a));
                        var _a;
                    });
                    return alias;
                };
                MenuBarComponent.prototype.addInstruction = function (workingInstruction) {
                    this.instructions.push(workingInstruction);
                    this.breadCrumbs.push({
                        url: workingInstruction.urlPath,
                        displayName: workingInstruction.component.routeData.data["displayName"],
                        alias: this.getRouteAlias(),
                        friendlyAlias: this.getFriendlyAlias()
                    });
                };
                MenuBarComponent.prototype.getFriendlyAlias = function () {
                    var friendlyURL = "";
                    this.instructions.forEach(function (instruction) {
                        if (!instruction)
                            return;
                        friendlyURL += instruction.component.routeData.data["alias"];
                        friendlyURL += instruction.child ? "/" : "";
                    });
                    return friendlyURL;
                };
                MenuBarComponent.prototype.toggleSidebar = function () {
                    this.sidebarService.toggle();
                };
                MenuBarComponent = __decorate([
                    core_1.Component({
                        selector: "cp-menu-bar",
                        template: menu_bar_component_html_1.default,
                        styles: [menu_bar_component_css_text_1.default],
                        directives: [router_deprecated_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, (typeof (_a = typeof router_deprecated_1.Router !== 'undefined' && router_deprecated_1.Router) === 'function' && _a) || Object, router_service_1.RouterService, sidebar_service_1.SidebarService])
                ], MenuBarComponent);
                return MenuBarComponent;
                var _a;
            }());
            exports_1("MenuBarComponent", MenuBarComponent);
            exports_1("default",MenuBarComponent);
        }
    }
});

//# sourceMappingURL=menu-bar.component.js.map
