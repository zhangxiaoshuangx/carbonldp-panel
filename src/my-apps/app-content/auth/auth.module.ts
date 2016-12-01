import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

//Providers
import { routing } from "./auth.routing";

// Components
import { AuthView } from "./auth.view";
import { AgentsView } from "./agents/agents.view";
import { AgentsComponent } from "./agents/agents.component";
import { AgentsListView } from "./agents/agents-list/agents-list.view";
import { AgentsListComponent } from "./agents/agents-list/agents-list.component";
import { AgentDetailsView } from "./agents/agent-details/agent-details.view";
import { AgentDetailsComponent } from "./agents/agent-details/agent-details.component";
import { AgentDeleterComponent } from "./agents/agent-deleter/agent-deleter.component";
import { RolesChooserComponent } from "./roles/roles-chooser/roles-chooser.component";


// Modules
import { PanelModule } from "carbonldp-panel/panel.module";
import { DirectivesModule } from "carbonldp-panel/directives.module";

// Services
import { AgentsService } from "./agents/agents.service";
import { RolesService } from "./roles/roles.service";
import { AgentResolver } from "./agents/agent.resolver";


@NgModule( {
	imports: [
		CommonModule,
		FormsModule,
		routing,
		PanelModule,
		DirectivesModule,
	],
	declarations: [
		AuthView,
		AgentsView,
		AgentsComponent,
		AgentsListView,
		AgentsListComponent,
		AgentDetailsView,
		AgentDetailsComponent,
		AgentDeleterComponent,
		RolesChooserComponent
	],
	providers: [
		AgentsService,
		RolesService,
		AgentResolver,
	],
} )
export class AuthModule {
}
export default AuthModule;
