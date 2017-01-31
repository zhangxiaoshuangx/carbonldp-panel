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
var app_content_service_1 = require("./../../app-content/app-content.service");
var errors_area_service_1 = require("carbonldp-panel/errors-area/errors-area.service");
var sparql_client_view_html_1 = require("./sparql-client.view.html!");
var SPARQLClientView = (function () {
    function SPARQLClientView(errorsAreaService, appContentService) {
        var _this = this;
        this.canDisplay = true;
        this.appContext = appContentService.activeApp.context;
        this.errorsAreaService = errorsAreaService;
        appContentService.onAppHasChanged.subscribe(function (app) {
            _this.appContext = appContentService.activeApp.context;
            _this.canDisplay = false;
            setTimeout(function () { _this.canDisplay = true; }, 0);
        });
    }
    SPARQLClientView.prototype.notifyErrorAreaService = function (error) {
        this.errorsAreaService.addError(error.title, error.content, error.statusCode, error.statusMessage, error.endpoint);
    };
    SPARQLClientView = __decorate([
        core_1.Component({
            selector: "cp-sparql-client-view",
            template: sparql_client_view_html_1.default,
            styles: [":host { display: block; }"],
        }), 
        __metadata('design:paramtypes', [errors_area_service_1.ErrorsAreaService, app_content_service_1.AppContentService])
    ], SPARQLClientView);
    return SPARQLClientView;
}());
exports.SPARQLClientView = SPARQLClientView;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SPARQLClientView;

//# sourceMappingURL=sparql-client.view.js.map
