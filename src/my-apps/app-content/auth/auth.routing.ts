import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";


import { AuthView } from "./auth.view";
import { AgentsView } from "./agents/agents.view";
import { AgentResolver } from "./agents/agent.resolver";
import { AgentsListView } from "./agents/agents-list/agents-list.view";
import { AgentDetailsView } from "./agents/agent-details/agent-details.view";
import { AgentCreatorView } from "./agents/agent-creator/agent-creator.view";
import { AgentNotFoundView } from "./agents/agent-not-found/agent-not-found.view";
import { RolesView } from "./roles/roles.view";

const AuthRoutes:Routes = [
	{
		path: "",
		data: {
			alias: "auth",
			displayName: "Auth",
		},
		component: AuthView,
		children: [
			{
				path: "",
				redirectTo: "agents",
				pathMatch: "full",
			},
			{
				path: "agents",
				data: {
					alias: "agents",
					displayName: "Agents",
				},
				component: AgentsView,
				children: [
					{
						path: "",
						component: AgentsListView,
					},
					{
						path: "list",
						component: AgentsListView,
					},
					{
						path: "create",
						data: {
							alias: "create",
							displayName: "Create Agent",
						},
						component: AgentCreatorView,
					},
					{
						path: "agent-not-found",
						component: AgentNotFoundView,
						data: {
							alias: "agent-not-found",
							displayName: "No Agent"
						}
					},
					{
						path: ":agent-slug",
						resolve: {
							agent: AgentResolver,
						},
						data: {
							param: "agent-slug",
							displayName: "Agent",
							title: "Agent",
						},
						component: AgentDetailsView,
					}
				]
			},
			{
				path: "roles",
				data: {
					alias: "roles",
					displayName: "Roles",
				},
				component: RolesView,
			}
		]
	}
];

export const routing:ModuleWithProviders = RouterModule.forChild( AuthRoutes );