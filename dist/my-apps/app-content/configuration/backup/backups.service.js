System.register(["@angular/core", "carbonldp/Carbon"], function(exports_1, context_1) {
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
    var core_1, Carbon_1;
    var BackupsService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Carbon_1_1) {
                Carbon_1 = Carbon_1_1;
            }],
        execute: function() {
            BackupsService = (function () {
                function BackupsService(carbon) {
                    this.carbon = carbon;
                    this.extendSchemasForBackups();
                }
                BackupsService.prototype.upload = function (file, appContext) {
                    var uri = appContext.app.id + "backups/";
                    return this.carbon.documents.upload(uri, file);
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
                BackupsService.prototype.extendSchemasForBackups = function () {
                    this.carbon.extendObjectSchema({
                        "xsd": "http://www.w3.org/2001/XMLSchema#",
                        "fileIdentifier": {
                            "@id": "https://carbonldp.com/ns/v1/platform#fileIdentifier",
                            "@type": "xsd:string"
                        },
                    });
                };
                BackupsService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [Carbon_1.default])
                ], BackupsService);
                return BackupsService;
            }());
            exports_1("BackupsService", BackupsService);
            exports_1("default",BackupsService);
        }
    }
});

//# sourceMappingURL=backups.service.js.map
