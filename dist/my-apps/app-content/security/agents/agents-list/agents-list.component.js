System.register(["@angular/core", "carbonldp/App", "carbonldp/RDF/URI", "../agents.service", "../agent-details/agent-details.component", "./agents-list.component.html!", "./agents-list.component.css!text"], function(exports_1, context_1) {
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
    var core_1, App, URI, agents_service_1, agent_details_component_1, agents_list_component_html_1, agents_list_component_css_text_1;
    var AgentsListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (App_1) {
                App = App_1;
            },
            function (URI_1) {
                URI = URI_1;
            },
            function (agents_service_1_1) {
                agents_service_1 = agents_service_1_1;
            },
            function (agent_details_component_1_1) {
                agent_details_component_1 = agent_details_component_1_1;
            },
            function (agents_list_component_html_1_1) {
                agents_list_component_html_1 = agents_list_component_html_1_1;
            },
            function (agents_list_component_css_text_1_1) {
                agents_list_component_css_text_1 = agents_list_component_css_text_1_1;
            }],
        execute: function() {
            AgentsListComponent = (function () {
                function AgentsListComponent(agentsService) {
                    this.agents = [];
                    this.loading = false;
                    this.mode = agent_details_component_1.Modes.READ;
                    this.AgentDetailsModes = agent_details_component_1.Modes;
                    this.agentsService = agentsService;
                }
                AgentsListComponent.prototype.ngOnInit = function () {
                    this.loadAgents();
                };
                AgentsListComponent.prototype.loadAgents = function () {
                    var _this = this;
                    this.loading = true;
                    this.agentsService.getAll(this.appContext).then(function (agents) {
                        agents = agents.filter(function (agent) { return agent.id.indexOf("/agents/me/") === -1; });
                        _this.loading = false;
                        _this.agents = agents;
                    });
                };
                AgentsListComponent.prototype.openAgent = function (event, agent) {
                    event.stopPropagation();
                    this.inspectingAgent = agent;
                };
                AgentsListComponent.prototype.edit = function (event, agent) {
                    event.stopPropagation();
                    this.inspectingAgent = agent;
                };
                AgentsListComponent.prototype.getSlug = function (slug) {
                    return URI.Util.getSlug(slug);
                };
                AgentsListComponent.prototype.refreshAgents = function () {
                    this.loadAgents();
                };
                AgentsListComponent.prototype.closeDetails = function () {
                    this.inspectingAgent = null;
                    this.mode = agent_details_component_1.Modes.READ;
                };
                AgentsListComponent.prototype.createAgent = function () {
                    this.mode = agent_details_component_1.Modes.CREATE;
                };
                AgentsListComponent.prototype.onClickDeleteAgent = function (event, agent) {
                    event.stopPropagation();
                    this.deletingAgent = agent;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', App.Context)
                ], AgentsListComponent.prototype, "appContext", void 0);
                AgentsListComponent = __decorate([
                    core_1.Component({
                        selector: "cp-agents-list",
                        template: agents_list_component_html_1.default,
                        styles: [agents_list_component_css_text_1.default],
                    }), 
                    __metadata('design:paramtypes', [agents_service_1.AgentsService])
                ], AgentsListComponent);
                return AgentsListComponent;
            }());
            exports_1("AgentsListComponent", AgentsListComponent);
            exports_1("default",AgentsListComponent);
        }
    }
});

//# sourceMappingURL=agents-list.component.js.map
