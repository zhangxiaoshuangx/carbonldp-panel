import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule, DeprecatedFormsModule } from '@angular/common';

import { routing } from "./app-content.routing";
import { AppContentResolver } from "./app-content.resolver";
import { AppContentService } from "./app-content.service";


import { AppContentView } from "./app-content.view";
import { DashboardView } from "./dashboard/dashboard.view";

import { EditAppComponent } from "./edit-app/edit-app.component";
import { EditAppView } from "./edit-app/edit-app.view";

import { SPARQLClientView } from "./sparql-client/sparql-client.view";

import { LiteralComponent } from "./explorer/document-explorer/literals/literal.component";
import { LiteralsComponent } from "./explorer/document-explorer/literals/literals.component";
import { PointerComponent } from "./explorer/document-explorer/pointers/pointer.component";
import { PointersComponent } from "./explorer/document-explorer/pointers/pointers.component";
import { PropertyComponent } from "./explorer/document-explorer/property/property.component";
import { DocumentResourceComponent } from "./explorer/document-explorer/document-resource/document-resource.component";
import { BlankNodeComponent } from "./explorer/document-explorer/blank-nodes/blank-node.component";
import { BlankNodesComponent } from "./explorer/document-explorer/blank-nodes/blank-nodes.component";
import { NamedFragmentComponent } from "./explorer/document-explorer/named-fragments/named-fragment.component";
import { NamedFragmentsComponent } from "./explorer/document-explorer/named-fragments/named-fragments.component";
import { ListViewerComponent } from "./explorer/document-explorer/list-viewer/list-viewer.component";
import { DocumentViewerComponent } from "./explorer/document-explorer/document-viewer/document-viewer.component";
import { DocumentTreeViewComponent } from "./explorer/document-explorer/document-tree-view/document-tree-view.component";
import { DocumentExplorerComponent } from "./explorer/document-explorer/document-explorer.component";
import { ExplorerView } from "./explorer/explorer.view";

import { BackupExporterComponent } from "./configuration/backup/backup-exporter/backup-exporter.component";
import { BackupImporterComponent } from "./configuration/backup/backup-importer/backup-importer.component";
import { BackupsListComponent } from "./configuration/backup/backups-list/backups-list.component";
import { BackupsComponent } from "./configuration/backup/backups.component";
import { ConfigurationComponent } from "./configuration/configuration.component";
import { ConfigurationView } from "./configuration/configuration.view";

import { DocumentsResolverService } from "./explorer/document-explorer/documents-resolver.service";
import { JobsService } from "./configuration/job/jobs.service";
import { BackupsService } from "./configuration/backup/backups.service";

import { PanelModule } from "./../../panel.module";
import { SPARQLClientModule } from "./../../sparql-client/sparql-client.module";

@NgModule( {
	imports: [
		BrowserModule,
		CommonModule,
		DeprecatedFormsModule,
		routing,
		PanelModule,
		SPARQLClientModule,
	],
	declarations: [
		AppContentView,
		DashboardView,
		SPARQLClientView,
		EditAppView,
		EditAppComponent,
		PropertyComponent,
		LiteralComponent,
		LiteralsComponent,
		PointerComponent,
		PointersComponent,
		DocumentResourceComponent,
		BlankNodeComponent,
		BlankNodesComponent,
		NamedFragmentComponent,
		NamedFragmentsComponent,
		ListViewerComponent,
		DocumentViewerComponent,
		DocumentTreeViewComponent,
		DocumentExplorerComponent,
		ExplorerView,
		BackupExporterComponent,
		BackupImporterComponent,
		BackupsListComponent,
		BackupsComponent,
		ConfigurationComponent,
		ConfigurationView,
	],
	exports: [],
	providers: [
		AppContentService,
		AppContentResolver,
		DocumentsResolverService,
		JobsService,
		BackupsService,
	],
} )
export class AppContentModule {
}
export default AppContentModule;