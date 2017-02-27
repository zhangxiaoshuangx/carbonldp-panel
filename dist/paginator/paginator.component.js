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
var PaginatorComponent = (function () {
    function PaginatorComponent() {
        this.pages = [];
        this._activePage = 0;
        this.elementsPerPage = 5;
        this.totalElements = 0;
        this.onPageChange = new core_1.EventEmitter();
    }
    Object.defineProperty(PaginatorComponent.prototype, "activePage", {
        get: function () {
            return this._activePage;
        },
        set: function (value) {
            this._activePage = value;
            this.onPageChange.emit(this.activePage);
        },
        enumerable: true,
        configurable: true
    });
    ;
    PaginatorComponent.prototype.ngOnChanges = function (changes) {
        if ((!!changes["totalElements"] && changes["totalElements"].currentValue !== changes["totalElements"].previousValue) ||
            (!!changes["elementsPerPage"] && changes["elementsPerPage"].currentValue !== changes["elementsPerPage"].previousValue)) {
            this.updatePages();
        }
    };
    PaginatorComponent.prototype.pageClick = function (index) {
        this.activePage = index;
    };
    PaginatorComponent.prototype.previous = function () {
        this.activePage > 0 ? this.activePage-- : this.activePage;
    };
    PaginatorComponent.prototype.next = function () {
        this.activePage + 1 < this.pages.length ? this.activePage++ : this.activePage;
    };
    PaginatorComponent.prototype.updatePages = function () {
        this.pages = this.getPages();
        if (this.activePage >= this.pages.length && this.pages.length > 0) {
            this.activePage = this.pages[this.pages.length - 1];
        }
    };
    PaginatorComponent.prototype.getPages = function () {
        var pages = [];
        var totalPages = this.totalElements === 0 ? 0 : Math.ceil(this.totalElements / this.elementsPerPage);
        for (var i = 0; i < totalPages; i++) {
            pages.push(i);
        }
        return pages;
    };
    return PaginatorComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], PaginatorComponent.prototype, "activePage", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], PaginatorComponent.prototype, "elementsPerPage", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], PaginatorComponent.prototype, "totalElements", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], PaginatorComponent.prototype, "onPageChange", void 0);
PaginatorComponent = __decorate([
    core_1.Component({
        selector: "cp-paginator",
        templateUrl: "./paginator.component.html",
        styles: [":host{ display:block; }"],
    }),
    __metadata("design:paramtypes", [])
], PaginatorComponent);
exports.PaginatorComponent = PaginatorComponent;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PaginatorComponent;

//# sourceMappingURL=paginator.component.js.map
