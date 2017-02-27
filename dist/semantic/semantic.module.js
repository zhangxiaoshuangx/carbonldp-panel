"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
//Components
var tab_component_1 = require("./tab.component");
var tabs_component_1 = require("./tabs.component");
var accordion_component_1 = require("./accordion.component");
var collapsible_directive_1 = require("./collapsible.directive");
var SemanticModule = (function () {
    function SemanticModule() {
    }
    return SemanticModule;
}());
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
    })
], SemanticModule);
exports.SemanticModule = SemanticModule;

//# sourceMappingURL=semantic.module.js.map
