System.register(["@angular/core", "carbonldp/App", "../job/jobs.service", "../job/job", "./backups-list/backups-list.component", "semantic-ui/semantic", "./backups.component.html!", "./backups.component.css!text"], function(exports_1, context_1) {
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
    var core_1, App, jobs_service_1, Job, backups_list_component_1, backups_component_html_1, backups_component_css_text_1;
    var BackupsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (App_1) {
                App = App_1;
            },
            function (jobs_service_1_1) {
                jobs_service_1 = jobs_service_1_1;
            },
            function (Job_1) {
                Job = Job_1;
            },
            function (backups_list_component_1_1) {
                backups_list_component_1 = backups_list_component_1_1;
            },
            function (_1) {},
            function (backups_component_html_1_1) {
                backups_component_html_1 = backups_component_html_1_1;
            },
            function (backups_component_css_text_1_1) {
                backups_component_css_text_1 = backups_component_css_text_1_1;
            }],
        execute: function() {
            BackupsComponent = (function () {
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
                __decorate([
                    core_1.ViewChild(backups_list_component_1.BackupsListComponent), 
                    __metadata('design:type', backups_list_component_1.BackupsListComponent)
                ], BackupsComponent.prototype, "backupsListComponent", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', App.Context)
                ], BackupsComponent.prototype, "appContext", void 0);
                BackupsComponent = __decorate([
                    core_1.Component({
                        selector: "cp-backup",
                        template: backups_component_html_1.default,
                        styles: [backups_component_css_text_1.default],
                    }), 
                    __metadata('design:paramtypes', [jobs_service_1.JobsService])
                ], BackupsComponent);
                return BackupsComponent;
            }());
            exports_1("BackupsComponent", BackupsComponent);
            exports_1("default",BackupsComponent);
        }
    }
});

//# sourceMappingURL=backups.component.js.map
