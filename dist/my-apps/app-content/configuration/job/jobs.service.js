System.register(["@angular/core", "carbonldp/Carbon", "carbonldp/Utils", "./job"], function(exports_1, context_1) {
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
    var core_1, Carbon_1, Utils, Job;
    var JobsService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Carbon_1_1) {
                Carbon_1 = Carbon_1_1;
            },
            function (Utils_1) {
                Utils = Utils_1;
            },
            function (Job_1) {
                Job = Job_1;
            }],
        execute: function() {
            JobsService = (function () {
                function JobsService(carbon) {
                    this.carbon = carbon;
                    this.jobs = new Map();
                }
                JobsService.prototype.getJobOfType = function (type, appContext) {
                    var _this = this;
                    if (!type)
                        return Promise.reject(new Error("Provide a job type."));
                    if (!appContext)
                        return Promise.reject(new Error("Provide an appContext."));
                    var jobsArray = Utils.A.from(this.jobs.values());
                    var job = jobsArray.find(function (job) { return job.types.indexOf(type) !== -1; });
                    if (!!job)
                        return Promise.resolve(job);
                    return this.getAll(appContext).then(function (jobs) {
                        var jobsArray = Utils.A.from(_this.jobs.values());
                        return jobsArray.find(function (job) { return job.types.indexOf(type) !== -1; });
                    });
                };
                JobsService.prototype.getAll = function (appContext) {
                    var _this = this;
                    var uri = appContext.app.id + "jobs/";
                    return this.carbon.documents.getChildren(uri).then(function (_a) {
                        var jobs = _a[0], response = _a[1];
                        jobs.filter(function (job) { return !_this.jobs.has(job.id); })
                            .forEach(function (job) { return _this.jobs.set(job.id, job); });
                        return Utils.A.from(_this.jobs.values());
                    });
                };
                JobsService.prototype.createExportBackup = function (appContext) {
                    var _this = this;
                    return new Promise(function (resolve, reject) {
                        var uri = appContext.app.id + "jobs/";
                        var tempJob = {};
                        tempJob["types"] = [Job.Type.EXPORT_BACKUP];
                        appContext.documents.createChild(uri, tempJob).then(function (_a) {
                            var pointer = _a[0], response = _a[1];
                            pointer.resolve().then(function (_a) {
                                var importJob = _a[0], response = _a[1];
                                resolve(importJob);
                                _this.addJob(importJob);
                            });
                        }).catch(function (error) { return reject(error); });
                    });
                };
                JobsService.prototype.createImportBackup = function (backupURI, appContext) {
                    var _this = this;
                    var uri = appContext.app.id + "jobs/";
                    var tempJob = {};
                    tempJob["types"] = [Job.Type.IMPORT_BACKUP];
                    tempJob[Job.namespace + "backup"] = appContext.documents.getPointer(backupURI);
                    return this.carbon.documents.createChild(uri, tempJob).then(function (_a) {
                        var pointer = _a[0], response = _a[1];
                        return pointer.resolve();
                    }).then(function (_a) {
                        var importJob = _a[0], response = _a[1];
                        _this.addJob(importJob);
                        return importJob;
                    });
                };
                JobsService.prototype.runJob = function (job) {
                    var tempJob = {};
                    tempJob["types"] = [Job.namespace + "Execution"];
                    return this.carbon.documents.createChild(job.id, tempJob).then(function (_a) {
                        var pointer = _a[0], response = _a[1];
                        return pointer.resolve();
                    }).then(function (_a) {
                        var importJob = _a[0], response = _a[1];
                        return importJob;
                    });
                };
                JobsService.prototype.checkJobExecution = function (jobExecution) {
                    if (jobExecution.isResolved()) {
                        return jobExecution.refresh().then(function (_a) {
                            var resolvedJobExecution = _a[0], response = _a[1];
                            return resolvedJobExecution;
                        }).catch(function (error) { return Promise.reject(error); });
                    }
                    else {
                        return this.carbon.documents.get(jobExecution.id).then(function (_a) {
                            var resolvedJobExecution = _a[0], response = _a[1];
                            return resolvedJobExecution;
                        }).catch(function (error) { return Promise.reject(error); });
                    }
                };
                JobsService.prototype.addJob = function (job) {
                    this.jobs.set(job.id, job);
                };
                JobsService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [Carbon_1.default])
                ], JobsService);
                return JobsService;
            }());
            exports_1("JobsService", JobsService);
            exports_1("default",JobsService);
        }
    }
});

//# sourceMappingURL=jobs.service.js.map
