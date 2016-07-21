System.register(["@angular/core", "carbonldp/App", "carbonldp/PersistedDocument", "carbon-panel/errors-area/error-message.component", "../../job/jobs.service", "../../job/job", "semantic-ui/semantic", "./backup-exporter.component.html!", "./backup-exporter.component.css!text"], function(exports_1, context_1) {
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
    var core_1, App, PersistedDocument, error_message_component_1, jobs_service_1, Job, backup_exporter_component_html_1, backup_exporter_component_css_text_1;
    var BackupExporterComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (App_1) {
                App = App_1;
            },
            function (PersistedDocument_1) {
                PersistedDocument = PersistedDocument_1;
            },
            function (error_message_component_1_1) {
                error_message_component_1 = error_message_component_1_1;
            },
            function (jobs_service_1_1) {
                jobs_service_1 = jobs_service_1_1;
            },
            function (Job_1) {
                Job = Job_1;
            },
            function (_1) {},
            function (backup_exporter_component_html_1_1) {
                backup_exporter_component_html_1 = backup_exporter_component_html_1_1;
            },
            function (backup_exporter_component_css_text_1_1) {
                backup_exporter_component_css_text_1 = backup_exporter_component_css_text_1_1;
            }],
        execute: function() {
            BackupExporterComponent = (function () {
                function BackupExporterComponent(jobsService) {
                    this.executingBackup = false;
                    this.errorMessages = [];
                    this.jobsService = jobsService;
                }
                BackupExporterComponent.prototype.onGenerateBackup = function () {
                    var _this = this;
                    this.executingBackup = true;
                    this.jobsService.runJob(this.backupJob).then(function (execution) {
                        return _this.monitorExecution(execution).catch(function (executionOrError) {
                            if (executionOrError.hasOwnProperty("response"))
                                return Promise.reject(executionOrError);
                            var errorMessage = {
                                title: "Couldn't execute backup.",
                                content: "An error occurred while executing your export backup job. This may be caused due to a bad configuration during the creation of your job.",
                                statusMessage: execution[Job.Execution.ERROR_DESCRIPTION]
                            };
                            _this.errorMessages.push(errorMessage);
                        });
                    }).then(function () {
                        _this.exportSuccess = true;
                    }).catch(function (error) {
                        var errorMessage = {
                            title: error.name,
                            content: "Couldn't execute backup.",
                            endpoint: error.response.request.responseURL,
                            statusCode: "" + error.response.request.status,
                            statusMessage: error.response.request.statusText
                        };
                        _this.errorMessages.push(errorMessage);
                    }).then(function () {
                        _this.executingBackup = false;
                    });
                };
                BackupExporterComponent.prototype.monitorExecution = function (execution) {
                    var _this = this;
                    return new Promise(function (resolve, reject) {
                        // setInterval in the browser returns a number but in NodeJS it returns a Time object, that's why this variable needs to be of type "any"
                        var interval = setInterval(function () {
                            execution.refresh().then(function () {
                                switch (execution[Job.Execution.STATUS].id) {
                                    case Job.ExecutionStatus.FINISHED:
                                        clearInterval(interval);
                                        resolve(execution);
                                        break;
                                    case Job.ExecutionStatus.ERROR:
                                        clearInterval(interval);
                                        reject(execution);
                                        break;
                                }
                            }).catch(function (error) {
                                var errorMessage = {
                                    title: error.name,
                                    content: "Couldn't monitor the exporting backup status.",
                                    endpoint: error.response.request.responseURL,
                                    statusCode: "" + error.response.request.status,
                                    statusMessage: error.response.request.statusText
                                };
                                _this.errorMessages = [errorMessage];
                                clearInterval(interval);
                                _this.executingBackup = false;
                            });
                        }, 3000);
                    });
                };
                BackupExporterComponent.prototype.removeMessage = function (index) {
                    this.errorMessages.splice(index, 1);
                };
                BackupExporterComponent.prototype.onCloseSuccess = function () {
                    this.exportSuccess = false;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', App.Context)
                ], BackupExporterComponent.prototype, "appContext", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], BackupExporterComponent.prototype, "backupJob", void 0);
                BackupExporterComponent = __decorate([
                    core_1.Component({
                        selector: "cp-backup-exporter",
                        template: backup_exporter_component_html_1.default,
                        styles: [backup_exporter_component_css_text_1.default],
                        directives: [error_message_component_1.ErrorMessageComponent],
                    }), 
                    __metadata('design:paramtypes', [jobs_service_1.JobsService])
                ], BackupExporterComponent);
                return BackupExporterComponent;
            }());
            exports_1("BackupExporterComponent", BackupExporterComponent);
            exports_1("default",BackupExporterComponent);
        }
    }
});

//# sourceMappingURL=backup-exporter.component.js.map
