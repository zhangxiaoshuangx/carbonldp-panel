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
var core_1 = require("@angular/core");
var App = require("carbonldp/App");
var jobs_service_1 = require("../job/jobs.service");
var Job = require("../job/job");
var backups_list_component_1 = require("./backups-list/backups-list.component");
require("semantic-ui/semantic");
var BackupsComponent = (function () {
    function BackupsComponent(jobsService) {
        this.jobsService = jobsService;
    }
    BackupsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.jobsService.getJobOfType(Job.Type.EXPORT_BACKUP, this.appContext).then(function (job) {
            if (!!job)
                _this.backupJob = job;
            else
                _this.jobsService.createExportBackup(_this.appContext).then(function (exportBackupJob) {
                    _this.backupJob = exportBackupJob;
                });
        });
    };
    BackupsComponent.prototype.invokeRefreshBackupsList = function () {
        this.backupsListComponent.fetchBackupsList.emit(true);
    };
    return BackupsComponent;
}());
__decorate([
    core_1.ViewChild(backups_list_component_1.BackupsListComponent),
    __metadata("design:type", backups_list_component_1.BackupsListComponent)
], BackupsComponent.prototype, "backupsListComponent", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", App.Context)
], BackupsComponent.prototype, "appContext", void 0);
BackupsComponent = __decorate([
    core_1.Component({
        selector: "cp-backup",
        templateUrl: "./backups.component.html",
        styleUrls: ["./backups.component.scss"],
    }),
    __metadata("design:paramtypes", [jobs_service_1.JobsService])
], BackupsComponent);
exports.BackupsComponent = BackupsComponent;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BackupsComponent;

//# sourceMappingURL=backups.component.js.map
