import { OnChanges, SimpleChanges } from "@angular/core";
import { AbstractControl, Validator, FormGroup } from "@angular/forms";
export declare class BackupFileValidator implements Validator, OnChanges {
    backupFileBlob: any;
    control: any;
    ngOnChanges(changes: SimpleChanges): void;
    validate(control: AbstractControl): any;
}
export declare class AtLeastOneValidValidator implements Validator {
    validate(formGroup: FormGroup): {
        [key: string]: any;
    };
}
