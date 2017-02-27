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
var forms_1 = require("@angular/forms");
var BackupFileValidator = BackupFileValidator_1 = (function () {
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
    return BackupFileValidator;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], BackupFileValidator.prototype, "backupFileBlob", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], BackupFileValidator.prototype, "control", void 0);
BackupFileValidator = BackupFileValidator_1 = __decorate([
    core_1.Directive({
        selector: "[cp-backup-file]",
        providers: [{ provide: forms_1.NG_VALIDATORS, useExisting: BackupFileValidator_1, multi: true }]
    })
], BackupFileValidator);
exports.BackupFileValidator = BackupFileValidator;
// Checks all controls. If at least one is valid, then no errors are found, if none are valid then "invalidForm" error is added.
var AtLeastOneValidValidator = AtLeastOneValidValidator_1 = (function () {
    function AtLeastOneValidValidator() {
    }
    AtLeastOneValidValidator.prototype.validate = function (formGroup) {
        for (var control in formGroup.controls) {
            if (!!formGroup.controls[control].valid)
                return null;
        }
        return { "invalidForm": true };
    };
    return AtLeastOneValidValidator;
}());
AtLeastOneValidValidator = AtLeastOneValidValidator_1 = __decorate([
    core_1.Directive({
        selector: "[cp-import-form-valid]",
        providers: [{ provide: forms_1.NG_VALIDATORS, useExisting: AtLeastOneValidValidator_1, multi: true }]
    })
], AtLeastOneValidValidator);
exports.AtLeastOneValidValidator = AtLeastOneValidValidator;
var BackupFileValidator_1, AtLeastOneValidValidator_1;

//# sourceMappingURL=backup-importer-validators.js.map
