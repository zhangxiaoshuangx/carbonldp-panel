System.register(["@angular/core", "./collapsible.directive", "semantic-ui/semantic"], function(exports_1, context_1) {
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
    var core_1, collapsible_directive_1;
    var AccordionComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (collapsible_directive_1_1) {
                collapsible_directive_1 = collapsible_directive_1_1;
            },
            function (_1) {}],
        execute: function() {
            AccordionComponent = (function () {
                function AccordionComponent() {
                }
                AccordionComponent.prototype.ngAfterContentInit = function () {
                    this.subscribeBlocks();
                    this.blocks.changes.subscribe(this.subscribeBlocks);
                };
                AccordionComponent.prototype.subscribeBlocks = function () {
                    var blockArray = this.blocks.toArray();
                    for (var i = 0, length_1 = blockArray.length; i < length_1; i++) {
                        var block = blockArray[i];
                        block.activeChange.subscribe(this.onBlockActive.bind(this, block));
                    }
                };
                AccordionComponent.prototype.onBlockActive = function (triggeredBlock, active) {
                    if (!active)
                        return;
                    this.blocks.forEach(function (block) {
                        if (block === triggeredBlock)
                            return;
                        block.active = false;
                    });
                };
                __decorate([
                    core_1.ContentChildren(collapsible_directive_1.CollapsibleDirective), 
                    __metadata('design:type', core_1.QueryList)
                ], AccordionComponent.prototype, "blocks", void 0);
                AccordionComponent = __decorate([
                    core_1.Component({
                        selector: "sui-accordion",
                        template: "<ng-content></ng-content>",
                        styles: [":host { display:block; } "],
                        host: {
                            class: "ui accordion"
                        },
                    }), 
                    __metadata('design:paramtypes', [])
                ], AccordionComponent);
                return AccordionComponent;
            }());
            exports_1("AccordionComponent", AccordionComponent);
            exports_1("default",AccordionComponent);
        }
    }
});

//# sourceMappingURL=accordion.component.js.map
