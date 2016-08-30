import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MyAppsView } from "./my-apps.view";
import { AppsCatalogView } from "./apps-catalog/apps-catalog.view";
import { CreateAppView } from "./create-app/create-app.view";


const MyAppsRoutes:Routes = [
	{
		path: "",
		component: MyAppsView,
		children: [
			{
				path: "",
				component: AppsCatalogView,
				data: {
					alias: "my-apps",
					displayName: "My Apps",
				},
			},
			{
				path: "create",
				component: CreateAppView,
				data: {
					alias: "create",
					displayName: "Create App",
				},
			},
			{
				path: ":slug",
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
		]
	},
];


export const routing:ModuleWithProviders = RouterModule.forChild( MyAppsRoutes );