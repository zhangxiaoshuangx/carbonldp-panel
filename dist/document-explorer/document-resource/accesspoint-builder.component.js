System.register(["@angular/core", "semantic-ui/semantic", "./accesspoint-builder.component.html!"], function(exports_1, context_1) {
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
    var core_1, accesspoint_builder_component_html_1;
    var AccessPointBuilderComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (_1) {},
            function (accesspoint_builder_component_html_1_1) {
                accesspoint_builder_component_html_1 = accesspoint_builder_component_html_1_1;
            }],
        execute: function() {
            AccessPointBuilderComponent = (function () {
                function AccessPointBuilderComponent() {
                    this.appURI = "";
                }
                AccessPointBuilderComponent.prototype.ngAfterViewInit = function () {
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], AccessPointBuilderComponent.prototype, "appURI", void 0);
                AccessPointBuilderComponent = __decorate([
                    core_1.Component({
                        selector: "cp-accesspoint-builder",
                        template: accesspoint_builder_component_html_1.default,
                        styles: [":host { display:block; }"],
                    }), 
                    __metadata('design:paramtypes', [])
                ], AccessPointBuilderComponent);
                return AccessPointBuilderComponent;
            }());
            exports_1("AccessPointBuilderComponent", AccessPointBuilderComponent);
            exports_1("default",AccessPointBuilderComponent);
        }
    }
});

//# sourceMappingURL=accesspoint-builder.component.js.map
