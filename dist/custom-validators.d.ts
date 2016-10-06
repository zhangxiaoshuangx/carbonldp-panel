import { OnChanges, SimpleChanges } from "@angular/core";
import { AbstractControl, Validator, FormGroup } from "@angular/forms";
export declare class EmailValidator implements Validator {
    validate(control: AbstractControl): {
        [key: string]: any;
    };
}
export declare class SlugValidator implements Validator {
    validate(control: AbstractControl): {
        [key: string]: any;
    };
}
export declare class MatchValidator implements Validator, OnChanges {
    matchTo: any;
    control: any;
    ngOnChanges(changes: SimpleChanges): void;
    validate(control: AbstractControl): {
        [key: string]: any;
    };
}
export declare class DomainValidator implements Validator {
    validate(control: AbstractControl): {
        [key: string]: any;
    };
}
export declare class URIValidator implements Validator {
    validate(control: AbstractControl): {
        [key: string]: any;
    };
}
export declare class BackupFileValidator implements Validator, OnChanges {
    backupFileBlob: any;
    control: any;
    ngOnChanges(changes: SimpleChanges): void;
    validate(control: AbstractControl): any;
}
export declare class OneControlValidValidator implements Validator {
    validate(formGroup: FormGroup): {
        [key: string]: any;
    };
}
export declare class NameExplorerValidator implements Validator, OnChanges {
    existingProperties: any;
    property: any;
    id: any;
    name: any;
    control: any;
    ngOnChanges(changes: SimpleChanges): void;
    validate(control: AbstractControl): {
        [key: string]: any;
    };
}
export declare class IdValidator implements Validator, OnChanges {
    existingFragments: any;
    property: any;
    documentURI: any;
    id: any;
    control: any;
    ngOnChanges(changes: SimpleChanges): void;
    validate(control: AbstractControl): {
        [key: string]: any;
    };
}
export declare class ValueValidator implements Validator, OnChanges {
    type: any;
    control: any;
    ngOnChanges(changes: SimpleChanges): void;
    validate(control: AbstractControl): {
        [key: string]: any;
    };
}
export declare class IdPointerValidator implements Validator {
    documentURI: any;
    validate(control: AbstractControl): {
        [key: string]: any;
    };
}
