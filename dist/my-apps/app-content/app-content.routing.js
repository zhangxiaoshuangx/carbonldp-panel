"use strict";
var router_1 = require("@angular/router");
var app_content_resolver_1 = require("./app-content.resolver");
var app_content_view_1 = require("./app-content.view");
var dashboard_view_1 = require("./dashboard/dashboard.view");
var sparql_client_view_1 = require("./sparql-client/sparql-client.view");
var edit_app_view_1 = require("./edit-app/edit-app.view");
var explorer_view_1 = require("./explorer/explorer.view");
var configuration_view_1 = require("./configuration/configuration.view");
var AppContentRoutes = [
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
                loadChildren: "./security/security.module#SecurityModule",
            },
        ]
    }
];
exports.routing = router_1.RouterModule.forChild(AppContentRoutes);

//# sourceMappingURL=app-content.routing.js.map
