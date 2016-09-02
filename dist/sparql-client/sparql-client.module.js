System.register(['@angular/core', '@angular/common', "@angular/router", "./response/response.component", "./sparql-client.component", "carbon-panel/code-mirror/code-mirror.component", "./resultset-table/relativize-uri.pipe", "./resultset-table/prefix-uri.pipe", "./resultset-table/resultset-table.component"], function(exports_1, context_1) {
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
    var core_1, common_1, router_1, response_component_1, sparql_client_component_1, CodeMirrorComponent, relativize_uri_pipe_1, prefix_uri_pipe_1, resultset_table_component_1;
    var SPARQLClientModule;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (response_component_1_1) {
                response_component_1 = response_component_1_1;
            },
            function (sparql_client_component_1_1) {
                sparql_client_component_1 = sparql_client_component_1_1;
            },
            function (CodeMirrorComponent_1) {
                CodeMirrorComponent = CodeMirrorComponent_1;
            },
            function (relativize_uri_pipe_1_1) {
                relativize_uri_pipe_1 = relativize_uri_pipe_1_1;
            },
            function (prefix_uri_pipe_1_1) {
                prefix_uri_pipe_1 = prefix_uri_pipe_1_1;
            },
            function (resultset_table_component_1_1) {
                resultset_table_component_1 = resultset_table_component_1_1;
            }],
        execute: function() {
            SPARQLClientModule = (function () {
                function SPARQLClientModule() {
                }
                SPARQLClientModule = __decorate([
                    core_1.NgModule({
                        imports: [
                            common_1.CommonModule,
                            common_1.DeprecatedFormsModule,
                            router_1.RouterModule,
                        ],
                        declarations: [
                            sparql_client_component_1.SPARQLClientComponent,
                            response_component_1.ResponseComponent,
                            resultset_table_component_1.ResultsetTableComponent,
                            CodeMirrorComponent.Class,
                            relativize_uri_pipe_1.RelativizeURIPipe,
                            prefix_uri_pipe_1.PrefixURIPipe,
                            prefix_uri_pipe_1.PrefixURIPipe,
                        ],
                        exports: [
                            sparql_client_component_1.SPARQLClientComponent,
                        ],
                    }), 
                    __metadata('design:paramtypes', [])
                ], SPARQLClientModule);
                return SPARQLClientModule;
            }());
            exports_1("SPARQLClientModule", SPARQLClientModule);
        }
    }
});

//# sourceMappingURL=sparql-client.module.js.map
