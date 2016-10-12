System.register(["@angular/core", "semantic-ui/semantic", "./apps-list.component.html!", "./apps-list.component.css!text"], function(exports_1, context_1) {
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
    var core_1, apps_list_component_html_1, apps_list_component_css_text_1;
    var AppsListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (_1) {},
            function (apps_list_component_html_1_1) {
                apps_list_component_html_1 = apps_list_component_html_1_1;
            },
            function (apps_list_component_css_text_1_1) {
                apps_list_component_css_text_1 = apps_list_component_css_text_1_1;
            }],
        execute: function() {
            AppsListComponent = (function () {
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
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], AppsListComponent.prototype, "apps", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], AppsListComponent.prototype, "openApp", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], AppsListComponent.prototype, "deleteApp", void 0);
                AppsListComponent = __decorate([
                    core_1.Component({
                        selector: "cp-apps-list",
                        template: apps_list_component_html_1.default,
                        styles: [apps_list_component_css_text_1.default],
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppsListComponent);
                return AppsListComponent;
            }());
            exports_1("AppsListComponent", AppsListComponent);
            exports_1("default",AppsListComponent);
        }
    }
});

//# sourceMappingURL=apps-list.component.js.map
