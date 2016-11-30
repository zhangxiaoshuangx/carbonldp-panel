import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

//Providers
import { routing } from "./auth.routing";

// Components
import { AuthView } from "./auth.view";
import { AgentsView } from "./agents/agents.view";
import { AgentsComponent } from "./agents/agents.component";
import { AgentsListComponent } from "./agents/agents-list/agents-list.component";
import { AgentDetailsComponent } from "./agents/agent-details/agent-details.component";
import { AgentDeleterComponent } from "./agents/agent-deleter/agent-deleter.component";
import { RolesChooserComponent } from "./roles/roles-chooser/roles-chooser.component";


// Modules
import { PanelModule } from "carbonldp-panel/panel.module";
import { DirectivesModule } from "carbonldp-panel/directives.module";

// Services
import { AgentsService } from "./agents/agents.service";
import { RolesService } from "./roles/roles.service";


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
		AgentsListComponent,
		AgentDetailsComponent,
		AgentDeleterComponent,
		RolesChooserComponent
	],
	providers: [
		AgentsService,
		RolesService,
	],
} )
export class AuthModule {
}
export default AuthModule;
