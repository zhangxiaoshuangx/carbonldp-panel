System.register(["@angular/core", "./relativize-uri.pipe", "./prefix-uri.pipe", "semantic-ui/semantic", "./resultset-table.component.html!", "./resultset-table.component.css!text"], function(exports_1, context_1) {
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
    var core_1, relativize_uri_pipe_1, prefix_uri_pipe_1, resultset_table_component_html_1, resultset_table_component_css_text_1;
    var ResultsetTableComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (relativize_uri_pipe_1_1) {
                relativize_uri_pipe_1 = relativize_uri_pipe_1_1;
            },
            function (prefix_uri_pipe_1_1) {
                prefix_uri_pipe_1 = prefix_uri_pipe_1_1;
            },
            function (_1) {},
            function (resultset_table_component_html_1_1) {
                resultset_table_component_html_1 = resultset_table_component_html_1_1;
            },
            function (resultset_table_component_css_text_1_1) {
                resultset_table_component_css_text_1 = resultset_table_component_css_text_1_1;
            }],
        execute: function() {
            ResultsetTableComponent = (function () {
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
                        pipes: [relativize_uri_pipe_1.RelativizeURIPipe, prefix_uri_pipe_1.PrefixURIPipe],
                    }), 
                    __metadata('design:paramtypes', [])
                ], ResultsetTableComponent);
                return ResultsetTableComponent;
            }());
            exports_1("ResultsetTableComponent", ResultsetTableComponent);
            exports_1("default",ResultsetTableComponent);
        }
    }
});

//# sourceMappingURL=resultset-table.component.js.map
