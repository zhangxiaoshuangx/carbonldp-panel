import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AppContentView } from "./app-content/app-content.view";
import { AppsCatalogView } from "./apps-catalog/apps-catalog.view";
import { CreateAppView } from "./create-app/create-app.view";


const MyAppsRoutes:Routes = [
	{
		path: "",
		// as: "List",
		component: AppsCatalogView,
		data: {
			alias: "List",
			displayName: "My Apps",
		},
	},
	{
		path: ":slug",
		// as: "App",
		component: AppContentView,
		data: {
			alias: "App",
			displayName: "App",
			main: true,
			params: {
				name: "slug",
				redirectTo: "AppDashboard",
			},
		},
		loadChildren: "carbon-panel/my-apps/apps-content/apps-content.module#AppsContentModule",
	},
	{
		path: "create",
		component: CreateAppView,
		data: {
			alias: "Create",
			displayName: "Create App",
		},
	},
];


export const routing:ModuleWithProviders = RouterModule.forChild( MyAppsRoutes );