System.register(["@angular/core", "carbonldp/App", "../backups.service", "../../job/jobs.service", "../../job/job", "carbonldp-panel/messages-area/message.component", "semantic-ui/semantic", "./backup-importer.component.html!", "./backup-importer.component.css!text"], function(exports_1, context_1) {
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
    var core_1, App, backups_service_1, jobs_service_1, Job, message_component_1, backup_importer_component_html_1, backup_importer_component_css_text_1;
    var BackupImporterComponent, ImportStatus;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (App_1) {
                App = App_1;
            },
            function (backups_service_1_1) {
                backups_service_1 = backups_service_1_1;
            },
            function (jobs_service_1_1) {
                jobs_service_1 = jobs_service_1_1;
            },
            function (Job_1) {
                Job = Job_1;
            },
            function (message_component_1_1) {
                message_component_1 = message_component_1_1;
            },
            function (_1) {},
            function (backup_importer_component_html_1_1) {
                backup_importer_component_html_1 = backup_importer_component_html_1_1;
            },
            function (backup_importer_component_css_text_1_1) {
                backup_importer_component_css_text_1 = backup_importer_component_css_text_1_1;
            }],
        execute: function() {
            BackupImporterComponent = (function () {
                function BackupImporterComponent(element, backupsService, jobsService) {
                    this.importFormModel = {
                        uri: "",
                        backup: "",
                        backupFile: "",
                    };
                    this.backupFileArray = [];
                    this.backups = [];
                    this.running = new ImportStatus();
                    this.uploading = new ImportStatus();
                    this.creating = new ImportStatus();
                    this.executing = new ImportStatus();
                    this.errorMessages = [];
                    this.element = element;
                    this.backupsService = backupsService;
                    this.jobsService = jobsService;
                }
                BackupImporterComponent.prototype.ngOnInit = function () {
                    this.getBackups();
                };
                BackupImporterComponent.prototype.getBackups = function () {
                    var _this = this;
                    this.backupsService.getAll(this.appContext).then(function (_a) {
                        var backups = _a[0], response = _a[1];
                        _this.backups = backups.sort(function (a, b) { return b.modified < a.modified ? -1 : b.modified > a.modified ? 1 : 0; });
                    });
                };
                BackupImporterComponent.prototype.onImportBackup = function (form) {
                    var uri = form.form.controls.uri;
                    var backup = form.form.controls.backup;
                    var backupFile = form.form.controls.backupFile;
                    this.running.start();
                    if (uri.valid)
                        this.createBackupImport(uri.value);
                    if (backup.valid)
                        this.createBackupImport(backup.value);
                    if (backupFile.valid)
                        this.uploadBackup(this.backupFileBlob);
                };
                BackupImporterComponent.prototype.executeImport = function (importJob) {
                    return this.jobsService.runJob(importJob);
                };
                BackupImporterComponent.prototype.monitorExecution = function (importJobExecution) {
                    var _this = this;
                    return new Promise(function (resolve, reject) {
                        // Node typings are overriding setInterval, that's why we need to cast it to any before assigning it to a number variable
                        _this.monitorExecutionInterval = setInterval(function () {
                            _this.checkImportJobExecution(importJobExecution).then(function () {
                                if (_this.executing.done) {
                                    clearInterval(_this.monitorExecutionInterval);
                                    resolve(importJobExecution);
                                }
                            });
                        }, 3000);
                    });
                };
                BackupImporterComponent.prototype.ngOnDestroy = function () {
                    if (typeof this.monitorExecutionInterval !== "undefined")
                        clearInterval(this.monitorExecutionInterval);
                };
                BackupImporterComponent.prototype.checkImportJobExecution = function (importJobExecution) {
                    var _this = this;
                    return this.jobsService.checkJobExecution(importJobExecution).then(function (execution) {
                        if (!execution[Job.Execution.STATUS])
                            return Promise.reject(execution);
                        if (execution[Job.Execution.STATUS].id === Job.ExecutionStatus.FINISHED)
                            _this.executing.success();
                        if (execution[Job.Execution.STATUS].id === Job.ExecutionStatus.ERROR) {
                            _this.executing.fail();
                            var errorMessage = {
                                title: "Error while executing import",
                                type: message_component_1.Types.ERROR,
                                content: "An error occurred while executing your import backup job. Please, fix your job configuration.",
                                statusMessage: execution[Job.Execution.ERROR_DESCRIPTION]
                            };
                            _this.errorMessages.push(errorMessage);
                        }
                    }).catch(function (error) {
                        console.error(error);
                        _this.executing.fail();
                        var errorMessage;
                        if (error.response)
                            errorMessage = _this.getHTTPErrorMessage(error, "Couldn't monitor the import execution.");
                        else {
                            errorMessage = {
                                title: error.name,
                                type: message_component_1.Types.ERROR,
                                content: JSON.stringify(error)
                            };
                        }
                        _this.errorMessages.push(errorMessage);
                    });
                };
                BackupImporterComponent.prototype.onFileChange = function (event) {
                    var files = event.srcElement.files;
                    this.backupFileBlob = files[0];
                };
                BackupImporterComponent.prototype.onInputLostFocus = function (control) {
                    switch (control.name) {
                        case "uri":
                            if (control.valid) {
                                this.element.nativeElement.querySelector("[ ng-reflect-name ='backup']").setAttribute("disabled", true);
                                this.element.nativeElement.querySelector("[ ng-reflect-name ='backupFile']").setAttribute("disabled", true);
                            }
                            else {
                                this.enableAllInputs();
                            }
                            break;
                        case "backup":
                            if (control.valid) {
                                this.element.nativeElement.querySelector("[ ng-reflect-name ='uri']").setAttribute("disabled", true);
                                this.element.nativeElement.querySelector("[ ng-reflect-name ='backupFile']").setAttribute("disabled", true);
                            }
                            else {
                                this.enableAllInputs();
                            }
                            break;
                        case "backupFile":
                            if (!!this.backupFileBlob) {
                                this.element.nativeElement.querySelector("[ ng-reflect-name ='uri']").setAttribute("disabled", true);
                                this.element.nativeElement.querySelector("[ ng-reflect-name='backup']").setAttribute("disabled", true);
                            }
                            else {
                                this.enableAllInputs();
                            }
                            break;
                    }
                };
                BackupImporterComponent.prototype.enableAllInputs = function () {
                    this.element.nativeElement.querySelector("[ng-reflect-name='uri']").removeAttribute("disabled", true);
                    this.element.nativeElement.querySelector("[ng-reflect-name='backupFile']").removeAttribute("disabled", true);
                };
                BackupImporterComponent.prototype.canDisplayImportButtonLoading = function () {
                    return this.uploading.active ? true : this.creating.active ? true : this.executing.active ? true : false;
                };
                BackupImporterComponent.prototype.uploadBackup = function (file) {
                    var _this = this;
                    this.uploading.start();
                    this.backupsService.upload(file, this.appContext).then(function (_a) {
                        var pointer = _a[0], response = _a[1];
                        _this.uploading.success();
                        _this.createBackupImport(pointer.id);
                    }).catch(function (error) {
                        console.error(error);
                        _this.uploading.fail();
                        var errorMessage;
                        if (error.response)
                            errorMessage = _this.getHTTPErrorMessage(error, "Couldn't upload the file.");
                        else {
                            errorMessage = {
                                title: error.name,
                                type: message_component_1.Types.ERROR,
                                content: JSON.stringify(error)
                            };
                        }
                        _this.errorMessages.push(errorMessage);
                    });
                };
                BackupImporterComponent.prototype.createBackupImport = function (backupURI) {
                    var _this = this;
                    this.creating.start();
                    return this.jobsService.createImportBackup(backupURI, this.appContext).then(function (importJob) {
                        _this.creating.success();
                        _this.executing.start();
                        return _this.executeImport(importJob).then(function (importJobExecution) { _this.monitorExecution(importJobExecution); }).catch(function (error) {
                            console.error(error);
                            _this.executing.fail();
                            var errorMessage;
                            if (error.response)
                                errorMessage = _this.getHTTPErrorMessage(error, "Couldn't monitor the import execution.");
                            else {
                                errorMessage = {
                                    title: error.name,
                                    type: message_component_1.Types.ERROR,
                                    content: JSON.stringify(error)
                                };
                            }
                            _this.errorMessages.push(errorMessage);
                        });
                    }).catch(function (error) {
                        console.error(error);
                        _this.creating.fail();
                        var errorMessage;
                        if (!!error.response)
                            errorMessage = _this.getHTTPErrorMessage(error, "The importing job couldn't be created.");
                        else {
                            errorMessage = {
                                title: error.name,
                                type: message_component_1.Types.ERROR,
                                content: JSON.stringify(error)
                            };
                        }
                        _this.errorMessages.push(errorMessage);
                    });
                };
                BackupImporterComponent.prototype.getHTTPErrorMessage = function (error, content) {
                    return {
                        title: error.name,
                        content: content + " Reason: " + error.message,
                        endpoint: error.response.request.responseURL,
                        statusCode: "" + error.response.request.status + " - RequestID: " + error.requestID,
                        statusMessage: error.response.request.statusText
                    };
                };
                BackupImporterComponent.prototype.finishImport = function () {
                    this.uploading = new ImportStatus();
                    this.creating = new ImportStatus();
                    this.executing = new ImportStatus();
                    this.running = new ImportStatus();
                    this.getBackups();
                    this.errorMessages = [];
                };
                BackupImporterComponent.prototype.checkForFailedTasks = function () {
                    return this.uploading.failed ? true : this.creating.failed ? true : this.executing.failed ? true : false;
                };
                BackupImporterComponent.prototype.removeMessage = function (index) {
                    this.errorMessages.splice(index, 1);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', App.Context)
                ], BackupImporterComponent.prototype, "appContext", void 0);
                BackupImporterComponent = __decorate([
                    core_1.Component({
                        selector: "cp-backup-importer",
                        template: backup_importer_component_html_1.default,
                        styles: [backup_importer_component_css_text_1.default],
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, backups_service_1.BackupsService, jobs_service_1.JobsService])
                ], BackupImporterComponent);
                return BackupImporterComponent;
            }());
            exports_1("BackupImporterComponent", BackupImporterComponent);
            ImportStatus = (function () {
                function ImportStatus() {
                }
                Object.defineProperty(ImportStatus.prototype, "active", {
                    get: function () { return this._active; },
                    set: function (value) {
                        this._active = value;
                        this._done = !value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ImportStatus.prototype, "done", {
                    get: function () { return this._done; },
                    set: function (value) {
                        this._done = value;
                        this._active = !value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ImportStatus.prototype, "failed", {
                    get: function () { return this._failed; },
                    set: function (value) {
                        this.done = true;
                        this._failed = value;
                        this._succeed = !value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ImportStatus.prototype, "succeed", {
                    get: function () { return this._succeed; },
                    set: function (value) {
                        this.done = true;
                        this._failed = !value;
                        this._succeed = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                ImportStatus.prototype.start = function () {
                    this.active = true;
                };
                ImportStatus.prototype.finish = function () {
                    this.done = true;
                };
                ImportStatus.prototype.fail = function () {
                    this.failed = true;
                };
                ImportStatus.prototype.success = function () {
                    this.succeed = true;
                };
                return ImportStatus;
            }());
            exports_1("ImportStatus", ImportStatus);
            exports_1("default",BackupImporterComponent);
        }
    }
});

//# sourceMappingURL=backup-importer.component.js.map
