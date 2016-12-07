System.register(["@angular/core", "carbonldp/Carbon", "carbonldp/Utils"], function(exports_1, context_1) {
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
    var core_1, Carbon_1, Utils;
    var AgentsService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Carbon_1_1) {
                Carbon_1 = Carbon_1_1;
            },
            function (Utils_1) {
                Utils = Utils_1;
            }],
        execute: function() {
            AgentsService = (function () {
                function AgentsService(carbon) {
                    this.carbon = carbon;
                    this.appContextsAgents = new Map();
                }
                AgentsService.prototype.getAll = function (appContext) {
                    var uri = appContext.getBaseURI() + "agents/";
                    var existingAgents = this.appContextsAgents.get(appContext.getBaseURI());
                    existingAgents = typeof existingAgents === "undefined" ? new Map() : existingAgents;
                    return this.carbon.documents.getChildren(uri).then(function (_a) {
                        var agents = _a[0], response = _a[1];
                        agents.filter(function (agent) { return !existingAgents.has(agent.id); })
                            .forEach(function (agent) { return existingAgents.set(agent.id, agent); });
                        return Utils.A.from(existingAgents.values());
                    });
                };
                AgentsService.prototype.saveAgent = function (appContext, agent) {
                    return agent.save();
                };
                AgentsService.prototype.saveAndRefreshAgent = function (appContext, agent) {
                    return agent.saveAndRefresh();
                };
                AgentsService.prototype.createAgent = function (appContext, agent, slug) {
                    var agents = appContext.auth.agents;
                    return agents.register(agent, slug);
                };
                AgentsService.prototype.deleteAgent = function (appContext, agent, slug) {
                    var agents = appContext.auth.agents;
                    return agents.delete(agent.id);
                };
                AgentsService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [Carbon_1.default])
                ], AgentsService);
                return AgentsService;
            }());
            exports_1("AgentsService", AgentsService);
            exports_1("default",AgentsService);
        }
    }
});

//# sourceMappingURL=agents.service.js.map
