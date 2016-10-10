System.register(["@angular/core", "@angular/forms"], function(exports_1, context_1) {
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
    var core_1, forms_1;
    var BackupFileValidator, AtLeastOneValidValidator;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            }],
        execute: function() {
            BackupFileValidator = (function () {
                function BackupFileValidator() {
                }
                BackupFileValidator.prototype.ngOnChanges = function (changes) {
                    this.backupFileBlob = changes["backupFileBlob"].currentValue;
                    this.control.control.updateValueAndValidity(false, true);
                };
                BackupFileValidator.prototype.validate = function (control) {
                    if (!!this.backupFileBlob && this.backupFileBlob.type === "application/zip")
                        return null;
                    if (!this.backupFileBlob)
                        return { "emptyBackupFile": true };
                    return { "invalidBackupFileFormat": true };
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], BackupFileValidator.prototype, "backupFileBlob", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], BackupFileValidator.prototype, "control", void 0);
                BackupFileValidator = __decorate([
                    core_1.Directive({
                        selector: "[backup-file]",
                        providers: [{ provide: forms_1.NG_VALIDATORS, useExisting: BackupFileValidator, multi: true }]
                    }), 
                    __metadata('design:paramtypes', [])
                ], BackupFileValidator);
                return BackupFileValidator;
            }());
            exports_1("BackupFileValidator", BackupFileValidator);
            //check all controls if at least one is valid, then no errors are found, if none are valid then "invalidForm" error is added.
            AtLeastOneValidValidator = (function () {
                function AtLeastOneValidValidator() {
                }
                AtLeastOneValidValidator.prototype.validate = function (formGroup) {
                    for (var control in formGroup.controls) {
                        if (!!formGroup.controls[control].valid)
                            return null;
                    }
                    return { "invalidForm": true };
                };
                AtLeastOneValidValidator = __decorate([
                    core_1.Directive({
                        selector: "[at-least-one-valid]",
                        providers: [{ provide: forms_1.NG_VALIDATORS, useExisting: AtLeastOneValidValidator, multi: true }]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AtLeastOneValidValidator);
                return AtLeastOneValidValidator;
            }());
            exports_1("AtLeastOneValidValidator", AtLeastOneValidValidator);
        }
    }
});

//# sourceMappingURL=backup-importer-validators.js.map
