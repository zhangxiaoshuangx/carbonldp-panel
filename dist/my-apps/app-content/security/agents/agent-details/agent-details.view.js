System.register(["@angular/core", "@angular/router", "carbonldp-panel/my-apps/app-content/app-content.service", "./agent-details.component", "./agent-details.view.html!"], function(exports_1, context_1) {
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
    var core_1, router_1, app_content_service_1, agent_details_component_1, agent_details_view_html_1;
    var AgentDetailsView;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (app_content_service_1_1) {
                app_content_service_1 = app_content_service_1_1;
            },
            function (agent_details_component_1_1) {
                agent_details_component_1 = agent_details_component_1_1;
            },
            function (agent_details_view_html_1_1) {
                agent_details_view_html_1 = agent_details_view_html_1_1;
            }],
        execute: function() {
            AgentDetailsView = (function () {
                function AgentDetailsView(router, route, appContentService) {
                    var _this = this;
                    this.canDisplay = true;
                    this.mode = agent_details_component_1.Modes.READ;
                    this.router = router;
                    this.activatedRoute = route;
                    this.app = appContentService.activeApp;
                    appContentService.onAppHasChanged.subscribe(function (app) {
                        _this.app = app;
                        _this.canDisplay = false;
                        setTimeout(function () { _this.canDisplay = true; }, 0);
                    });
                }
                AgentDetailsView.prototype.ngOnInit = function () {
                    var _this = this;
                    this.activatedRoute.data.forEach(function (data) {
                        _this.agent = data.agent;
                    });
                    this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.mode = params["mode"] ? params["mode"] : agent_details_component_1.Modes.READ;
                    });
                };
                AgentDetailsView.prototype.goToAgent = function () {
                    this.router.navigate(["../"]);
                };
                AgentDetailsView = __decorate([
                    core_1.Component({
                        selector: "cp-agent-details-view",
                        template: agent_details_view_html_1.default,
                        styles: [":host { display: block; }"]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, app_content_service_1.AppContentService])
                ], AgentDetailsView);
                return AgentDetailsView;
            }());
            exports_1("AgentDetailsView", AgentDetailsView);
            exports_1("default",AgentDetailsView);
        }
    }
});

//# sourceMappingURL=agent-details.view.js.map
