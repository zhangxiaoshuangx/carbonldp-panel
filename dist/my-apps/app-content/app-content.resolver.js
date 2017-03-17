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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var App = require("./app");
var app_context_service_1 = require("./../app-context.service");
var app_content_service_1 = require("./app-content.service");
var AppContentResolver = (function () {
    function AppContentResolver(router, route, appContextService, appContentService) {
        this.router = router;
        this.activatedRoute = route;
        this.appContextService = appContextService;
        this.appContentService = appContentService;
    }
    AppContentResolver.prototype.resolve = function (route) {
        var _this = this;
        var slug = route.params["slug"];
        return this.appContextService.get(slug).then(function (appContext) {
            var app = App.Factory.createFrom(appContext);
            _this.appContentService.activeApp = app;
            return app;
        }).catch(function (error) {
            console.error(error);
            _this.router.navigate(["my-apps", "app-not-found"]);
            return false;
        });
    };
    return AppContentResolver;
}());
AppContentResolver = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router, router_1.ActivatedRoute, app_context_service_1.AppContextService, app_content_service_1.AppContentService])
], AppContentResolver);
exports.AppContentResolver = AppContentResolver;
