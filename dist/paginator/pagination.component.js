System.register(["@angular/core", "./pagination.component.html!"], function(exports_1, context_1) {
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
    var core_1, pagination_component_html_1;
    var PaginationComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (pagination_component_html_1_1) {
                pagination_component_html_1 = pagination_component_html_1_1;
            }],
        execute: function() {
            PaginationComponent = (function () {
                function PaginationComponent() {
                    this.pages = [];
                    this._activePage = 0;
                    this.elementsPerPage = 5;
                    this._totalElements = 0;
                    this.onPageChange = new core_1.EventEmitter();
                }
                Object.defineProperty(PaginationComponent.prototype, "activePage", {
                    get: function () {
                        return this._activePage;
                    },
                    set: function (value) {
                        this._activePage = value;
                        this.onPageChange.emit(value);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PaginationComponent.prototype, "totalElements", {
                    get: function () {
                        return this._totalElements;
                    },
                    set: function (value) {
                        this._totalElements = value;
                        var i = 0, totalPages = this.totalElements === 0 ? 0 : Math.round(this.totalElements / this.elementsPerPage);
                        this.pages = [];
                        for (var i_1 = 0; i_1 < totalPages; i_1++) {
                            this.pages.push(i_1);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                ;
                PaginationComponent.prototype.pageClick = function (index) {
                    this.activePage = index;
                };
                PaginationComponent.prototype.previous = function () {
                    this.activePage > 0 ? this.activePage-- : this.activePage;
                };
                PaginationComponent.prototype.next = function () {
                    this.activePage + 1 < this.pages.length ? this.activePage++ : this.activePage;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], PaginationComponent.prototype, "elementsPerPage", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number), 
                    __metadata('design:paramtypes', [Number])
                ], PaginationComponent.prototype, "totalElements", null);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], PaginationComponent.prototype, "onPageChange", void 0);
                PaginationComponent = __decorate([
                    core_1.Component({
                        selector: "cp-pagination",
                        template: pagination_component_html_1.default,
                        styles: [":host{ display:block; }"],
                    }), 
                    __metadata('design:paramtypes', [])
                ], PaginationComponent);
                return PaginationComponent;
            }());
            exports_1("PaginationComponent", PaginationComponent);
            exports_1("default",PaginationComponent);
        }
    }
});

//# sourceMappingURL=pagination.component.js.map
