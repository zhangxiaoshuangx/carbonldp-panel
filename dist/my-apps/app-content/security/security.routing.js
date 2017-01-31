"use strict";
var router_1 = require("@angular/router");
var security_view_1 = require("./security.view");
var agents_view_1 = require("./agents/agents.view");
var agent_resolver_1 = require("./agents/agent.resolver");
var agents_list_view_1 = require("./agents/agents-list/agents-list.view");
var agent_details_view_1 = require("./agents/agent-details/agent-details.view");
var agent_creator_view_1 = require("./agents/agent-creator/agent-creator.view");
var agent_not_found_view_1 = require("./agents/agent-not-found/agent-not-found.view");
var SecurityRoutes = [
    {
        path: "",
        data: {
            alias: "security",
            displayName: "Security",
        },
        component: security_view_1.SecurityView,
        children: [
            {
                path: "",
                redirectTo: "agents",
                pathMatch: "full",
            },
            {
                path: "agents",
                data: {
                    alias: "agents",
                    displayName: "Agents",
                },
                component: agents_view_1.AgentsView,
                children: [
                    {
                        path: "",
                        component: agents_list_view_1.AgentsListView,
                    },
                    {
                        path: "list",
                        component: agents_list_view_1.AgentsListView,
                    },
                    {
                        path: "create",
                        data: {
                            alias: "create",
                            displayName: "Create Agent",
                        },
                        component: agent_creator_view_1.AgentCreatorView,
                    },
                    {
                        path: "agent-not-found",
                        component: agent_not_found_view_1.AgentNotFoundView,
                        data: {
                            alias: "agent-not-found",
                            displayName: "No Agent"
                        }
                    },
                    {
                        path: ":agent-slug",
                        resolve: {
                            agent: agent_resolver_1.AgentResolver,
                        },
                        data: {
                            param: "agent-slug",
                            displayName: "Agent",
                            title: "Agent",
                        },
                        component: agent_details_view_1.AgentDetailsView,
                    }
                ]
            },
        ]
    }
];
exports.routing = router_1.RouterModule.forChild(SecurityRoutes);

//# sourceMappingURL=security.routing.js.map
