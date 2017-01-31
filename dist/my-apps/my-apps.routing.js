"use strict";
var router_1 = require("@angular/router");
var my_apps_view_1 = require("./my-apps.view");
var apps_catalog_view_1 = require("./apps-catalog/apps-catalog.view");
var create_app_view_1 = require("./create-app/create-app.view");
var app_not_found_view_1 = require("./app-not-found.view");
var app_content_module_1 = require("./app-content/app-content.module");
var MyAppsRoutes = [
    {
        path: "",
        component: my_apps_view_1.MyAppsView,
        data: {
            alias: "my-apps",
            displayName: "My Apps",
        },
        children: [
            {
                path: "",
                component: apps_catalog_view_1.AppsCatalogView,
                data: {
                    title: "My Apps",
                }
            },
            {
                path: "create",
                component: create_app_view_1.CreateAppView,
                data: {
                    alias: "create",
                    displayName: "Create App",
                },
            },
            {
                path: "app-not-found",
                component: app_not_found_view_1.AppNotFoundView,
                data: {
                    alias: "app-not-found",
                    displayName: "No App"
                }
            },
            {
                path: ":slug",
                loadChildren: function () { return app_content_module_1.AppContentModule; },
            }
        ]
    },
];
exports.routing = router_1.RouterModule.forChild(MyAppsRoutes);

//# sourceMappingURL=my-apps.routing.js.map
