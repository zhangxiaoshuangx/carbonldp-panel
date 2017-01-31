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
var apps_catalog_view_html_1 = require("./apps-catalog.view.html!");
var AppsCatalogView = (function () {
    function AppsCatalogView() {
    }
    AppsCatalogView = __decorate([
        core_1.Component({
            selector: "cp-apps-catalog-view",
            template: apps_catalog_view_html_1.default,
            styles: [":host { display: block; }"],
        }), 
        __metadata('design:paramtypes', [])
    ], AppsCatalogView);
    return AppsCatalogView;
}());
exports.AppsCatalogView = AppsCatalogView;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AppsCatalogView;

//# sourceMappingURL=apps-catalog.view.js.map
