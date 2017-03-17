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
var Carbon_1 = require("carbonldp/Carbon");
var Utils = require("carbonldp/Utils");
var URI = require("carbonldp/RDF/URI");
var NS = require("carbonldp/NS");
var app_content_service_1 = require("carbonldp-panel/my-apps/app-content/app-content.service");
var AgentsService = (function () {
    function AgentsService(carbon, appContentService) {
        this.onAgentHasChanged = new core_1.EventEmitter();
        this.carbon = carbon;
        this.appContextsAgents = new Map();
        this.appContentService = appContentService;
    }
    Object.defineProperty(AgentsService.prototype, "activeAgent", {
        get: function () {
            return this._activeAgent;
        },
        set: function (app) {
            this._activeAgent = app;
            this.onAgentHasChanged.emit(this.activeAgent);
        },
        enumerable: true,
        configurable: true
    });
    AgentsService.prototype.get = function (slugOrURI, appContext) {
        var uri = appContext.getBaseURI() + ("agents/" + slugOrURI + "/");
        if (URI.Util.isAbsolute(slugOrURI))
            uri = slugOrURI;
        var existingAgents = this.appContextsAgents.get(appContext.getBaseURI());
        existingAgents = typeof existingAgents === "undefined" ? new Map() : existingAgents;
        return appContext.documents.get(uri).then(function (_a) {
            var agent = _a[0], response = _a[1];
            existingAgents.set(agent.id, agent);
            return agent;
        });
    };
    AgentsService.prototype.getAll = function (appContext, limit, page, orderBy, ascending) {
        var _this = this;
        if (ascending === void 0) { ascending = true; }
        var uri = appContext.getBaseURI() + "agents/", existingAgents = this.appContextsAgents.get(appContext.getBaseURI());
        existingAgents = typeof existingAgents === "undefined" ? new Map() : existingAgents;
        var preferences = {}, property, name = {
            "@id": NS.CS.Predicate.namae,
            "@type": "string",
        }, email = {
            "@id": NS.VCARD.Predicate.email,
            "@type": "string",
        }, created = {
            "@id": NS.C.Predicate.created,
            "@type": "dateTime",
        }, modified = {
            "@id": NS.C.Predicate.modified,
            "@type": "dateTime",
        };
        switch (orderBy) {
            case "name":
                property = name;
                break;
            case "email":
                property = email;
                break;
            case "created":
                property = created;
                break;
            case "modified":
                property = modified;
                break;
            default:
                property = name;
                break;
        }
        if (!orderBy)
            preferences.orderBy = [property];
        if (!ascending)
            property["@id"] = "-" + property["@id"];
        if (typeof limit !== "undefined")
            preferences.limit = limit;
        if (typeof page !== "undefined")
            preferences.offset = page * limit;
        return this.carbon.documents.getMembers(uri, false, preferences).then(function (_a) {
            var agents = _a[0], response = _a[1];
            agents.filter(function (agent) { return !existingAgents.has(agent.id); })
                .forEach(function (agent) { return existingAgents.set(agent.id, agent); });
            var agentsArray = Utils.A.from(existingAgents.values());
            if (orderBy)
                agentsArray = _this.getSortedAgents(agentsArray, orderBy, ascending);
            return agentsArray;
        });
    };
    AgentsService.prototype.getNumberOfAgents = function (appContext) {
        var agentsURI = appContext.getBaseURI() + "agents/", query = "SELECT DISTINCT (COUNT(?agent) AS ?count) WHERE {\n\t\t\t?agent a <https://carbonldp.com/ns/v1/security#Agent> . \n\t\t}";
        return appContext.documents.executeSELECTQuery(agentsURI, query).then(function (_a) {
            var results = _a[0], response = _a[1];
            if (typeof results.bindings[0] === "undefined")
                return 0;
            return results.bindings[0]["count"];
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
    AgentsService.prototype.getSortedAgents = function (agents, orderBy, ascending) {
        return agents.sort(function (agentA, agentB) {
            if (typeof agentA[orderBy] === "string" && typeof agentB[orderBy] === "string") {
                if (agentA[orderBy].toLowerCase() > agentB[orderBy].toLowerCase())
                    return ascending ? -1 : 1;
                if (agentA[orderBy].toLowerCase() < agentB[orderBy].toLowerCase())
                    return ascending ? 1 : -1;
            }
            else {
                if (agentA[orderBy] > agentB[orderBy])
                    return ascending ? -1 : 1;
                if (agentA[orderBy] < agentB[orderBy])
                    return ascending ? 1 : -1;
            }
            return 0;
        });
    };
    return AgentsService;
}());
AgentsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [Carbon_1.Carbon, app_content_service_1.AppContentService])
], AgentsService);
exports.AgentsService = AgentsService;
