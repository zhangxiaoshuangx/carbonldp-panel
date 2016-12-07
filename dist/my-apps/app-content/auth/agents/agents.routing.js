System.register(["@angular/router", "./auth.view", "./agents/agents.view", "./agents/agent.resolver", "./agents/agent-details/agent-details.component"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, auth_view_1, agents_view_1, agent_resolver_1, agent_details_component_1;
    var AgentsRoutes, routing;
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
            function (agent_details_component_1_1) {
                agent_details_component_1 = agent_details_component_1_1;
            }],
        execute: function() {
            AgentsRoutes = [
                {
                    path: "",
                    component: auth_view_1.AuthView,
                    data: {
                        alias: "auth",
                        displayName: "Auth",
                    },
                    children: [
                        {
                            path: "",
                            component: agents_view_1.AgentsView,
                            redirectTo: "/agents",
                            pathMatch: "full",
                            children: [
                                {
                                    path: "agents",
                                    component: AgentsListView,
                                    data: {
                                        alias: "agents",
                                        displayName: "Agents",
                                    },
                                    children: [
                                        {
                                            path: ":agent-slug",
                                            resolve: {
                                                app: agent_resolver_1.AgentResolver,
                                            },
                                            data: {
                                                param: "slug",
                                                displayName: "App",
                                                title: "App",
                                            },
                                            component: agent_details_component_1.AgentDetailsComponent,
                                        }
                                    ]
                                },
                            ]
                        },
                    ]
                }
            ];
            exports_1("routing", routing = router_1.RouterModule.forChild(AgentsRoutes));
        }
    }
});

//# sourceMappingURL=agents.routing.js.map
