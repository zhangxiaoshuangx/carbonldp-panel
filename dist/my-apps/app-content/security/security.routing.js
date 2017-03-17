"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var security_view_1 = require("./security.view");
var agents_view_1 = require("./agents/agents.view");
var agent_resolver_1 = require("./agents/agent.resolver");
var agents_list_view_1 = require("./agents/agents-list/agents-list.view");
var agent_details_view_1 = require("./agents/agent-details/agent-details.view");
var agent_creator_view_1 = require("./agents/agent-creator/agent-creator.view");
var agent_not_found_view_1 = require("./agents/agent-not-found/agent-not-found.view");
var roles_view_1 = require("./roles/roles.view");
var role_resolver_1 = require("./roles/role.resolver");
var roles_browser_view_1 = require("./roles/roles-browser/roles-browser.view");
exports.SecurityRoutes = [
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
                        data: {
                            // TODO: Remove hide property when Angular's Router bug is fixed
                            hide: true
                        },
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
            {
                path: "roles",
                data: {
                    alias: "roles",
                    displayName: "Roles",
                },
                component: roles_view_1.RolesView,
                children: [
                    {
                        path: "",
                        data: {
                            // TODO: Remove hide property when Angular's Router bug is fixed
                            hide: true
                        },
                        component: roles_browser_view_1.RolesBrowserView,
                    },
                    {
                        path: ":role-slug",
                        resolve: {
                            role: role_resolver_1.RoleResolver,
                        },
                        data: {
                            param: "role-slug",
                            displayName: "Role",
                            title: "Role",
                        },
                        component: roles_browser_view_1.RolesBrowserView,
                    },
                ]
            }
        ]
    }
];
exports.routing = router_1.RouterModule.forChild(exports.SecurityRoutes);
