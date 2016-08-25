System.register(["@angular/core", "jquery", "semantic-ui/semantic", "./header-item.component.html!", "./header-item.component.css!text"], function(exports_1, context_1) {
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
    var core_1, jquery_1, header_item_component_html_1, header_item_component_css_text_1;
    var HeaderItemComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (jquery_1_1) {
                jquery_1 = jquery_1_1;
            },
            function (_1) {},
            function (header_item_component_html_1_1) {
                header_item_component_html_1 = header_item_component_html_1_1;
            },
            function (header_item_component_css_text_1_1) {
                header_item_component_css_text_1 = header_item_component_css_text_1_1;
            }],
        execute: function() {
            HeaderItemComponent = (function () {
                //private routerService:RouterService;
                function HeaderItemComponent(element) {
                    //constructor( element:ElementRef, routerService:RouterService ) {
                    this.element = element;
                    //this.routerService = routerService;
                }
                HeaderItemComponent.prototype.ngAfterViewInit = function () {
                    this.$element = jquery_1.default(this.element.nativeElement);
                    this.createDropdownMenus();
                };
                HeaderItemComponent.prototype.createDropdownMenus = function () {
                    if (!this.item.children)
                        return;
                    this.$element.find(".ui.dropdown").dropdown({
                        on: "hover",
                    });
                };
                __decorate([
                    core_1.Input("item"), 
                    __metadata('design:type', Object)
                ], HeaderItemComponent.prototype, "item", void 0);
                HeaderItemComponent = __decorate([
                    core_1.Component({
                        selector: "cp-header-item",
                        template: header_item_component_html_1.default,
                        styles: [header_item_component_css_text_1.default],
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], HeaderItemComponent);
                return HeaderItemComponent;
            }());
            exports_1("HeaderItemComponent", HeaderItemComponent);
            exports_1("default",HeaderItemComponent);
        }
    }
});

//# sourceMappingURL=header-item.component.js.map
