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
var resultset_table_component_html_1 = require("./resultset-table.component.html!");
var resultset_table_component_css_text_1 = require("./resultset-table.component.css!text");
var ResultsetTableComponent = (function () {
    function ResultsetTableComponent() {
        this.resultsetChange = new core_1.EventEmitter();
        this.sortedColumn = null;
        this.ascending = false;
    }
    ResultsetTableComponent.prototype.ngOnChanges = function (changeRecord) {
        if ("resultset" in changeRecord) {
            var change = changeRecord.resultset;
            if (change.currentValue !== change.previousValue) {
                this.bindings = this.mapBindings(change.currentValue);
            }
        }
    };
    ResultsetTableComponent.prototype.sortColumn = function (columnName) {
        var _this = this;
        if (this.sortedColumn === columnName)
            this.ascending = !this.ascending;
        this.sortedColumn = columnName;
        var index = this.resultset.head.vars.indexOf(columnName);
        this.bindings.sort(function (bindingA, bindingB) {
            if (!bindingA[index])
                return _this.ascending ? 1 : -1;
            if (!bindingB[index])
                return _this.ascending ? -1 : 1;
            if (bindingA[index].value > bindingB[index].value)
                return _this.ascending ? -1 : 1;
            if (bindingA[index].value < bindingB[index].value)
                return _this.ascending ? 1 : -1;
            return 0;
        });
    };
    ResultsetTableComponent.prototype.mapBindings = function (resultset) {
        return resultset.results.bindings.map(function (bindingObject) {
            var bindingArray = [];
            for (var _i = 0, _a = resultset.head.vars; _i < _a.length; _i++) {
                var varName = _a[_i];
                bindingArray.push(bindingObject[varName]);
            }
            return bindingArray;
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ResultsetTableComponent.prototype, "query", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ResultsetTableComponent.prototype, "resultset", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ResultsetTableComponent.prototype, "prefixes", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ResultsetTableComponent.prototype, "resultsetChange", void 0);
    ResultsetTableComponent = __decorate([
        core_1.Component({
            selector: "cp-resultset-table",
            template: resultset_table_component_html_1.default,
            styles: [resultset_table_component_css_text_1.default],
        }), 
        __metadata('design:paramtypes', [])
    ], ResultsetTableComponent);
    return ResultsetTableComponent;
}());
exports.ResultsetTableComponent = ResultsetTableComponent;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ResultsetTableComponent;

//# sourceMappingURL=resultset-table.component.js.map
