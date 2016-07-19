import { EventEmitter, OnChanges } from "@angular/core";
import "semantic-ui/semantic";
export declare class ResultsetTableComponent implements OnChanges {
    query: any;
    resultset: any;
    prefixes: {
        [prefix: string]: string;
    };
    resultsetChange: EventEmitter<any>;
    sortedColumn: string;
    ascending: boolean;
    bindings: any;
    constructor();
    ngOnChanges(changeRecord: any): void;
    sortColumn(columnName: string): void;
    private mapBindings(resultset);
}
export default ResultsetTableComponent;
