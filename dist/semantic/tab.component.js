"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
require("semantic-ui/semantic");
var TabComponent = (function () {
    function TabComponent() {
        this.active = false;
        this.title = "";
    }
    return TabComponent;
}());
__decorate([
    core_1.HostBinding("class.active"),
    __metadata("design:type", Boolean)
], TabComponent.prototype, "active", void 0);
__decorate([
    core_1.Input("title"),
    __metadata("design:type", String)
], TabComponent.prototype, "title", void 0);
TabComponent = __decorate([
    core_1.Component({
        selector: "sui-tab",
        template: "<ng-content></ng-content>",
        styles: [":host { display:block; } "],
        host: {
            class: "ui bottom attached tab segment"
        }
    })
], TabComponent);
exports.TabComponent = TabComponent;

//# sourceMappingURL=tab.component.js.map
