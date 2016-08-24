import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthenticatedGuard, NotAuthenticatedGuard } from "angular2-carbonldp/guards";
import { ActiveContextResolver } from "angular2-carbonldp/resolvers";

//import { AppContentView } from "./app-content/app-content.view";
import { AppsCatalogView } from "./apps-catalog/apps-catalog.view";
import { CreateAppView } from "./create-app/create-app.view";

//import { DashboardView } from "./app-content/dashboard/dashboard.view";
//import { SPARQLClientView } from "./app-content/sparql-client/sparql-client.view";
//import { EditAppView } from "./app-content/edit-app/edit-app.view";
//import { ExplorerView } from "./app-content/explorer/explorer.view";
//import { ConfigurationView } from "./app-content/configuration/configuration.view";

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
	/*{
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
		children: [
			{
				path: "",
				// as: "AppDashboard",
				component: DashboardView,
				data: {
					alias: "AppDashboard",
					displayName: "App Dashboard",
				},
			},
			{
				path: "sparql-client",
				// as: "SPARQLClient",
				component: SPARQLClientView,
				data: {
					alias: "SPARQLClient",
					displayName: "SPARQL Client",
				},
			},
			{
				path: "edit",
				// as: "Edit",
				component: EditAppView,
				data: {
					alias: "Edit",
					displayName: "Edit",
				},
			},
			{
				path: "explore",
				// as: "Explorer",
				component: ExplorerView,
				data: {
					alias: "Explorer",
					displayName: "Explorer",
				},
			},
			{
				path: "configure",
				// as: "Configuration",
				component: ConfigurationView,
				data: {
					alias: "Configuration",
					displayName: "Configuration",
				},
			},
		],
	},*/
	{
		path: "create",
		component: CreateAppView,
		data: {
			alias: "Create",
			displayName: "Create App",
		},
	},
];


export const appRoutingProviders:any[] = [
	//ActiveContextResolver,
	//AuthenticatedGuard,
	//NotAuthenticatedGuard,
];

export const routing:ModuleWithProviders = RouterModule.forChild( MyAppsRoutes );