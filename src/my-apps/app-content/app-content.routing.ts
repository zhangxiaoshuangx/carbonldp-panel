import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AppContentResolver } from "./app-content.resolver";

import { AppContentView } from "./app-content.view";
import { DashboardView } from "./dashboard/dashboard.view";
import { SPARQLClientView } from "./sparql-client/sparql-client.view";
import { EditAppView } from "./edit-app/edit-app.view";
import { ExplorerView } from "./explorer/explorer.view";
import { ConfigurationView } from "./configuration/configuration.view";

const AppContentRoutes:Routes = [
	{
		path: "",
		component: AppContentView,
		resolve: {
			app: AppContentResolver,
		},
		data: {
			param: "slug",
			displayName: "App",
			title: "App",
		},
		children: [
			{
				path: "",
				component: DashboardView,
			},
			{
				path: "edit",
				component: EditAppView,
				data: {
					alias: "edit",
					displayName: "Edit",
					title: "Edit",
				},
			},
			{
				path: "sparql-client",
				component: SPARQLClientView,
				data: {
					alias: "sparql-client",
					displayName: "SPARQL Client",
					title: "SPARQL Client",
				},
			},
			{
				path: "explore",
				component: ExplorerView,
				data: {
					alias: "explore",
					displayName: "Explorer",
					title: "Explorer",
				},
			},
			{
				path: "configure",
				component: ConfigurationView,
				data: {
					alias: "configure",
					displayName: "Configuration",
					title: "Configuration",
				},
			},
		]
	}
];

export const routing:ModuleWithProviders = RouterModule.forChild( AppContentRoutes );