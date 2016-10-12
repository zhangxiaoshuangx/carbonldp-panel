import { OnChanges, SimpleChanges } from "@angular/core";
import { AbstractControl, Validator } from "@angular/forms";
export declare class BackupFileValidator implements Validator, OnChanges {
    backupFileBlob: any;
    control: any;
    ngOnChanges(changes: SimpleChanges): void;
    validate(control: AbstractControl): any;
}
