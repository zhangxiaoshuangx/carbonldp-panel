import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AppContentResolver } from "./app-content.resolver";

import { AppContentView } from "./app-content.view";
import { DashboardView } from "./dashboard/dashboard.view";
import { SPARQLClientView } from "./sparql-client/sparql-client.view";
import { EditAppView } from "./edit-app/edit-app.view";
import { ExplorerView } from "./explorer/explorer.view";
//import { ConfigurationView } from "./configuration/configuration.view";

const AppContentRoutes:Routes = [
	{
		path: "",
		component: AppContentView,
		resolve: {
			app: AppContentResolver,
		},
		children: [
			{
				path: "",
				component: DashboardView,
				data: {
					alias: "",
					displayName: "App Dashboard",
				},
			},
			{
				path: "edit",
				component: EditAppView,
				data: {
					alias: "edit",
					displayName: "Edit",
				},
			},
			{
				path: "sparql-client",
				component: SPARQLClientView,
				data: {
					alias: "sparql-client",
					displayName: "SPARQL Client",
				},
			},
			// {
			// 	path: "explore",
			// 	component: ExplorerView,
			// 	data: {
			// 		alias: "Explorer",
			// 		displayName: "Explorer",
			// 	},
			// },
			// {
			// 	path: "configure",
			// 	// as: "Configuration",
			// 	component: ConfigurationView,
			// 	data: {
			// 		alias: "Configuration",
			// 		displayName: "Configuration",
			// 	},
			// },
		]
	}
];

export const routing:ModuleWithProviders = RouterModule.forChild( AppContentRoutes );