import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
// Components
import { LiteralComponent } from "./literals/literal.component";
import { LiteralsComponent } from "./literals/literals.component";
import { PointerComponent } from "./pointers/pointer.component";
import { PointersComponent } from "./pointers/pointers.component";
import { PropertyComponent } from "./property/property.component";
import { DocumentResourceComponent } from "./document-resource/document-resource.component";
import { BlankNodeComponent } from "./blank-nodes/blank-node.component";
import { BlankNodesComponent } from "./blank-nodes/blank-nodes.component";
import { NamedFragmentComponent } from "./named-fragments/named-fragment.component";
import { NamedFragmentsComponent } from "./named-fragments/named-fragments.component";
import { ListViewerComponent } from "./list-viewer/list-viewer.component";
import { DocumentViewerComponent } from "./document-viewer/document-viewer.component";
import { DocumentTreeViewComponent } from "./document-tree-view/document-tree-view.component";
import { DocumentExplorerComponent } from "./document-explorer.component";

// Modules
import { PanelModule } from "./../panel.module";
import { DirectivesModule } from "./../directives.module";

// Services
import { DocumentsResolverService } from "./documents-resolver.service";


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
		PropertyComponent,
		DocumentResourceComponent,
		BlankNodeComponent,
		BlankNodesComponent,
		NamedFragmentComponent,
		NamedFragmentsComponent,
		ListViewerComponent,
		DocumentViewerComponent,
		DocumentTreeViewComponent,
		DocumentExplorerComponent,
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
export default DocumentExplorerModule;