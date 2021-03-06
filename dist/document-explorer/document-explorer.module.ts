import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
// Components
import { LiteralComponent } from "./literals/literal.component";
import { LiteralsComponent } from "./literals/literals.component";
import { PointerComponent } from "./pointers/pointer.component";
import { PointersComponent } from "./pointers/pointers.component";
import { ListComponent } from "./lists/list.component";
import { ListsComponent } from "./lists/lists.component";
import { PropertyComponent } from "./property/property.component";
import { DocumentResourceComponent } from "./document-resource/document-resource.component";
import { BlankNodeComponent } from "./blank-nodes/blank-node.component";
import { BlankNodesComponent } from "./blank-nodes/blank-nodes.component";
import { NamedFragmentComponent } from "./named-fragments/named-fragment.component";
import { NamedFragmentsComponent } from "./named-fragments/named-fragments.component";
import { DocumentViewerComponent } from "./document-viewer/document-viewer.component";
import { DocumentTreeViewComponent } from "./document-tree-view/document-tree-view.component";
import { DocumentExplorerComponent } from "./document-explorer.component";
import { AccessPointCreatorComponent } from "./access-point-creator/access-point-creator.component";
import { DocumentCreatorComponent } from "./document-creator/document-creator.component";
import { DocumentDeleterComponent } from "./document-deleter/document-deleter.component";

// Modules
import { PanelModule } from "./../panel.module";
import { DirectivesModule } from "../directives/directives.module";

// Services
import { DocumentsResolverService } from "./documents-resolver.service";

// Directives
import { IdValidator, PropertyNameValidator, LiteralValueValidator, PointerValidator } from "./document-explorer-validators";

@NgModule( {
	imports: [
		CommonModule,
		FormsModule,
		PanelModule,
		DirectivesModule
	],
	declarations: [
		LiteralComponent,
		LiteralsComponent,
		PointerComponent,
		PointersComponent,
		ListComponent,
		ListsComponent,
		PropertyComponent,
		DocumentResourceComponent,
		BlankNodeComponent,
		BlankNodesComponent,
		NamedFragmentComponent,
		NamedFragmentsComponent,
		DocumentViewerComponent,
		DocumentTreeViewComponent,
		DocumentExplorerComponent,
		AccessPointCreatorComponent,
		DocumentCreatorComponent,
		DocumentDeleterComponent,
		IdValidator,
		PropertyNameValidator,
		LiteralValueValidator,
		PointerValidator,
	],
	exports: [
		DocumentExplorerComponent,
	],
	providers: [],
} )
export class DocumentExplorerModule {

	static forChild():ModuleWithProviders {
		return {
			ngModule: DocumentExplorerModule,
			providers: [ DocumentsResolverService ]
		};
	}

}