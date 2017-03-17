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
var App = require("carbonldp/App");
var URI = require("carbonldp/RDF/URI");
var agents_service_1 = require("../agents.service");
var agent_details_component_1 = require("../agent-details/agent-details.component");
var error_message_generator_1 = require("carbonldp-panel/messages-area/error/error-message-generator");
var AgentsListComponent = (function () {
    function AgentsListComponent(router, route, agentsService) {
        this.activePage = 0;
        this.totalAgents = 0;
        this.agentsPerPage = 5;
        this.headers = [{ name: "Name", value: "name" }, { name: "Created", value: "created" }, { name: "Modified", value: "modified" }];
        this.sortedColumn = "name";
        this.ascending = false;
        this.agents = [];
        this.loading = false;
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
    return AgentsListComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", App.Context)
], AgentsListComponent.prototype, "appContext", void 0);
AgentsListComponent = __decorate([
    core_1.Component({
        selector: "cp-agents-list",
        templateUrl: "./agents-list.component.html",
        styleUrls: ["./agents-list.component.scss"],
    }),
    __metadata("design:paramtypes", [router_1.Router, router_1.ActivatedRoute, agents_service_1.AgentsService])
], AgentsListComponent);
exports.AgentsListComponent = AgentsListComponent;
