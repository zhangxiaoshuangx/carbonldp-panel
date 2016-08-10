System.register(["@angular/core", "./tab.component", "./tabs.component.html!"], function(exports_1, context_1) {
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
    var core_1, tab_component_1, tabs_component_html_1;
    var TabsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (tab_component_1_1) {
                tab_component_1 = tab_component_1_1;
            },
            function (tabs_component_html_1_1) {
                tabs_component_html_1 = tabs_component_html_1_1;
            }],
        execute: function() {
            TabsComponent = (function () {
                function TabsComponent() {
                    this.activeTab = 0;
                    this.activeTabChange = new core_1.EventEmitter();
                    this.justChanged = false;
                    this.titles = [];
                }
                TabsComponent.prototype.ngAfterContentInit = function () {
                    this.reloadTitles();
                    this.activateTab(0);
                    this.tabs.changes.subscribe(this.reloadTitles);
                };
                TabsComponent.prototype.ngOnChanges = function (changes) {
                    if ("activeTab" in changes) {
                        this.justChanged = true;
                        this.activateTab(changes["activeTab"].currentValue);
                    }
                };
                TabsComponent.prototype.reloadTitles = function () {
                    this.titles = this.tabs.toArray().filter(function (tab) { return tab.title; }).map(function (tab) { return tab.title; });
                };
                TabsComponent.prototype.activateTab = function (index) {
                    var _this = this;
                    if (index === void 0) { index = 0; }
                    this.activeTab = index;
                    if (this.tabs) {
                        this.tabs.toArray().forEach(function (tab, index) {
                            tab.active = _this.activeTab === index;
                        });
                    }
                    if (!this.justChanged)
                        this.activeTabChange.emit(index);
                    else
                        this.justChanged = false;
                };
                TabsComponent.prototype.onTitleClick = function (titleIndex) {
                    this.activateTab(titleIndex);
                };
                __decorate([
                    core_1.ContentChildren(tab_component_1.TabComponent), 
                    __metadata('design:type', core_1.QueryList)
                ], TabsComponent.prototype, "tabs", void 0);
                __decorate([
                    core_1.Input("activeTab"), 
                    __metadata('design:type', Number)
                ], TabsComponent.prototype, "activeTab", void 0);
                __decorate([
                    core_1.Output("activeTabChange"), 
                    __metadata('design:type', core_1.EventEmitter)
                ], TabsComponent.prototype, "activeTabChange", void 0);
                TabsComponent = __decorate([
                    core_1.Component({
                        selector: "sui-tabs",
                        template: tabs_component_html_1.default,
                        styles: [":host { display:block; } "],
                        directives: [tab_component_1.TabComponent],
                    }), 
                    __metadata('design:paramtypes', [])
                ], TabsComponent);
                return TabsComponent;
            }());
            exports_1("TabsComponent", TabsComponent);
            exports_1("default",TabsComponent);
        }
    }
});

//# sourceMappingURL=tabs.component.js.map
