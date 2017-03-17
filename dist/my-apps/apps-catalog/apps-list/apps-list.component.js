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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("semantic-ui/semantic");
var AppsListComponent = (function () {
    function AppsListComponent() {
        this.openApp = new core_1.EventEmitter();
        this.deleteApp = new core_1.EventEmitter();
        this.headers = [{ name: "Name", value: "name" }, { name: "Created", value: "created" }, { name: "Modified", value: "modified" }];
        this.sortedColumn = null;
        this.ascending = false;
    }
    AppsListComponent.prototype.sortColumn = function (header) {
        var _this = this;
        if (this.sortedColumn === header.value)
            this.ascending = !this.ascending;
        this.sortedColumn = header.value;
        this.apps.sort(function (appA, appB) {
            if (appA[_this.sortedColumn] > appB[_this.sortedColumn])
                return _this.ascending ? -1 : 1;
            if (appA[_this.sortedColumn] < appB[_this.sortedColumn])
                return _this.ascending ? 1 : -1;
            return 0;
        });
    };
    AppsListComponent.prototype.onOpenApp = function (appContext) {
        this.openApp.emit(appContext);
    };
    AppsListComponent.prototype.onDeleteApp = function (appContext) {
        this.deleteApp.emit(appContext);
    };
    return AppsListComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], AppsListComponent.prototype, "apps", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], AppsListComponent.prototype, "openApp", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], AppsListComponent.prototype, "deleteApp", void 0);
AppsListComponent = __decorate([
    core_1.Component({
        selector: "cp-apps-list",
        templateUrl: "./apps-list.component.html",
        styleUrls: ["./apps-list.component.scss"],
    }),
    __metadata("design:paramtypes", [])
], AppsListComponent);
exports.AppsListComponent = AppsListComponent;
