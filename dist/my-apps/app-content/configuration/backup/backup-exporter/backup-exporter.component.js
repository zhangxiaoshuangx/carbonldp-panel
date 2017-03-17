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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var App = require("carbonldp/App");
var PersistedDocument = require("carbonldp/PersistedDocument");
var message_component_1 = require("carbonldp-panel/messages-area/message.component");
var jobs_service_1 = require("../../job/jobs.service");
var Job = require("../../job/job");
require("semantic-ui/semantic");
var BackupExporterComponent = (function () {
    function BackupExporterComponent(jobsService) {
        this.executingBackup = false;
        this.errorMessages = [];
        this.onExportSuccess = new core_1.EventEmitter();
        this.jobsService = jobsService;
    }
    BackupExporterComponent.prototype.onGenerateBackup = function () {
        var _this = this;
        this.executingBackup = true;
        this.exportSuccess = false;
        this.jobsService.runJob(this.backupJob).then(function (execution) {
            return _this.monitorExecution(execution).catch(function (executionOrError) {
                if (executionOrError.hasOwnProperty("response"))
                    return Promise.reject(executionOrError);
                var errorMessage = {
                    title: "Couldn't execute backup.",
                    type: message_component_1.Types.ERROR,
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
                type: message_component_1.Types.ERROR,
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
            // Node typings are overriding setInterval, that's why we need to cast it to any before assigning it to a number variable
            _this.monitorExecutionInterval = setInterval(function () {
                execution.refresh().then(function () {
                    switch (execution[Job.Execution.STATUS].id) {
                        case Job.ExecutionStatus.FINISHED:
                            clearInterval(_this.monitorExecutionInterval);
                            resolve(execution);
                            _this.onExportSuccess.emit(true);
                            break;
                        case Job.ExecutionStatus.ERROR:
                            clearInterval(_this.monitorExecutionInterval);
                            reject(execution);
                            break;
                    }
                }).catch(function (error) {
                    var errorMessage = {
                        title: error.name,
                        type: message_component_1.Types.ERROR,
                        content: "Couldn't monitor the exporting backup status.",
                        endpoint: error.response.request.responseURL,
                        statusCode: "" + error.response.request.status,
                        statusMessage: error.response.request.statusText
                    };
                    _this.errorMessages = [errorMessage];
                    clearInterval(_this.monitorExecutionInterval);
                    _this.executingBackup = false;
                });
            }, 3000);
        });
    };
    BackupExporterComponent.prototype.ngOnDestroy = function () {
        if (typeof this.monitorExecutionInterval !== "undefined")
            clearInterval(this.monitorExecutionInterval);
    };
    BackupExporterComponent.prototype.removeMessage = function (index) {
        this.errorMessages.splice(index, 1);
    };
    BackupExporterComponent.prototype.onCloseSuccess = function () {
        this.exportSuccess = false;
    };
    BackupExporterComponent.prototype.closeMessage = function (messageDiv) {
        $(messageDiv).transition({ animation: "fade" });
    };
    return BackupExporterComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", App.Context)
], BackupExporterComponent.prototype, "appContext", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], BackupExporterComponent.prototype, "backupJob", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], BackupExporterComponent.prototype, "onExportSuccess", void 0);
BackupExporterComponent = __decorate([
    core_1.Component({
        selector: "cp-backup-exporter",
        templateUrl: "./backup-exporter.component.html",
        styleUrls: ["./backup-exporter.component.scss"],
    }),
    __metadata("design:paramtypes", [jobs_service_1.JobsService])
], BackupExporterComponent);
exports.BackupExporterComponent = BackupExporterComponent;
