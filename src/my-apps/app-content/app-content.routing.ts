import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AppContentResolver } from "./app-content.resolver";
import { AppNotFoundView } from "./app-not-found.view";

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
				/*path: "",
				// as: "AppDashboard",
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
				resolve: {
					app: AppContentView
				},
				children: [
					{*/
				path: "",
				component: DashboardView,
				data: {
					alias: "",
					displayName: "App Dashboard",
				},
			},
			// {
			// 	path: "sparql-client",
			// 	component: SPARQLClientView,
			// 	data: {
			// 		alias: "SPARQLClient",
			// 		displayName: "SPARQL Client",
			// 	},
			// },
			// {
			// 	path: "edit",
			// 	component: EditAppView,
			// 	data: {
			// 		alias: "Edit",
			// 		displayName: "Edit",
			// 	},
			// },
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