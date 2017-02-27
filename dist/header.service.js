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
var HeaderService = (function () {
    function HeaderService() {
        this._items = [];
        this._items = [];
    }
    Object.defineProperty(HeaderService.prototype, "items", {
        get: function () {
            return this._items;
        },
        enumerable: true,
        configurable: true
    });
    HeaderService.prototype.addItems = function (items) {
        var _this = this;
        items.forEach(function (item) { return _this.items.push(item); });
        this.sortItems(this.items);
    };
    HeaderService.prototype.addItem = function (item) {
        this.items.push(item);
        this.sortItems(this.items);
    };
    HeaderService.prototype.sortItems = function (items) {
        var _this = this;
        items.sort(function (itemA, itemB) {
            var indexA = "index" in itemA && typeof itemA.index === "number" && !isNaN(itemA.index) ? itemA.index : 0;
            var indexB = "index" in itemB && typeof itemB.index === "number" && !isNaN(itemB.index) ? itemB.index : 0;
            if (indexA > indexB)
                return 1;
            else if (indexA < indexB)
                return -1;
            else
                return 0;
        });
        items.filter(function (item) { return !!item.children; }).map(function (item) { return item.children; }).forEach(function (children) { return _this.sortItems(children); });
        return items;
    };
    HeaderService.prototype.clear = function () {
        this.items.splice(0, this.items.length);
    };
    return HeaderService;
}());
HeaderService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], HeaderService);
exports.HeaderService = HeaderService;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HeaderService;

//# sourceMappingURL=header.service.js.map
