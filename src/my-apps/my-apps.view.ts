import { Component, provide } from "@angular/core";
import { ROUTER_DIRECTIVES, RouteConfig, RouterOutlet } from "@angular/router-deprecated";

import { MyAppsSidebarService } from "./my-apps-sidebar.service";
import { AppContentView } from "./app-content/app-content.view";
import { AppsCatalogView } from "./apps-catalog/apps-catalog.view";
import { CreateAppView } from "./create-app/create-app.view";

@Component( {
	selector: "cp-my-apps",
	template: `<router-outlet></router-outlet>`,
	styles: [ ":host { display: block; }" ],
	directives: [ ROUTER_DIRECTIVES, RouterOutlet ],
	providers: [
		provide( MyAppsSidebarService, { useClass: MyAppsSidebarService } )
	]
} )
@RouteConfig( [
	{
		path: "/",
		as: "List",
		component: AppsCatalogView,
		useAsDefault: true,
		data: {
			alias: "List",
			displayName: "My Apps",
		},
	},
	{
		path: "/:slug/...",
		as: "App",
		component: AppContentView,
		data: {
			alias: "App",
			displayName: "App",
			params: {
				name: "slug",
				redirectTo: "AppDashboard",
			},
		},
	},
	{
		path: "/create",
		as: "Create",
		component: CreateAppView,
		data: {
			alias: "Create",
			displayName: "Create App",
		},
	},
] )
export class MyAppsView {
}

export default MyAppsView
