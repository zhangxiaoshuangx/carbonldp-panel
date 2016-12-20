System.register(["@angular/core", "carbonldp/App", "./agents.component.html!", "./agents.component.css!text"], function(exports_1, context_1) {
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
    var core_1, App, agents_component_html_1, agents_component_css_text_1;
    var AgentsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (App_1) {
                App = App_1;
            },
            function (agents_component_html_1_1) {
                agents_component_html_1 = agents_component_html_1_1;
            },
            function (agents_component_css_text_1_1) {
                agents_component_css_text_1 = agents_component_css_text_1_1;
            }],
        execute: function() {
            AgentsComponent = (function () {
                function AgentsComponent() {
                }
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', App.Context)
                ], AgentsComponent.prototype, "appContext", void 0);
                AgentsComponent = __decorate([
                    core_1.Component({
                        selector: "cp-agents",
                        template: agents_component_html_1.default,
                        styles: [agents_component_css_text_1.default],
                    }), 
                    __metadata('design:paramtypes', [])
                ], AgentsComponent);
                return AgentsComponent;
            }());
            exports_1("AgentsComponent", AgentsComponent);
            exports_1("default",AgentsComponent);
        }
    }
});

//# sourceMappingURL=agents.component.js.map
