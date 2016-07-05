System.register(["@angular/core", "@angular/router-deprecated", "./sidebar-submenu.component.html!"], function(exports_1, context_1) {
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
    var core_1, router_deprecated_1, sidebar_submenu_component_html_1;
    var SidebarItemsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            },
            function (sidebar_submenu_component_html_1_1) {
                sidebar_submenu_component_html_1 = sidebar_submenu_component_html_1_1;
            }],
        execute: function() {
            SidebarItemsComponent = (function () {
                function SidebarItemsComponent(element) {
                    this.element = element;
                }
                SidebarItemsComponent.prototype.ngAfterContentInit = function () {
                    this.$element = $(this.element.nativeElement);
                };
                SidebarItemsComponent.prototype.ngAfterViewInit = function () {
                    this.$element.accordion({
                        trigger: ".item.submenu, .item.submenu .title",
                        title: ".title"
                    });
                };
                __decorate([
                    core_1.Input("item"), 
                    __metadata('design:type', Object)
                ], SidebarItemsComponent.prototype, "item", void 0);
                SidebarItemsComponent = __decorate([
                    core_1.Component({
                        selector: "a.item.submenu",
                        template: sidebar_submenu_component_html_1.default,
                        directives: [router_deprecated_1.ROUTER_DIRECTIVES, SidebarItemsComponent]
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], SidebarItemsComponent);
                return SidebarItemsComponent;
            }());
            exports_1("SidebarItemsComponent", SidebarItemsComponent);
            exports_1("default",SidebarItemsComponent);
        }
    }
});

//# sourceMappingURL=sidebar-submenu.component.js.map
