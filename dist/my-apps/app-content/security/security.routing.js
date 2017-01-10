System.register(["@angular/router", "./security.view", "./agents/agents.view", "./agents/agent.resolver", "./agents/agents-list/agents-list.view", "./agents/agent-details/agent-details.view", "./agents/agent-creator/agent-creator.view", "./agents/agent-not-found/agent-not-found.view", "./roles/roles.view", "./roles/role.resolver", "./roles/roles-catalog/roles-catalog.view"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, security_view_1, agents_view_1, agent_resolver_1, agents_list_view_1, agent_details_view_1, agent_creator_view_1, agent_not_found_view_1, roles_view_1, role_resolver_1, roles_catalog_view_1;
    var SecurityRoutes, routing;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (security_view_1_1) {
                security_view_1 = security_view_1_1;
            },
            function (agents_view_1_1) {
                agents_view_1 = agents_view_1_1;
            },
            function (agent_resolver_1_1) {
                agent_resolver_1 = agent_resolver_1_1;
            },
            function (agents_list_view_1_1) {
                agents_list_view_1 = agents_list_view_1_1;
            },
            function (agent_details_view_1_1) {
                agent_details_view_1 = agent_details_view_1_1;
            },
            function (agent_creator_view_1_1) {
                agent_creator_view_1 = agent_creator_view_1_1;
            },
            function (agent_not_found_view_1_1) {
                agent_not_found_view_1 = agent_not_found_view_1_1;
            },
            function (roles_view_1_1) {
                roles_view_1 = roles_view_1_1;
            },
            function (role_resolver_1_1) {
                role_resolver_1 = role_resolver_1_1;
            },
            function (roles_catalog_view_1_1) {
                roles_catalog_view_1 = roles_catalog_view_1_1;
            }],
        execute: function() {
            SecurityRoutes = [
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
                                    component: roles_catalog_view_1.RolesCatalogView,
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
                                    component: roles_catalog_view_1.RolesCatalogView,
                                },
                            ]
                        }
                    ]
                }
            ];
            exports_1("routing", routing = router_1.RouterModule.forChild(SecurityRoutes));
        }
    }
});

//# sourceMappingURL=security.routing.js.map
