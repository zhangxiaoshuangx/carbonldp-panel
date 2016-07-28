System.register(["./accordion.component", "./collapsible.directive"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var accordion_component_1, collapsible_directive_1;
    var SUI_COMPONENTS;
    return {
        setters:[
            function (accordion_component_1_1) {
                accordion_component_1 = accordion_component_1_1;
            },
            function (collapsible_directive_1_1) {
                collapsible_directive_1 = collapsible_directive_1_1;
            }],
        execute: function() {
            exports_1("SUI_COMPONENTS", SUI_COMPONENTS = [
                accordion_component_1.AccordionComponent,
                collapsible_directive_1.CollapsibleDirective,
                collapsible_directive_1.CollapsibleTitleDirective,
                collapsible_directive_1.CollapsibleContentDirective,
            ]);
        }
    }
});

//# sourceMappingURL=semantic.js.map
