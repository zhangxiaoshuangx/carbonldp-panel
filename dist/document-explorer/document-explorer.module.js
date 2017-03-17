"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
// Components
var literal_component_1 = require("./literals/literal.component");
var literals_component_1 = require("./literals/literals.component");
var pointer_component_1 = require("./pointers/pointer.component");
var pointers_component_1 = require("./pointers/pointers.component");
var list_component_1 = require("./lists/list.component");
var lists_component_1 = require("./lists/lists.component");
var property_component_1 = require("./property/property.component");
var document_resource_component_1 = require("./document-resource/document-resource.component");
var blank_node_component_1 = require("./blank-nodes/blank-node.component");
var blank_nodes_component_1 = require("./blank-nodes/blank-nodes.component");
var named_fragment_component_1 = require("./named-fragments/named-fragment.component");
var named_fragments_component_1 = require("./named-fragments/named-fragments.component");
var document_viewer_component_1 = require("./document-viewer/document-viewer.component");
var document_tree_view_component_1 = require("./document-tree-view/document-tree-view.component");
var document_explorer_component_1 = require("./document-explorer.component");
var access_point_creator_component_1 = require("./access-point-creator/access-point-creator.component");
var document_creator_component_1 = require("./document-creator/document-creator.component");
var document_deleter_component_1 = require("./document-deleter/document-deleter.component");
// Modules
var panel_module_1 = require("./../panel.module");
var directives_module_1 = require("../directives/directives.module");
// Services
var documents_resolver_service_1 = require("./documents-resolver.service");
// Directives
var document_explorer_validators_1 = require("./document-explorer-validators");
var DocumentExplorerModule = DocumentExplorerModule_1 = (function () {
    function DocumentExplorerModule() {
    }
    DocumentExplorerModule.forChild = function () {
        return {
            ngModule: DocumentExplorerModule_1,
            providers: [documents_resolver_service_1.DocumentsResolverService]
        };
    };
    return DocumentExplorerModule;
}());
DocumentExplorerModule = DocumentExplorerModule_1 = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            panel_module_1.PanelModule,
            directives_module_1.DirectivesModule
        ],
        declarations: [
            literal_component_1.LiteralComponent,
            literals_component_1.LiteralsComponent,
            pointer_component_1.PointerComponent,
            pointers_component_1.PointersComponent,
            list_component_1.ListComponent,
            lists_component_1.ListsComponent,
            property_component_1.PropertyComponent,
            document_resource_component_1.DocumentResourceComponent,
            blank_node_component_1.BlankNodeComponent,
            blank_nodes_component_1.BlankNodesComponent,
            named_fragment_component_1.NamedFragmentComponent,
            named_fragments_component_1.NamedFragmentsComponent,
            document_viewer_component_1.DocumentViewerComponent,
            document_tree_view_component_1.DocumentTreeViewComponent,
            document_explorer_component_1.DocumentExplorerComponent,
            access_point_creator_component_1.AccessPointCreatorComponent,
            document_creator_component_1.DocumentCreatorComponent,
            document_deleter_component_1.DocumentDeleterComponent,
            document_explorer_validators_1.IdValidator,
            document_explorer_validators_1.PropertyNameValidator,
            document_explorer_validators_1.LiteralValueValidator,
            document_explorer_validators_1.PointerValidator,
        ],
        exports: [
            document_explorer_component_1.DocumentExplorerComponent,
        ],
        providers: [],
    })
], DocumentExplorerModule);
exports.DocumentExplorerModule = DocumentExplorerModule;
var DocumentExplorerModule_1;
