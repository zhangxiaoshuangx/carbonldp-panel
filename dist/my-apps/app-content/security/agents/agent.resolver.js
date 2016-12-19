System.register(['@angular/core', '@angular/common', '@angular/router', "./agents.service", "carbonldp-panel/my-apps/app-content/app-content.service"], function(exports_1, context_1) {
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
    var core_1, common_1, router_1, agents_service_1, app_content_service_1;
    var AgentResolver;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (agents_service_1_1) {
                agents_service_1 = agents_service_1_1;
            },
            function (app_content_service_1_1) {
                app_content_service_1 = app_content_service_1_1;
            }],
        execute: function() {
            AgentResolver = (function () {
                function AgentResolver(router, route, agentsService, appContentService, location) {
                    this.location = location;
                    this.router = router;
                    this.activatedRoute = route;
                    this.agentsService = agentsService;
                    this.appContentService = appContentService;
                }
                // TODO: Change the use of location to the righ way of navigate with an activatedRoute, check if this 'bug' has been resolved on further angular versions
                AgentResolver.prototype.resolve = function (route) {
                    var _this = this;
                    var slug = route.params["agent-slug"];
                    return this.agentsService.get(slug, this.appContentService.activeApp.context).then(function (agent) {
                        return agent;
                    }).catch(function (error) {
                        var url = _this.location.path(), lastSlashIdx = url.lastIndexOf("/"), finalURL = url.substr(0, lastSlashIdx) + "/agent-not-found";
                        _this.router.navigate([finalURL]);
                        return false;
                    });
                };
                AgentResolver = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, agents_service_1.AgentsService, app_content_service_1.AppContentService, common_1.Location])
                ], AgentResolver);
                return AgentResolver;
            }());
            exports_1("AgentResolver", AgentResolver);
        }
    }
});

//# sourceMappingURL=agent.resolver.js.map
