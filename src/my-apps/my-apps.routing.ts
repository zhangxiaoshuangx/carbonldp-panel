import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MyAppsView } from "./my-apps.view";
import { AppsCatalogView } from "./apps-catalog/apps-catalog.view";
import { CreateAppView } from "./create-app/create-app.view";
import { AppNotFoundView } from "./app-not-found.view";

import { AppContentView } from "./app-content/app-content.view";

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
				path: "app-not-found",
				component: AppNotFoundView,
				data: {
					alias: "app-not-found",
					displayName: "No App"
				}
			},
			{
				path: ":slug",
				loadChildren: "carbon-panel/my-apps/app-content/app-content.module#AppContentModule",
			}
		]
	},
];


export const routing:ModuleWithProviders = RouterModule.forChild( MyAppsRoutes );