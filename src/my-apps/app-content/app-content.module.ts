import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule, DeprecatedFormsModule } from '@angular/common';


import { routing } from "./app-content.routing";

import { AppContentView } from "./app-content.view";
import { EditAppView } from "./edit-app/edit-app.view";
import { EditAppComponent } from "./edit-app/edit-app.component";
import { DashboardView } from "./dashboard/dashboard.view";
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
import { DocumentsResolverService } from "./explorer/document-explorer/documents-resolver.service";


// / import { ConfigurationView } from "./app-content/configuration/configuration.view";


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
		//ConfigurationView
	],
	providers: [
		AppContentView, //TODO: remove when host injection is resolved.
		DocumentsResolverService,
	],
} )
export class AppContentModule {
}
export default AppContentModule;