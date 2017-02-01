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
var router_service_1 = require("carbonldp-panel/router.service");
var jquery_1 = require("jquery");
require("semantic-ui/semantic");
var HeaderItemComponent = (function () {
    function HeaderItemComponent(element, routerService) {
        this.element = element;
        this.routerService = routerService;
    }
    HeaderItemComponent.prototype.ngAfterViewInit = function () {
        this.$element = jquery_1.default(this.element.nativeElement);
        this.createDropdownMenus();
    };
    HeaderItemComponent.prototype.createDropdownMenus = function () {
        if (!this.item.children)
            return;
        this.$element.find(".ui.dropdown").dropdown({
            on: "hover",
        });
    };
    __decorate([
        core_1.Input("item"), 
        __metadata('design:type', Object)
    ], HeaderItemComponent.prototype, "item", void 0);
    HeaderItemComponent = __decorate([
        core_1.Component({
            selector: "cp-header-item",
            templateUrl: "./header-item.component.html",
            styleUrls: ["./header-item.component.scss"],
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, router_service_1.RouterService])
    ], HeaderItemComponent);
    return HeaderItemComponent;
}());
exports.HeaderItemComponent = HeaderItemComponent;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HeaderItemComponent;

//# sourceMappingURL=header-item.component.js.map
