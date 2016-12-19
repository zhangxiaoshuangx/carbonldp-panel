import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";


import { SecurityView } from "./security.view";
import { AgentsView } from "./agents/agents.view";
import { AgentResolver } from "./agents/agent.resolver";
import { AgentsListView } from "./agents/agents-list/agents-list.view";
import { AgentDetailsView } from "./agents/agent-details/agent-details.view";
import { AgentCreatorView } from "./agents/agent-creator/agent-creator.view";
import { AgentNotFoundView } from "./agents/agent-not-found/agent-not-found.view";
import { RolesView } from "./roles/roles.view";
import { RoleResolver } from "./roles/role.resolver";
import { RolesCatalogView } from "./roles/roles-catalog/roles-catalog.view";
import { RoleDetailsView } from "./roles/role-details/role-details.view";

const SecurityRoutes:Routes = [
	{
		path: "",
		data: {
			alias: "security",
			displayName: "Security",
		},
		component: SecurityView,
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
				children: [
					{
						path: "",
						component: RolesCatalogView,
					},
					{
						path: "list",
						component: RolesCatalogView,
					},
					{
						path: ":role-slug",
						resolve: {
							role: RoleResolver,
						},
						data: {
							param: "role-slug",
							displayName: "Role",
							title: "Role",
						},
						component: RoleDetailsView,
					},
				]
			}
		]
	}
];

export const routing:ModuleWithProviders = RouterModule.forChild( SecurityRoutes );