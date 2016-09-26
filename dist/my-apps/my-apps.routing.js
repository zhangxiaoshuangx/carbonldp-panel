System.register(["@angular/router", "./my-apps.view"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, my_apps_view_1;
    var MyAppsRoutes, routing;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (my_apps_view_1_1) {
                my_apps_view_1 = my_apps_view_1_1;
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
                },
            ];
            exports_1("routing", routing = router_1.RouterModule.forChild(MyAppsRoutes));
        }
    }
});

//# sourceMappingURL=my-apps.routing.js.map
