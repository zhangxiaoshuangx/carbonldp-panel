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
var router_1 = require("@angular/router");
var my_apps_sidebar_service_1 = require("./../my-apps-sidebar.service");
var app_content_service_1 = require("./app-content.service");
var AppContentView = (function () {
    function AppContentView(router, route, myAppsSidebarService, appContentService) {
        this.router = router;
        this.activatedRoute = route;
        this.myAppsSidebarService = myAppsSidebarService;
        this.appContentService = appContentService;
    }
    AppContentView.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.data.forEach(function (data) {
            _this.app = data.app;
            _this.appContentService.activeApp = _this.app;
            _this.myAppsSidebarService.addApp(_this.app);
            _this.myAppsSidebarService.openApp(_this.app);
        });
    };
    AppContentView = __decorate([
        core_1.Component({
            selector: "cp-app-content",
            template: require("./app-content.view.html"),
            styles: [require("./app-content.view.css")],
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, my_apps_sidebar_service_1.MyAppsSidebarService, app_content_service_1.AppContentService])
    ], AppContentView);
    return AppContentView;
}());
exports.AppContentView = AppContentView;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AppContentView;

//# sourceMappingURL=app-content.view.js.map
