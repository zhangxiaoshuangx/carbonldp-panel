System.register(["@angular/core", "jquery", "semantic-ui/semantic"], function(exports_1, context_1) {
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
    var core_1, jquery_1;
    var DropdownComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (jquery_1_1) {
                jquery_1 = jquery_1_1;
            },
            function (_1) {}],
        execute: function() {
            DropdownComponent = (function () {
                function DropdownComponent(element) {
                    this.element = element;
                    this.classes = "ui dropdown";
                }
                DropdownComponent.prototype.ngAfterViewInit = function () {
                    this.$element = jquery_1.default(this.element.nativeElement);
                    this.$element.dropdown({
                        on: "hover"
                    });
                };
                __decorate([
                    core_1.HostBinding("[class]"), 
                    __metadata('design:type', Object)
                ], DropdownComponent.prototype, "classes", void 0);
                DropdownComponent = __decorate([
                    core_1.Component({
                        selector: "sui-dropdown",
                        template: "<ng-content></ng-content>"
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], DropdownComponent);
                return DropdownComponent;
            }());
            exports_1("DropdownComponent", DropdownComponent);
            exports_1("default",DropdownComponent);
        }
    }
});

//# sourceMappingURL=dropdown.component.js.map
