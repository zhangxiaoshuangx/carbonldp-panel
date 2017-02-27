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
var AppsTilesComponent = (function () {
    function AppsTilesComponent() {
        this.deleteApp = new core_1.EventEmitter();
    }
    AppsTilesComponent.prototype.onDeleteApp = function (app) {
        this.deleteApp.emit(app);
    };
    return AppsTilesComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], AppsTilesComponent.prototype, "apps", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], AppsTilesComponent.prototype, "deleteApp", void 0);
AppsTilesComponent = __decorate([
    core_1.Component({
        selector: "cp-apps-tiles",
        templateUrl: "./apps-tiles.component.html",
        styles: [":host { display: block; }"],
    }),
    __metadata("design:paramtypes", [])
], AppsTilesComponent);
exports.AppsTilesComponent = AppsTilesComponent;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AppsTilesComponent;

//# sourceMappingURL=apps-tiles.component.js.map
