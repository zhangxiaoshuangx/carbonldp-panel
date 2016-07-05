System.register(["@angular/core", "@angular/common", "@angular/router-deprecated", "jquery", "semantic-ui/semantic", "carbon-panel/sidebar.service", "carbon-panel/sidebar-items.component", "./sidebar.component.html!", "./sidebar.component.css!text"], function(exports_1, context_1) {
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
    var core_1, common_1, router_deprecated_1, jquery_1, sidebar_service_1, sidebar_items_component_1, sidebar_component_html_1, sidebar_component_css_text_1;
    var SidebarComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            },
            function (jquery_1_1) {
                jquery_1 = jquery_1_1;
            },
            function (_1) {},
            function (sidebar_service_1_1) {
                sidebar_service_1 = sidebar_service_1_1;
            },
            function (sidebar_items_component_1_1) {
                sidebar_items_component_1 = sidebar_items_component_1_1;
            },
            function (sidebar_component_html_1_1) {
                sidebar_component_html_1 = sidebar_component_html_1_1;
            },
            function (sidebar_component_css_text_1_1) {
                sidebar_component_css_text_1 = sidebar_component_css_text_1_1;
            }],
        execute: function() {
            SidebarComponent = (function () {
                function SidebarComponent(router, element, location, sidebarService) {
                    var _this = this;
                    this.router = router;
                    this.element = element;
                    this.sidebarService = sidebarService;
                    this.location = location;
                    this.sidebarService.toggleEmitter.subscribe(function () {
                        _this.toggle();
                    });
                }
                SidebarComponent.prototype.ngAfterViewInit = function () {
                    this.$element = jquery_1.default(this.element.nativeElement);
                    this.refreshAccordion();
                };
                SidebarComponent.prototype.toggle = function () {
                    var _this = this;
                    this.sidebarService.toggleMenuButtonEmitter.emit(null);
                    if (this.$element.is(":visible")) {
                        this.$element.animate({ "width": "0" }, 400, function () {
                            _this.$element.hide();
                        });
                    }
                    else {
                        this.$element.show();
                        this.$element.animate({ "width": "300px" }, 400);
                    }
                };
                SidebarComponent.prototype.refreshAccordion = function () {
                    this.$element.accordion({
                        selector: {
                            trigger: ".item.app, .item.app .title",
                            title: ".title",
                        },
                        exclusive: false
                    });
                };
                SidebarComponent.prototype.isActive = function (slug, fullRoute) {
                    switch (typeof slug) {
                        case "string":
                            var url = this.location.path().split("/");
                            if (fullRoute) {
                                return url.indexOf(slug) > -1;
                            }
                            else {
                                return url[url.length - 1].indexOf(slug) > -1;
                            }
                        case "object":
                            // TODO: Change this to use a non private variables implementation.
                            var instruction = this.router.generate(slug);
                            var router = this.router;
                            if (!fullRoute) {
                                while (instruction.child) {
                                    instruction = instruction.child;
                                    if (typeof router._childRouter === "undefined" || router._childRouter === null)
                                        continue;
                                    if (typeof router._childRouter._currentInstruction === "undefined" || router._childRouter._currentInstruction === null)
                                        continue;
                                    router = router._childRouter;
                                }
                            }
                            return router.isRouteActive(instruction);
                        default:
                            return false;
                    }
                };
                SidebarComponent = __decorate([
                    core_1.Component({
                        selector: "cp-sidebar",
                        template: sidebar_component_html_1.default,
                        styles: [sidebar_component_css_text_1.default],
                        directives: [router_deprecated_1.ROUTER_DIRECTIVES, sidebar_items_component_1.SidebarItemsComponent],
                        host: {
                            class: "ui inverted vertical menu accordion"
                        }
                    }), 
                    __metadata('design:paramtypes', [router_deprecated_1.Router, core_1.ElementRef, common_1.Location, sidebar_service_1.SidebarService])
                ], SidebarComponent);
                return SidebarComponent;
            }());
            exports_1("SidebarComponent", SidebarComponent);
            exports_1("default",SidebarComponent);
        }
    }
});

//# sourceMappingURL=sidebar.component.js.map
