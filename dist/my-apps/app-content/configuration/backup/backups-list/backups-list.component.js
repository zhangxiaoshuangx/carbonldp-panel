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
var PersistedDocument = require("carbonldp/PersistedDocument");
var HTTP_1 = require("carbonldp/HTTP");
var backups_service_1 = require("../backups.service");
var $ = require("jquery");
require("semantic-ui/semantic");
var BackupsListComponent = (function () {
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
        this.$element = $(this.element.nativeElement);
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
        // Node typings are overriding setInterval, that's why we need to cast it to any before assigning it to a number variable
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
    BackupsListComponent.prototype.refreshList = function () {
        var _this = this;
        this.loadingBackups = true;
        this.getBackups().then(function (backups) {
            _this.loadingBackups = false;
        }).catch(function () { return _this.loadingBackups = false; });
        clearInterval(this.fetchBackupsListInterval);
        this.monitorBackups();
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
        __metadata('design:type', App.Context)
    ], BackupsListComponent.prototype, "appContext", void 0);
    BackupsListComponent = __decorate([
        core_1.Component({
            selector: "cp-backups-list",
            templateUrl: "./backups-list.component.html",
            styleUrls: ["./backups-list.component.scss"],
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, backups_service_1.BackupsService])
    ], BackupsListComponent);
    return BackupsListComponent;
}());
exports.BackupsListComponent = BackupsListComponent;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BackupsListComponent;

//# sourceMappingURL=backups-list.component.js.map
