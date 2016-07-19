System.register(["@angular/core", "../app-action-buttons/app-action-buttons.component", "./app-tile.component", "semantic-ui/semantic", "./apps-tiles.component.html!"], function(exports_1, context_1) {
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
    var core_1, app_action_buttons_component_1, app_tile_component_1, apps_tiles_component_html_1;
    var AppsTilesComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (app_action_buttons_component_1_1) {
                app_action_buttons_component_1 = app_action_buttons_component_1_1;
            },
            function (app_tile_component_1_1) {
                app_tile_component_1 = app_tile_component_1_1;
            },
            function (_1) {},
            function (apps_tiles_component_html_1_1) {
                apps_tiles_component_html_1 = apps_tiles_component_html_1_1;
            }],
        execute: function() {
            AppsTilesComponent = (function () {
                function AppsTilesComponent() {
                    this.deleteApp = new core_1.EventEmitter();
                }
                AppsTilesComponent.prototype.onDeleteApp = function (app) {
                    this.deleteApp.emit(app);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], AppsTilesComponent.prototype, "apps", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], AppsTilesComponent.prototype, "deleteApp", void 0);
                AppsTilesComponent = __decorate([
                    core_1.Component({
                        selector: "cp-apps-tiles",
                        template: apps_tiles_component_html_1.default,
                        styles: [":host { display: block; }"],
                        directives: [app_action_buttons_component_1.AppActionButtonsComponent, app_tile_component_1.AppTileComponent],
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppsTilesComponent);
                return AppsTilesComponent;
            }());
            exports_1("AppsTilesComponent", AppsTilesComponent);
            exports_1("default",AppsTilesComponent);
        }
    }
});

//# sourceMappingURL=apps-tiles.component.js.map
