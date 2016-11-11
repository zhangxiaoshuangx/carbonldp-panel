System.register(["@angular/core", "carbonldp/App", "semantic-ui/semantic", "./security.component.html!"], function(exports_1, context_1) {
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
    var core_1, App, security_component_html_1;
    var SecurityComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (App_1) {
                App = App_1;
            },
            function (_1) {},
            function (security_component_html_1_1) {
                security_component_html_1 = security_component_html_1_1;
            }],
        execute: function() {
            SecurityComponent = (function () {
                function SecurityComponent(element) {
                    this.element = element;
                    this.$element = $(this.element.nativeElement);
                }
                SecurityComponent.prototype.ngAfterViewInit = function () {
                    this.$element.find(".security.menu .item").tab();
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', App.Context)
                ], SecurityComponent.prototype, "appContext", void 0);
                SecurityComponent = __decorate([
                    core_1.Component({
                        selector: "cp-security",
                        template: security_component_html_1.default,
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], SecurityComponent);
                return SecurityComponent;
            }());
            exports_1("SecurityComponent", SecurityComponent);
            exports_1("default",SecurityComponent);
        }
    }
});

//# sourceMappingURL=security.component.js.map
