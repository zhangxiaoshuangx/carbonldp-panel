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
var SidebarItemsComponent = (function () {
    function SidebarItemsComponent(routerService) {
        this.routerService = routerService;
    }
    __decorate([
        core_1.Input("items"), 
        __metadata('design:type', Array)
    ], SidebarItemsComponent.prototype, "items", void 0);
    SidebarItemsComponent = __decorate([
        core_1.Component({
            selector: "cp-sidebar-items",
            templateUrl: "./sidebar-items.component.html",
            styleUrls: ["./sidebar-items.component.scss"],
        }), 
        __metadata('design:paramtypes', [router_service_1.RouterService])
    ], SidebarItemsComponent);
    return SidebarItemsComponent;
}());
exports.SidebarItemsComponent = SidebarItemsComponent;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SidebarItemsComponent;

//# sourceMappingURL=sidebar-items.component.js.map
