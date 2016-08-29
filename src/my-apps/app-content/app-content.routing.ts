import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DashboardView } from "./dashboard/dashboard.view";
import { SPARQLClientView } from "./sparql-client/sparql-client.view";
import { EditAppView } from "./edit-app/edit-app.view";
import { ExplorerView } from "./explorer/explorer.view";
//import { ConfigurationView } from "./configuration/configuration.view";

const AppContentRoutes:Routes = [
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
			},/*
			{
				path: "configure",
				// as: "Configuration",
				component: ConfigurationView,
				data: {
					alias: "Configuration",
					displayName: "Configuration",
				},
			},*/

];

export const routing:ModuleWithProviders = RouterModule.forChild( AppContentRoutes );