System.register(["@angular/router", "./auth.view", "./agents/agents.view", "./agents/agent.resolver", "./agents/agents-list/agents-list.view", "./agents/agent-details/agent-details.view", "./agents/agent-creator/agent-creator.view", "./agents/agent-not-found/agent-not-found.view", "./roles/roles.view", "./roles/roles-list/roles-list.view"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, auth_view_1, agents_view_1, agent_resolver_1, agents_list_view_1, agent_details_view_1, agent_creator_view_1, agent_not_found_view_1, roles_view_1, roles_list_view_1;
    var AuthRoutes, routing;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (auth_view_1_1) {
                auth_view_1 = auth_view_1_1;
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
            function (roles_list_view_1_1) {
                roles_list_view_1 = roles_list_view_1_1;
            }],
        execute: function() {
            AuthRoutes = [
                {
                    path: "",
                    data: {
                        alias: "auth",
                        displayName: "Auth",
                    },
                    component: auth_view_1.AuthView,
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
                                    component: roles_list_view_1.RolesListView,
                                },
                                {
                                    path: "list",
                                    component: roles_list_view_1.RolesListView,
                                },
                            ]
                        }
                    ]
                }
            ];
            exports_1("routing", routing = router_1.RouterModule.forChild(AuthRoutes));
        }
    }
});

//# sourceMappingURL=auth.routing.js.map
