System.register(["@angular/router", "./my-apps.view", "./apps-catalog/apps-catalog.view", "./create-app/create-app.view", "./app-not-found.view", "./app-content/app-content.module"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, my_apps_view_1, apps_catalog_view_1, create_app_view_1, app_not_found_view_1, app_content_module_1;
    var MyAppsRoutes, routing;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (my_apps_view_1_1) {
                my_apps_view_1 = my_apps_view_1_1;
            },
            function (apps_catalog_view_1_1) {
                apps_catalog_view_1 = apps_catalog_view_1_1;
            },
            function (create_app_view_1_1) {
                create_app_view_1 = create_app_view_1_1;
            },
            function (app_not_found_view_1_1) {
                app_not_found_view_1 = app_not_found_view_1_1;
            },
            function (app_content_module_1_1) {
                app_content_module_1 = app_content_module_1_1;
            }],
        execute: function() {
            MyAppsRoutes = [
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
                                // TODO: Remove hide property when Angular's Router bug is fixed
                                hide: true
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
            exports_1("routing", routing = router_1.RouterModule.forChild(MyAppsRoutes));
        }
    }
});

//# sourceMappingURL=my-apps.routing.js.map
