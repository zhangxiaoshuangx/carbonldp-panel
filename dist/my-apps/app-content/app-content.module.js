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
var app_content_routing_1 = require("./app-content.routing");
var app_content_resolver_1 = require("./app-content.resolver");
var app_content_service_1 = require("./app-content.service");
// Components
var app_content_view_1 = require("./app-content.view");
var dashboard_view_1 = require("./dashboard/dashboard.view");
var edit_app_component_1 = require("./edit-app/edit-app.component");
var edit_app_view_1 = require("./edit-app/edit-app.view");
var sparql_client_view_1 = require("./sparql-client/sparql-client.view");
var explorer_view_1 = require("./explorer/explorer.view");
// Components -> Configuration
var backup_exporter_component_1 = require("./configuration/backup/backup-exporter/backup-exporter.component");
var backup_importer_component_1 = require("./configuration/backup/backup-importer/backup-importer.component");
var backups_list_component_1 = require("./configuration/backup/backups-list/backups-list.component");
var backups_component_1 = require("./configuration/backup/backups.component");
var configuration_component_1 = require("./configuration/configuration.component");
var configuration_view_1 = require("./configuration/configuration.view");
//Directives
var backup_importer_validators_1 = require("./configuration/backup/backup-importer/backup-importer-validators");
// Modules
var panel_module_1 = require("./../../panel.module");
var sparql_client_module_1 = require("./../../sparql-client/sparql-client.module");
var document_explorer_module_1 = require("./../../document-explorer/document-explorer.module");
var directives_module_1 = require("../../directives/directives.module");
// Services
var documents_resolver_service_1 = require("./../../document-explorer/documents-resolver.service");
var jobs_service_1 = require("./configuration/job/jobs.service");
var backups_service_1 = require("./configuration/backup/backups.service");
var AppContentModule = (function () {
    function AppContentModule() {
    }
    return AppContentModule;
}());
AppContentModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            app_content_routing_1.routing,
            panel_module_1.PanelModule,
            sparql_client_module_1.SPARQLClientModule,
            document_explorer_module_1.DocumentExplorerModule,
            directives_module_1.DirectivesModule,
        ],
        declarations: [
            app_content_view_1.AppContentView,
            dashboard_view_1.DashboardView,
            sparql_client_view_1.SPARQLClientView,
            edit_app_view_1.EditAppView,
            edit_app_component_1.EditAppComponent,
            explorer_view_1.ExplorerView,
            backup_exporter_component_1.BackupExporterComponent,
            backup_importer_component_1.BackupImporterComponent,
            backups_list_component_1.BackupsListComponent,
            backups_component_1.BackupsComponent,
            configuration_component_1.ConfigurationComponent,
            configuration_view_1.ConfigurationView,
            backup_importer_validators_1.BackupFileValidator,
            backup_importer_validators_1.AtLeastOneValidValidator
        ],
        exports: [],
        providers: [
            app_content_service_1.AppContentService,
            app_content_resolver_1.AppContentResolver,
            documents_resolver_service_1.DocumentsResolverService,
            jobs_service_1.JobsService,
            backups_service_1.BackupsService,
        ],
    })
], AppContentModule);
exports.AppContentModule = AppContentModule;
