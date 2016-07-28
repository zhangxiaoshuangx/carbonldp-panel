System.register(["./semantic/accordion.component", "./semantic/collapsible.directive", "./semantic/tabs.component", "./semantic/tab.component"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var accordion_component_1, collapsible_directive_1, tabs_component_1, tab_component_1;
    var SUI_COMPONENTS;
    return {
        setters:[
            function (accordion_component_1_1) {
                accordion_component_1 = accordion_component_1_1;
            },
            function (collapsible_directive_1_1) {
                collapsible_directive_1 = collapsible_directive_1_1;
            },
            function (tabs_component_1_1) {
                tabs_component_1 = tabs_component_1_1;
            },
            function (tab_component_1_1) {
                tab_component_1 = tab_component_1_1;
            }],
        execute: function() {
            exports_1("SUI_COMPONENTS", SUI_COMPONENTS = [
                accordion_component_1.AccordionComponent,
                collapsible_directive_1.CollapsibleDirective,
                collapsible_directive_1.CollapsibleTitleDirective,
                collapsible_directive_1.CollapsibleContentDirective,
                tabs_component_1.TabsComponent,
                tab_component_1.TabComponent
            ]);
        }
    }
});

//# sourceMappingURL=semantic.js.map
