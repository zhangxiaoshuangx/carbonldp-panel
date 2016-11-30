import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AppContentResolver } from "carbonldp-panel/my-apps/app-content/app-content.resolver";

import { AuthView } from "./auth.view";
import { AgentsView } from "./agents/agents.view";

const AuthRoutes:Routes = [
	{
		path: "",
		component: AuthView,
		// resolve: {
		// 	app: AppContentResolver,
		// },
		data: {
			alias: "auth",
			displayName: "Auth",
		},
		children: [
			{
				path: "",
				component: AgentsView,
				data: {
					alias: "agents",
					displayName: "Agents",
				},
			},
			{
				path: "agents",
				component: AgentsView,
				data: {
					alias: "agents",
					displayName: "Agents",
				},
			},
		]
	}
];

export const routing:ModuleWithProviders = RouterModule.forChild( AuthRoutes );