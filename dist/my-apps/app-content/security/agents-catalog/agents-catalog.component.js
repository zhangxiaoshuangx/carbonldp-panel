System.register(["@angular/core", "carbonldp/App", "carbonldp/Auth/Agent", "carbonldp/RDF/URI", "semantic-ui/semantic", "./agents-catalog.component.html!"], function(exports_1, context_1) {
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
    var core_1, App, Agent, URI, agents_catalog_component_html_1;
    var AgentsCatalogComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (App_1) {
                App = App_1;
            },
            function (Agent_1) {
                Agent = Agent_1;
            },
            function (URI_1) {
                URI = URI_1;
            },
            function (_1) {},
            function (agents_catalog_component_html_1_1) {
                agents_catalog_component_html_1 = agents_catalog_component_html_1_1;
            }],
        execute: function() {
            AgentsCatalogComponent = (function () {
                function AgentsCatalogComponent() {
                    this.agents = [];
                    this.loading = false;
                }
                AgentsCatalogComponent.prototype.ngOnInit = function () {
                    this.loadAgents();
                };
                AgentsCatalogComponent.prototype.loadAgents = function () {
                    var _this = this;
                    this.loading = true;
                    this.appContext.extendObjectSchema(Agent.RDF_CLASS, Agent.SCHEMA);
                    this.appContext.documents.getChildren("agents/").then(function (_a) {
                        var agents = _a[0], response = _a[1];
                        agents = agents.filter(function (agent) { return agent.id.indexOf("/agents/me/") === -1; });
                        _this.loading = false;
                        _this.agents = agents;
                        console.log(agents);
                    });
                };
                AgentsCatalogComponent.prototype.getSlug = function (slug) {
                    return URI.Util.getSlug(slug);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', App.Context)
                ], AgentsCatalogComponent.prototype, "appContext", void 0);
                AgentsCatalogComponent = __decorate([
                    core_1.Component({
                        selector: "cp-agents-catalog",
                        template: agents_catalog_component_html_1.default,
                    }), 
                    __metadata('design:paramtypes', [])
                ], AgentsCatalogComponent);
                return AgentsCatalogComponent;
            }());
            exports_1("AgentsCatalogComponent", AgentsCatalogComponent);
            exports_1("default",AgentsCatalogComponent);
        }
    }
});

//# sourceMappingURL=agents-catalog.component.js.map
