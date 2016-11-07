import { OnChanges, SimpleChanges } from "@angular/core";
import { AbstractControl, Validator } from "@angular/forms";
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
export declare class FragmentValidator implements Validator {
    validate(control: AbstractControl): {
        [key: string]: any;
    };
}
export declare class URIFragmentValidator implements Validator {
    validate(control: AbstractControl): {
        [key: string]: any;
    };
}
