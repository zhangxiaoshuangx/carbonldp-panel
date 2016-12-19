System.register(['@angular/core', '@angular/common', "./tab.component", "./tabs.component", "./accordion.component", "./collapsible.directive"], function(exports_1, context_1) {
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
    var core_1, common_1, tab_component_1, tabs_component_1, accordion_component_1, collapsible_directive_1;
    var SemanticModule;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (tab_component_1_1) {
                tab_component_1 = tab_component_1_1;
            },
            function (tabs_component_1_1) {
                tabs_component_1 = tabs_component_1_1;
            },
            function (accordion_component_1_1) {
                accordion_component_1 = accordion_component_1_1;
            },
            function (collapsible_directive_1_1) {
                collapsible_directive_1 = collapsible_directive_1_1;
            }],
        execute: function() {
            SemanticModule = (function () {
                function SemanticModule() {
                }
                SemanticModule = __decorate([
                    core_1.NgModule({
                        imports: [common_1.CommonModule],
                        declarations: [
                            tab_component_1.TabComponent,
                            tabs_component_1.TabsComponent,
                            accordion_component_1.AccordionComponent,
                            collapsible_directive_1.CollapsibleDirective,
                            collapsible_directive_1.CollapsibleTitleDirective,
                            collapsible_directive_1.CollapsibleContentDirective
                        ],
                        exports: [
                            tab_component_1.TabComponent,
                            tabs_component_1.TabsComponent,
                            accordion_component_1.AccordionComponent,
                            collapsible_directive_1.CollapsibleDirective,
                            collapsible_directive_1.CollapsibleTitleDirective,
                            collapsible_directive_1.CollapsibleContentDirective
                        ],
                    }), 
                    __metadata('design:paramtypes', [])
                ], SemanticModule);
                return SemanticModule;
            }());
            exports_1("SemanticModule", SemanticModule);
        }
    }
});

//# sourceMappingURL=semantic.module.js.map
