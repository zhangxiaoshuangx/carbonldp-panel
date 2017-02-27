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
var Carbon_1 = require("carbonldp/Carbon");
var Utils = require("carbonldp/Utils");
var Job = require("./job");
var JobsService = (function () {
    function JobsService(carbon) {
        this.carbon = carbon;
        this.appContextsJobs = new Map();
    }
    JobsService.prototype.getJobOfType = function (type, appContext) {
        if (!type)
            return Promise.reject(new Error("Provide a job type."));
        if (!appContext)
            return Promise.reject(new Error("Provide an appContext."));
        if (!this.appContextsJobs.has(appContext.getBaseURI()))
            this.appContextsJobs.set(appContext.getBaseURI(), new Map());
        var jobs = this.appContextsJobs.get(appContext.getBaseURI());
        var jobsArray = Utils.A.from(jobs.values());
        var job = jobsArray.find(function (job) { return job.types.indexOf(type) !== -1; });
        if (!!job)
            return Promise.resolve(job);
        return this.getAll(appContext).then(function (jobs) {
            var jobsArray = Utils.A.from(jobs.values());
            return jobsArray.find(function (job) { return job.types.indexOf(type) !== -1; });
        });
    };
    JobsService.prototype.getAll = function (appContext) {
        var uri = appContext.app.id + "jobs/";
        var jobs = this.appContextsJobs.get(appContext.getBaseURI());
        return this.carbon.documents.getChildren(uri).then(function (_a) {
            var existingJobs = _a[0], response = _a[1];
            existingJobs.filter(function (job) { return !jobs.has(job.id); })
                .forEach(function (job) { return jobs.set(job.id, job); });
            return Utils.A.from(jobs.values());
        });
    };
    JobsService.prototype.createExportBackup = function (appContext) {
        var _this = this;
        var jobs = this.appContextsJobs.get(appContext.getBaseURI());
        return new Promise(function (resolve, reject) {
            var uri = appContext.app.id + "jobs/";
            var tempJob = {};
            tempJob["types"] = [Job.Type.EXPORT_BACKUP];
            _this.carbon.documents.createChild(uri, tempJob).then(function (_a) {
                var pointer = _a[0], response = _a[1];
                pointer.resolve().then(function (_a) {
                    var importJob = _a[0], response = _a[1];
                    resolve(importJob);
                    jobs.set(importJob.id, importJob);
                });
            }).catch(function (error) { return reject(error); });
        });
    };
    JobsService.prototype.createImportBackup = function (backupURI, appContext) {
        var uri = appContext.app.id + "jobs/", tempJob = {}, backup = appContext.documents.getPointer(backupURI);
        tempJob["types"] = [Job.Type.IMPORT_BACKUP];
        tempJob[Job.namespace + "backup"] = appContext.documents.getPointer(backupURI);
        var jobs = this.appContextsJobs.get(appContext.getBaseURI());
        return this.carbon.documents.createChild(uri, tempJob).then(function (_a) {
            var pointer = _a[0], response = _a[1];
            return pointer.resolve();
        }).then(function (_a) {
            var importJob = _a[0], response = _a[1];
            jobs.set(importJob.id, importJob);
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
    return JobsService;
}());
JobsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [Carbon_1.default])
], JobsService);
exports.JobsService = JobsService;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = JobsService;

//# sourceMappingURL=jobs.service.js.map
