"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var response_component_1 = require("./response/response.component");
var sparql_client_component_1 = require("./sparql-client.component");
var CodeMirrorComponent = require("carbonldp-panel/code-mirror/code-mirror.component");
var relativize_uri_pipe_1 = require("./resultset-table/relativize-uri.pipe");
var prefix_uri_pipe_1 = require("./resultset-table/prefix-uri.pipe");
var resultset_table_component_1 = require("./resultset-table/resultset-table.component");
var SPARQLClientModule = (function () {
    function SPARQLClientModule() {
    }
    SPARQLClientModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule,
                forms_1.FormsModule
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
exports.SPARQLClientModule = SPARQLClientModule;

//# sourceMappingURL=sparql-client.module.js.map
