System.register(["@angular/core", '@angular/common', "./literals/literal.component", "./literals/literals.component", "./pointers/pointer.component", "./pointers/pointers.component", "./property/property.component", "./document-resource/document-resource.component", "./blank-nodes/blank-node.component", "./blank-nodes/blank-nodes.component", "./named-fragments/named-fragment.component", "./named-fragments/named-fragments.component", "./list-viewer/list-viewer.component", "./document-viewer/document-viewer.component", "./document-tree-view/document-tree-view.component", "./document-explorer.component", "./../panel.module", "./documents-resolver.service"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, literal_component_1, literals_component_1, pointer_component_1, pointers_component_1, property_component_1, document_resource_component_1, blank_node_component_1, blank_nodes_component_1, named_fragment_component_1, named_fragments_component_1, list_viewer_component_1, document_viewer_component_1, document_tree_view_component_1, document_explorer_component_1, panel_module_1, documents_resolver_service_1;
    var DocumentExplorerModule;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (literal_component_1_1) {
                literal_component_1 = literal_component_1_1;
            },
            function (literals_component_1_1) {
                literals_component_1 = literals_component_1_1;
            },
            function (pointer_component_1_1) {
                pointer_component_1 = pointer_component_1_1;
            },
            function (pointers_component_1_1) {
                pointers_component_1 = pointers_component_1_1;
            },
            function (property_component_1_1) {
                property_component_1 = property_component_1_1;
            },
            function (document_resource_component_1_1) {
                document_resource_component_1 = document_resource_component_1_1;
            },
            function (blank_node_component_1_1) {
                blank_node_component_1 = blank_node_component_1_1;
            },
            function (blank_nodes_component_1_1) {
                blank_nodes_component_1 = blank_nodes_component_1_1;
            },
            function (named_fragment_component_1_1) {
                named_fragment_component_1 = named_fragment_component_1_1;
            },
            function (named_fragments_component_1_1) {
                named_fragments_component_1 = named_fragments_component_1_1;
            },
            function (list_viewer_component_1_1) {
                list_viewer_component_1 = list_viewer_component_1_1;
            },
            function (document_viewer_component_1_1) {
                document_viewer_component_1 = document_viewer_component_1_1;
            },
            function (document_tree_view_component_1_1) {
                document_tree_view_component_1 = document_tree_view_component_1_1;
            },
            function (document_explorer_component_1_1) {
                document_explorer_component_1 = document_explorer_component_1_1;
            },
            function (panel_module_1_1) {
                panel_module_1 = panel_module_1_1;
            },
            function (documents_resolver_service_1_1) {
                documents_resolver_service_1 = documents_resolver_service_1_1;
            }],
        execute: function() {
            DocumentExplorerModule = (function () {
                function DocumentExplorerModule() {
                }
                DocumentExplorerModule.forChild = function () {
                    return {
                        ngModule: DocumentExplorerModule,
                        providers: [documents_resolver_service_1.DocumentsResolverService]
                    };
                };
                DocumentExplorerModule = __decorate([
                    core_1.NgModule({
                        imports: [
                            common_1.CommonModule,
                            common_1.DeprecatedFormsModule,
                            panel_module_1.PanelModule
                        ],
                        declarations: [
                            literal_component_1.LiteralComponent,
                            literals_component_1.LiteralsComponent,
                            pointer_component_1.PointerComponent,
                            pointers_component_1.PointersComponent,
                            property_component_1.PropertyComponent,
                            document_resource_component_1.DocumentResourceComponent,
                            blank_node_component_1.BlankNodeComponent,
                            blank_nodes_component_1.BlankNodesComponent,
                            named_fragment_component_1.NamedFragmentComponent,
                            named_fragments_component_1.NamedFragmentsComponent,
                            list_viewer_component_1.ListViewerComponent,
                            document_viewer_component_1.DocumentViewerComponent,
                            document_tree_view_component_1.DocumentTreeViewComponent,
                            document_explorer_component_1.DocumentExplorerComponent,
                        ],
                        exports: [
                            document_explorer_component_1.DocumentExplorerComponent,
                        ],
                        providers: [],
                    }), 
                    __metadata('design:paramtypes', [])
                ], DocumentExplorerModule);
                return DocumentExplorerModule;
            }());
            exports_1("DocumentExplorerModule", DocumentExplorerModule);
            exports_1("default",DocumentExplorerModule);
        }
    }
});

//# sourceMappingURL=document-explorer.module.js.map
