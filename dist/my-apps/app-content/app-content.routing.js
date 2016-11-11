System.register(["@angular/router", "./app-content.resolver", "./app-content.view", "./dashboard/dashboard.view", "./sparql-client/sparql-client.view", "./edit-app/edit-app.view", "./explorer/explorer.view", "./configuration/configuration.view", "./security/security.view"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, app_content_resolver_1, app_content_view_1, dashboard_view_1, sparql_client_view_1, edit_app_view_1, explorer_view_1, configuration_view_1, security_view_1;
    var AppContentRoutes, routing;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (app_content_resolver_1_1) {
                app_content_resolver_1 = app_content_resolver_1_1;
            },
            function (app_content_view_1_1) {
                app_content_view_1 = app_content_view_1_1;
            },
            function (dashboard_view_1_1) {
                dashboard_view_1 = dashboard_view_1_1;
            },
            function (sparql_client_view_1_1) {
                sparql_client_view_1 = sparql_client_view_1_1;
            },
            function (edit_app_view_1_1) {
                edit_app_view_1 = edit_app_view_1_1;
            },
            function (explorer_view_1_1) {
                explorer_view_1 = explorer_view_1_1;
            },
            function (configuration_view_1_1) {
                configuration_view_1 = configuration_view_1_1;
            },
            function (security_view_1_1) {
                security_view_1 = security_view_1_1;
            }],
        execute: function() {
            AppContentRoutes = [
                {
                    path: "",
                    component: app_content_view_1.AppContentView,
                    resolve: {
                        app: app_content_resolver_1.AppContentResolver,
                    },
                    data: {
                        param: "slug",
                        displayName: "App",
                        title: "App",
                    },
                    children: [
                        {
                            path: "",
                            component: dashboard_view_1.DashboardView,
                        },
                        {
                            path: "edit",
                            component: edit_app_view_1.EditAppView,
                            data: {
                                alias: "edit",
                                displayName: "Edit",
                            },
                        },
                        {
                            path: "sparql-client",
                            component: sparql_client_view_1.SPARQLClientView,
                            data: {
                                alias: "sparql-client",
                                displayName: "SPARQL Client",
                            },
                        },
                        {
                            path: "explore",
                            component: explorer_view_1.ExplorerView,
                            data: {
                                alias: "explore",
                                displayName: "Explorer",
                            },
                        },
                        {
                            path: "configure",
                            component: configuration_view_1.ConfigurationView,
                            data: {
                                alias: "configure",
                                displayName: "Configuration",
                            },
                        },
                        {
                            path: "security",
                            component: security_view_1.SecurityView,
                            data: {
                                alias: "security",
                                displayName: "Configuration",
                            },
                        },
                    ]
                }
            ];
            exports_1("routing", routing = router_1.RouterModule.forChild(AppContentRoutes));
        }
    }
});

//# sourceMappingURL=app-content.routing.js.map
