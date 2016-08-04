System.register(["@angular/core", "carbonldp/App", "carbonldp/PersistedDocument", "carbonldp/HTTP", "../backups.service", "./../../../../../errors-area/error-message.component", "jquery", "semantic-ui/semantic", "./backups-list.component.html!", "./backups-list.component.css!text"], function(exports_1, context_1) {
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
    var core_1, App, PersistedDocument, HTTP_1, backups_service_1, error_message_component_1, jquery_1, backups_list_component_html_1, backups_list_component_css_text_1;
    var BackupsListComponent;
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
            function (HTTP_1_1) {
                HTTP_1 = HTTP_1_1;
            },
            function (backups_service_1_1) {
                backups_service_1 = backups_service_1_1;
            },
            function (error_message_component_1_1) {
                error_message_component_1 = error_message_component_1_1;
            },
            function (jquery_1_1) {
                jquery_1 = jquery_1_1;
            },
            function (_1) {},
            function (backups_list_component_html_1_1) {
                backups_list_component_html_1 = backups_list_component_html_1_1;
            },
            function (backups_list_component_css_text_1_1) {
                backups_list_component_css_text_1 = backups_list_component_css_text_1_1;
            }],
        execute: function() {
            BackupsListComponent = (function () {
                function BackupsListComponent(element, backupsService) {
                    var _this = this;
                    this.loadingBackups = false;
                    this.deletingBackup = false;
                    this.errorMessages = [];
                    this.refreshPeriod = 15000;
                    this.deleteMessages = [];
                    this.fetchBackupsList = new core_1.EventEmitter();
                    this.element = element;
                    this.backupsService = backupsService;
                    this.fetchBackupsList.subscribe(function (doFetch) {
                        if (!doFetch)
                            return;
                        _this.getBackups().then(function (backups) {
                            clearInterval(_this.fetchBackupsListInterval);
                            _this.monitorBackups();
                        });
                    });
                }
                BackupsListComponent.prototype.ngAfterViewInit = function () {
                    this.$element = jquery_1.default(this.element.nativeElement);
                    this.$deleteBackupConfirmationModal = this.$element.find(".delete.backup.modal");
                    this.initializeModals();
                };
                BackupsListComponent.prototype.ngOnChanges = function (changes) {
                    var _this = this;
                    if (changes["backupJob"] && !!changes["backupJob"].currentValue && changes["backupJob"].currentValue !== changes["backupJob"].previousValue) {
                        this.loadingBackups = true;
                        this.getBackups().then(function (backups) {
                            _this.loadingBackups = false;
                        }).catch(function () { return _this.loadingBackups = false; });
                        this.monitorBackups();
                    }
                };
                BackupsListComponent.prototype.ngOnDestroy = function () {
                    clearInterval(this.fetchBackupsListInterval);
                };
                BackupsListComponent.prototype.initializeModals = function () {
                    this.$deleteBackupConfirmationModal.modal({
                        closable: false,
                        blurring: true,
                        onApprove: function () { return false; }
                    });
                };
                BackupsListComponent.prototype.monitorBackups = function () {
                    var _this = this;
                    this.fetchBackupsListInterval = setInterval(function () { return _this.getBackups(); }, this.refreshPeriod);
                };
                BackupsListComponent.prototype.getBackups = function () {
                    var _this = this;
                    this.errorMessages = [];
                    return this.backupsService.getAll(this.appContext).then(function (_a) {
                        var backups = _a[0], response = _a[1];
                        backups = backups.sort(function (a, b) { return b.modified < a.modified ? -1 : b.modified > a.modified ? 1 : 0; });
                        _this.backups = backups;
                        return backups;
                    }).catch(function (error) {
                        var errorMessage = {
                            title: error.name,
                            content: "Couldn't fetch backups. I'll try again in " + (_this.refreshPeriod / 1000) + " seconds.",
                            endpoint: error.response.request.responseURL,
                            statusCode: "" + error.response.request.status,
                            statusMessage: error.response.request.statusText
                        };
                        _this.errorMessages.push(errorMessage);
                        return error;
                    });
                };
                BackupsListComponent.prototype.downloadBackup = function (uri, downLoadButton) {
                    var _this = this;
                    downLoadButton.classList.add("loading");
                    this.failedDownloadMessage = null;
                    this.backupsService.getDownloadURL(uri).then(function (getDownloadURL) {
                        window.open(getDownloadURL);
                    }).catch(function (error) {
                        var deleteMessage;
                        deleteMessage = {
                            title: error.name,
                            content: "Couldn't generate download link.",
                            endpoint: error.response.request.responseURL,
                            statusCode: "" + error.response.request.status,
                            statusMessage: error.response.request.statusText
                        };
                        _this.failedDownloadMessage = deleteMessage;
                    }).then(function () { downLoadButton.classList.remove("loading"); });
                };
                BackupsListComponent.prototype.closeFailedDownloadMessage = function () {
                    this.failedDownloadMessage = null;
                };
                BackupsListComponent.prototype.askToDeleteBackup = function (askingBackupToRemove) {
                    this.askingBackupToRemove = askingBackupToRemove;
                    this.$deleteBackupConfirmationModal.modal("show");
                };
                BackupsListComponent.prototype.deleteBackup = function (backup) {
                    var _this = this;
                    this.deletingBackup = true;
                    return this.backupsService.delete(backup.id, this.appContext).then(function (response) {
                        if (response.status !== HTTP_1.StatusCode.OK)
                            return Promise.reject(response);
                        _this.getBackups();
                        _this.closeDeleteModal();
                        return response;
                    }).catch(function (errorOrResponse) {
                        var deleteMessage;
                        if (errorOrResponse.hasOwnProperty("response")) {
                            deleteMessage = {
                                title: errorOrResponse.name,
                                content: "Couldn't delete the backup.",
                                endpoint: errorOrResponse.response.request.responseURL,
                                statusCode: "" + errorOrResponse.response.request.status,
                                statusMessage: errorOrResponse.response.request.statusText
                            };
                        }
                        else {
                            deleteMessage = {
                                title: errorOrResponse.request.statusText,
                                content: "Couldn't delete the backup.",
                                endpoint: errorOrResponse.request.responseURL,
                                statusCode: "" + errorOrResponse.status,
                                statusMessage: errorOrResponse.request.statusText
                            };
                        }
                        _this.deleteMessages.push(deleteMessage);
                    }).then(function (response) {
                        _this.deletingBackup = false;
                        return response;
                    });
                };
                BackupsListComponent.prototype.removeDeleteErrorMessage = function (index) {
                    this.deleteMessages.slice(index);
                };
                BackupsListComponent.prototype.closeDeleteModal = function () {
                    this.$deleteBackupConfirmationModal.modal("hide");
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], BackupsListComponent.prototype, "backupJob", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], BackupsListComponent.prototype, "appContext", void 0);
                BackupsListComponent = __decorate([
                    core_1.Component({
                        selector: "cp-backups-list",
                        template: backups_list_component_html_1.default,
                        styles: [backups_list_component_css_text_1.default],
                        directives: [error_message_component_1.ErrorMessageComponent],
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, backups_service_1.BackupsService])
                ], BackupsListComponent);
                return BackupsListComponent;
            }());
            exports_1("BackupsListComponent", BackupsListComponent);
            exports_1("default",BackupsListComponent);
        }
    }
});

//# sourceMappingURL=backups-list.component.js.map
