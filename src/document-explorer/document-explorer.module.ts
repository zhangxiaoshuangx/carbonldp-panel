import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule, DeprecatedFormsModule } from '@angular/common';

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

// Modules
import { PanelModule } from "./../panel.module";

// Services
import { DocumentsResolverService } from "./documents-resolver.service";


@NgModule( {
	imports: [
		CommonModule,
		DeprecatedFormsModule,
		PanelModule
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