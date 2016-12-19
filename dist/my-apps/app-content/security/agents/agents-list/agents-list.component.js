System.register(["@angular/core", "@angular/router", "carbonldp/App", "carbonldp/RDF/URI", "../agents.service", "../agent-details/agent-details.component", "carbonldp-panel/errors-area/error-message-generator", "./agents-list.component.html!", "./agents-list.component.css!text"], function(exports_1, context_1) {
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
    var core_1, router_1, App, URI, agents_service_1, agent_details_component_1, error_message_generator_1, agents_list_component_html_1, agents_list_component_css_text_1;
    var AgentsListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
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
            function (error_message_generator_1_1) {
                error_message_generator_1 = error_message_generator_1_1;
            },
            function (agents_list_component_html_1_1) {
                agents_list_component_html_1 = agents_list_component_html_1_1;
            },
            function (agents_list_component_css_text_1_1) {
                agents_list_component_css_text_1 = agents_list_component_css_text_1_1;
            }],
        execute: function() {
            AgentsListComponent = (function () {
                function AgentsListComponent(router, route, agentsService) {
                    this.agents = [];
                    this.loading = false;
                    this.activePage = 0;
                    this.totalAgents = 0;
                    this.agentsPerPage = 5;
                    this.headers = [{ name: "Name", value: "name" }, { name: "Created", value: "created" }, { name: "Modified", value: "modified" }];
                    this.sortedColumn = "name";
                    this.ascending = false;
                    this.router = router;
                    this.route = route;
                    this.agentsService = agentsService;
                }
                AgentsListComponent.prototype.ngOnInit = function () {
                    this.loadAgents();
                };
                AgentsListComponent.prototype.loadAgents = function () {
                    var _this = this;
                    this.loading = true;
                    this.getNumberOfAgents().then(function (amount) {
                        _this.totalAgents = amount;
                        return _this.getAgents();
                    }).then(function (agents) {
                        _this.agents = agents;
                    }).catch(function (error) {
                        console.error(error);
                        _this.errorMessage = error_message_generator_1.ErrorMessageGenerator.getErrorMessage(error);
                    }).then(function () {
                        _this.loading = false;
                    });
                };
                AgentsListComponent.prototype.getAgents = function () {
                    return this.agentsService.getAll(this.appContext, this.agentsPerPage, this.activePage, this.sortedColumn, this.ascending).then(function (agents) {
                        return agents.filter(function (agent) { return agent.id.indexOf("/agents/me/") === -1; });
                    });
                };
                AgentsListComponent.prototype.openAgent = function (event, agent) {
                    event.stopPropagation();
                    this.goToAgent(agent);
                };
                AgentsListComponent.prototype.onClickEditAgent = function (event, agent) {
                    event.stopPropagation();
                    this.goToAgent(agent, true);
                };
                AgentsListComponent.prototype.goToAgent = function (agent, edit) {
                    var slug = URI.Util.getSlug(agent.id);
                    var extras = { relativeTo: this.route };
                    if (edit)
                        extras.queryParams = { mode: agent_details_component_1.Modes.EDIT };
                    this.router.navigate([slug], extras);
                };
                AgentsListComponent.prototype.refreshAgents = function () {
                    this.loadAgents();
                };
                AgentsListComponent.prototype.onClickDeleteAgent = function (event, agent) {
                    event.stopPropagation();
                    this.deletingAgent = agent;
                };
                AgentsListComponent.prototype.getNumberOfAgents = function () {
                    return this.agentsService.getNumberOfAgents(this.appContext);
                };
                AgentsListComponent.prototype.changePage = function (page) {
                    this.activePage = page;
                    this.loadAgents();
                };
                AgentsListComponent.prototype.changeAgentsPerPage = function (agentsPerPage) {
                    this.agentsPerPage = agentsPerPage;
                    this.loadAgents();
                };
                AgentsListComponent.prototype.sortColumn = function (header) {
                    if (this.sortedColumn === header.value)
                        this.ascending = !this.ascending;
                    this.sortedColumn = header.value;
                    this.loadAgents();
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
                    __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, agents_service_1.AgentsService])
                ], AgentsListComponent);
                return AgentsListComponent;
            }());
            exports_1("AgentsListComponent", AgentsListComponent);
            exports_1("default",AgentsListComponent);
        }
    }
});

//# sourceMappingURL=agents-list.component.js.map
