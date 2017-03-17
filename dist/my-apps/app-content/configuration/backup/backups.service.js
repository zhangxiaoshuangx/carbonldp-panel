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
var Carbon_1 = require("carbonldp/Carbon");
var Pointer = require("carbonldp/Pointer");
var NS = require("carbonldp/NS");
var BackupsService = (function () {
    function BackupsService(carbon) {
        this.carbon = carbon;
        this.extendSchemasForBackups();
    }
    BackupsService.prototype.upload = function (file, appContext) {
        var _this = this;
        var uri = appContext.app.id + "backups/";
        return this.carbon.documents.upload(uri, file).then(function (_a) {
            var uploadedBackupPointer = _a[0], uploadResponse = _a[1];
            return _this.convertToNonRDFSource(uploadedBackupPointer).then(function (_a) {
                return [uploadedBackupPointer, uploadResponse];
            });
        });
    };
    BackupsService.prototype.getAll = function (appContext) {
        var uri = appContext.app.id + "backups/";
        return this.carbon.documents.getChildren(uri).then(function (_a) {
            var backups = _a[0], response = _a[1];
            return [backups, response];
        });
    };
    BackupsService.prototype.getDownloadURL = function (documentURI) {
        return this.carbon.documents.getDownloadURL(documentURI).then(function (documentDownloadURI) {
            return documentDownloadURI;
        });
    };
    BackupsService.prototype.delete = function (uri, appContext) {
        return appContext.documents.delete(uri);
    };
    BackupsService.prototype.convertToNonRDFSource = function (backupPointer) {
        return backupPointer.resolve().then(function (_a) {
            var backupDocument = _a[0], response = _a[1];
            backupDocument.defaultInteractionModel = Pointer.Factory.create(NS.LDP.Class.NonRDFSource);
            return backupDocument.save();
        });
    };
    BackupsService.prototype.extendSchemasForBackups = function () {
        this.carbon.extendObjectSchema({
            "xsd": "http://www.w3.org/2001/XMLSchema#",
            "fileIdentifier": {
                "@id": "https://carbonldp.com/ns/v1/platform#fileIdentifier",
                "@type": "xsd:string"
            },
        });
    };
    return BackupsService;
}());
BackupsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [Carbon_1.Carbon])
], BackupsService);
exports.BackupsService = BackupsService;
