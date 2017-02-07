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
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var app_content_service_1 = require("carbonldp-panel/my-apps/app-content/app-content.service");
var agent_details_component_1 = require("../agent-details/agent-details.component");
var AgentCreatorView = (function () {
    function AgentCreatorView(router, route, appContentService, location) {
        var _this = this;
        this.location = location;
        this.canDisplay = true;
        this.modes = agent_details_component_1.Modes;
        this.router = router;
        this.activatedRoute = route;
        this.app = appContentService.activeApp;
        appContentService.onAppHasChanged.subscribe(function (app) {
            _this.app = app;
            _this.canDisplay = false;
            setTimeout(function () { _this.canDisplay = true; }, 0);
        });
    }
    // TODO: Change the use of location to the righ way of navigate with an activatedRoute, check if this 'bug' has been resolved on further angular versions
    AgentCreatorView.prototype.goToAgents = function () {
        var url = this.location.path(), lastSlashIdx = url.lastIndexOf("/"), finalURL = url.substr(0, lastSlashIdx);
        this.router.navigate([finalURL]);
    };
    AgentCreatorView = __decorate([
        core_1.Component({
            selector: "cp-agent-creator-view",
            template: require("./agent-creator.view.html"),
            styles: [":host { display: block; }"]
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, app_content_service_1.AppContentService, common_1.Location])
    ], AgentCreatorView);
    return AgentCreatorView;
}());
exports.AgentCreatorView = AgentCreatorView;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AgentCreatorView;

//# sourceMappingURL=agent-creator.view.js.map
