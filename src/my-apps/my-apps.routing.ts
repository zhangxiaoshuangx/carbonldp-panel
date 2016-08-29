import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

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
		path: "create",
		component: CreateAppView,
		data: {
			alias: "Create",
			displayName: "Create App",
		},
	},
	{
		path: ":slug",
		// as: "App",
		data: {
			alias: "App",
			displayName: "App",
			main: true,
			params: {
				name: "slug",
				redirectTo: "AppDashboard",
			},
		},
		loadChildren: "carbon-panel/my-apps/app-content/app-content.module#AppContentModule",
	},
];


export const routing:ModuleWithProviders = RouterModule.forChild( MyAppsRoutes );