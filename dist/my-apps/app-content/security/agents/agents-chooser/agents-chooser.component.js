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
var App = require("carbonldp/App");
var agents_service_1 = require("../agents.service");
var AgentsChooserComponent = (function () {
    function AgentsChooserComponent(element, agentsService) {
        this.activePage = 0;
        this.totalAgents = 0;
        this.agentsPerPage = 5;
        this.headers = [{ name: "Name", value: "name" }];
        this.sortedColumn = "name";
        this.ascending = false;
        this.loading = false;
        this.availableAgents = [];
        this.single = false;
        this.selectedAgents = [];
        this.onChangeSelection = new core_1.EventEmitter();
        this.element = element;
        this.$element = $(element.nativeElement);
        this.agentsService = agentsService;
    }
    AgentsChooserComponent.prototype.ngAfterViewInit = function () {
        this.loadAgents();
    };
    AgentsChooserComponent.prototype.hasAgent = function (agent, list) {
        return list.findIndex(function (persistedAgent) { return agent === persistedAgent.id; }) !== -1;
    };
    AgentsChooserComponent.prototype.onClickAgent = function (evt, agent) {
        evt.stopPropagation();
        this.selectAgent(agent);
    };
    AgentsChooserComponent.prototype.selectAgent = function (agent) {
        if (this.single)
            this.addAgentAsSingle(agent);
        else
            this.addAgentAsMulti(agent);
        this.onChangeSelection.emit(this.selectedAgents);
    };
    AgentsChooserComponent.prototype.addAgentAsMulti = function (agent) {
        agent["checked"] ? delete agent["checked"] : agent["checked"] = true;
        var idx = this.selectedAgents.findIndex(function (persistedAgent) { return agent.id === persistedAgent.id; });
        if (idx === -1)
            this.selectedAgents.push(agent);
        else
            this.selectedAgents.splice(idx, 1);
    };
    AgentsChooserComponent.prototype.addAgentAsSingle = function (agent) {
        this.availableAgents.forEach(function (localAgent) {
            localAgent["checked"] = false;
        });
        agent["checked"] ? delete agent["checked"] : agent["checked"] = true;
        this.selectedAgents = [agent];
    };
    AgentsChooserComponent.prototype.loadAgents = function () {
        var _this = this;
        this.loading = true;
        this.getNumberOfAgents().then(function (amount) {
            _this.totalAgents = amount;
            return _this.getAgents();
        }).then(function (agents) {
            _this.availableAgents = agents;
        }).catch(function (error) {
            console.error(error);
            // this.errorMessage = ErrorMessageGenerator.getErrorMessage( error );
        }).then(function () {
            setTimeout(function () { _this.$element.find(".ui.checkbox").checkbox(); });
        }).then(function () {
            _this.loading = false;
        });
    };
    AgentsChooserComponent.prototype.getNumberOfAgents = function () {
        return this.agentsService.getNumberOfAgents(this.appContext);
    };
    AgentsChooserComponent.prototype.getAgents = function () {
        var _this = this;
        return this.agentsService.getAll(this.appContext, this.agentsPerPage, this.activePage, this.sortedColumn, this.ascending).then(function (agents) {
            agents.forEach(function (agent) {
                agent["checked"] = _this.hasAgent(agent.id, _this.selectedAgents);
            });
            return agents.filter(function (agent) { return agent.id.indexOf("/agents/me/") === -1; });
        });
    };
    AgentsChooserComponent.prototype.changePage = function (page) {
        this.activePage = page;
        this.loadAgents();
    };
    AgentsChooserComponent.prototype.changeAgentsPerPage = function (agentsPerPage) {
        this.agentsPerPage = agentsPerPage;
        this.loadAgents();
    };
    AgentsChooserComponent.prototype.sortColumn = function (header) {
        if (this.sortedColumn === header.value)
            this.ascending = !this.ascending;
        this.sortedColumn = header.value;
        this.loadAgents();
    };
    return AgentsChooserComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", App.Context)
], AgentsChooserComponent.prototype, "appContext", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], AgentsChooserComponent.prototype, "single", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], AgentsChooserComponent.prototype, "selectedAgents", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], AgentsChooserComponent.prototype, "onChangeSelection", void 0);
AgentsChooserComponent = __decorate([
    core_1.Component({
        selector: "cp-agents-chooser",
        templateUrl: "./agents-chooser.component.html",
        styleUrls: ["./agents-chooser.component.scss"],
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, agents_service_1.AgentsService])
], AgentsChooserComponent);
exports.AgentsChooserComponent = AgentsChooserComponent;
