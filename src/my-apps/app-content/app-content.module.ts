import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import { routing } from "./app-content.routing";
import { AppContentResolver } from "./app-content.resolver";
import { AppContentService } from "./app-content.service";

// Components
import { AppContentView } from "./app-content.view";
import { DashboardView } from "./dashboard/dashboard.view";
import { EditAppComponent } from "./edit-app/edit-app.component";
import { EditAppView } from "./edit-app/edit-app.view";
import { SPARQLClientView } from "./sparql-client/sparql-client.view";
import { ExplorerView } from "./explorer/explorer.view";
// Components -> Configuration
import { BackupExporterComponent } from "./configuration/backup/backup-exporter/backup-exporter.component";
import { BackupImporterComponent } from "./configuration/backup/backup-importer/backup-importer.component";
import { BackupsListComponent } from "./configuration/backup/backups-list/backups-list.component";
import { BackupsComponent } from "./configuration/backup/backups.component";
import { ConfigurationComponent } from "./configuration/configuration.component";
import { ConfigurationView } from "./configuration/configuration.view";
// Components -> Security
import { SecurityView } from "./security/security.view";
import { SecurityComponent } from "./security/security.component";
import { AgentsComponent } from "./security/agents/agents.component";
import { AgentsListComponent } from "./security/agents/agents-list/agents-list.component";
import { AgentDetailsComponent } from "./security/agents/agent-details/agent-details.component";

//Directives
import { BackupFileValidator, AtLeastOneValidValidator } from "./configuration/backup/backup-importer/backup-importer-validators";

// Modules
import { PanelModule } from "./../../panel.module";
import { SPARQLClientModule } from "./../../sparql-client/sparql-client.module";
import { DocumentExplorerModule } from "./../../document-explorer/document-explorer.module";
import { DirectivesModule } from "./../../directives.module";

// Services
import { DocumentsResolverService } from "./../../document-explorer/documents-resolver.service";
import { JobsService } from "./configuration/job/jobs.service";
import { BackupsService } from "./configuration/backup/backups.service";
import { RolesService } from "./security/roles/roles.service";


@NgModule( {
	imports: [
		CommonModule,
		FormsModule,
		routing,
		PanelModule,
		SPARQLClientModule,
		DocumentExplorerModule,
		DirectivesModule,
	],
	declarations: [
		AppContentView,
		DashboardView,
		SPARQLClientView,
		EditAppView,
		EditAppComponent,
		ExplorerView,
		BackupExporterComponent,
		BackupImporterComponent,
		BackupsListComponent,
		BackupsComponent,
		ConfigurationComponent,
		ConfigurationView,
		SecurityView,
		SecurityComponent,
		AgentsComponent,
		AgentsListComponent,
		AgentDetailsComponent,
		BackupFileValidator,
		AtLeastOneValidValidator
	],
	exports: [],
	providers: [
		AppContentService,
		AppContentResolver,
		DocumentsResolverService,
		JobsService,
		BackupsService,
		RolesService,
	],
} )
export class AppContentModule {
}
export default AppContentModule;