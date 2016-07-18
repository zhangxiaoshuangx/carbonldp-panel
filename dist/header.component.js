System.register(["@angular/core", "@angular/common", "@angular/router-deprecated", "carbon-panel/header.service", "carbon-panel/header-item.component", "jquery", "semantic-ui/semantic", "./header.component.html!", "./header.component.css!text"], function(exports_1, context_1) {
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
    var core_1, common_1, router_deprecated_1, header_service_1, header_item_component_1, jquery_1, header_component_html_1, header_component_css_text_1;
    var HeaderComponent;
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
            function (header_service_1_1) {
                header_service_1 = header_service_1_1;
            },
            function (header_item_component_1_1) {
                header_item_component_1 = header_item_component_1_1;
            },
            function (jquery_1_1) {
                jquery_1 = jquery_1_1;
            },
            function (_1) {},
            function (header_component_html_1_1) {
                header_component_html_1 = header_component_html_1_1;
            },
            function (header_component_css_text_1_1) {
                header_component_css_text_1 = header_component_css_text_1_1;
            }],
        execute: function() {
            HeaderComponent = (function () {
                function HeaderComponent(element, headerService) {
                    this.element = element;
                    this.headerService = headerService;
                }
                HeaderComponent.prototype.ngAfterContentInit = function () {
                    this.$element = jquery_1.default(this.element.nativeElement);
                    this.createCollapsableMenus();
                };
                HeaderComponent.prototype.createCollapsableMenus = function () {
                    var verticalMenu = this.$element.find(".ui.vertical.menu");
                    this.$element.find(".item.open").on("click", function (e) {
                        e.preventDefault();
                        verticalMenu.toggle();
                    });
                    verticalMenu.toggle();
                };
                HeaderComponent = __decorate([
                    core_1.Component({
                        selector: "cp-header",
                        template: header_component_html_1.default,
                        styles: [header_component_css_text_1.default],
                        directives: [common_1.CORE_DIRECTIVES, router_deprecated_1.ROUTER_DIRECTIVES, header_item_component_1.HeaderItemComponent]
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, header_service_1.HeaderService])
                ], HeaderComponent);
                return HeaderComponent;
            }());
            exports_1("HeaderComponent", HeaderComponent);
            exports_1("default",HeaderComponent);
        }
    }
});

//# sourceMappingURL=header.component.js.map
