System.register(["@angular/core", '@angular/common', "@angular/forms", "./app-content.routing", "./app-content.resolver", "./app-content.service", "./app-content.view", "./dashboard/dashboard.view", "./edit-app/edit-app.component", "./edit-app/edit-app.view", "./sparql-client/sparql-client.view", "./explorer/explorer.view", "./configuration/backup/backup-exporter/backup-exporter.component", "./configuration/backup/backup-importer/backup-importer.component", "./configuration/backup/backups-list/backups-list.component", "./configuration/backup/backups.component", "./configuration/configuration.component", "./configuration/configuration.view", "./security/security.view", "./security/security.component", "./security/agents/agents.component", "./security/agents/agents-list/agents-list.component", "./security/agents/agent-details/agent-details.component", "./configuration/backup/backup-importer/backup-importer-validators", "./../../panel.module", "./../../sparql-client/sparql-client.module", "./../../document-explorer/document-explorer.module", "./../../directives.module", "./../../document-explorer/documents-resolver.service", "./configuration/job/jobs.service", "./configuration/backup/backups.service"], function(exports_1, context_1) {
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
    var core_1, common_1, forms_1, app_content_routing_1, app_content_resolver_1, app_content_service_1, app_content_view_1, dashboard_view_1, edit_app_component_1, edit_app_view_1, sparql_client_view_1, explorer_view_1, backup_exporter_component_1, backup_importer_component_1, backups_list_component_1, backups_component_1, configuration_component_1, configuration_view_1, security_view_1, security_component_1, agents_component_1, agents_list_component_1, agent_details_component_1, backup_importer_validators_1, panel_module_1, sparql_client_module_1, document_explorer_module_1, directives_module_1, documents_resolver_service_1, jobs_service_1, backups_service_1;
    var AppContentModule;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (app_content_routing_1_1) {
                app_content_routing_1 = app_content_routing_1_1;
            },
            function (app_content_resolver_1_1) {
                app_content_resolver_1 = app_content_resolver_1_1;
            },
            function (app_content_service_1_1) {
                app_content_service_1 = app_content_service_1_1;
            },
            function (app_content_view_1_1) {
                app_content_view_1 = app_content_view_1_1;
            },
            function (dashboard_view_1_1) {
                dashboard_view_1 = dashboard_view_1_1;
            },
            function (edit_app_component_1_1) {
                edit_app_component_1 = edit_app_component_1_1;
            },
            function (edit_app_view_1_1) {
                edit_app_view_1 = edit_app_view_1_1;
            },
            function (sparql_client_view_1_1) {
                sparql_client_view_1 = sparql_client_view_1_1;
            },
            function (explorer_view_1_1) {
                explorer_view_1 = explorer_view_1_1;
            },
            function (backup_exporter_component_1_1) {
                backup_exporter_component_1 = backup_exporter_component_1_1;
            },
            function (backup_importer_component_1_1) {
                backup_importer_component_1 = backup_importer_component_1_1;
            },
            function (backups_list_component_1_1) {
                backups_list_component_1 = backups_list_component_1_1;
            },
            function (backups_component_1_1) {
                backups_component_1 = backups_component_1_1;
            },
            function (configuration_component_1_1) {
                configuration_component_1 = configuration_component_1_1;
            },
            function (configuration_view_1_1) {
                configuration_view_1 = configuration_view_1_1;
            },
            function (security_view_1_1) {
                security_view_1 = security_view_1_1;
            },
            function (security_component_1_1) {
                security_component_1 = security_component_1_1;
            },
            function (agents_component_1_1) {
                agents_component_1 = agents_component_1_1;
            },
            function (agents_list_component_1_1) {
                agents_list_component_1 = agents_list_component_1_1;
            },
            function (agent_details_component_1_1) {
                agent_details_component_1 = agent_details_component_1_1;
            },
            function (backup_importer_validators_1_1) {
                backup_importer_validators_1 = backup_importer_validators_1_1;
            },
            function (panel_module_1_1) {
                panel_module_1 = panel_module_1_1;
            },
            function (sparql_client_module_1_1) {
                sparql_client_module_1 = sparql_client_module_1_1;
            },
            function (document_explorer_module_1_1) {
                document_explorer_module_1 = document_explorer_module_1_1;
            },
            function (directives_module_1_1) {
                directives_module_1 = directives_module_1_1;
            },
            function (documents_resolver_service_1_1) {
                documents_resolver_service_1 = documents_resolver_service_1_1;
            },
            function (jobs_service_1_1) {
                jobs_service_1 = jobs_service_1_1;
            },
            function (backups_service_1_1) {
                backups_service_1 = backups_service_1_1;
            }],
        execute: function() {
            AppContentModule = (function () {
                function AppContentModule() {
                }
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
                            security_view_1.SecurityView,
                            security_component_1.SecurityComponent,
                            agents_component_1.AgentsComponent,
                            agents_list_component_1.AgentsListComponent,
                            agent_details_component_1.AgentDetailsComponent,
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
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppContentModule);
                return AppContentModule;
            }());
            exports_1("AppContentModule", AppContentModule);
            exports_1("default",AppContentModule);
        }
    }
});

//# sourceMappingURL=app-content.module.js.map
