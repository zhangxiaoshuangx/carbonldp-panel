import { EventEmitter, OnChanges, SimpleChange } from "@angular/core";
export declare class PaginatorComponent implements OnChanges {
    private pages;
    private _activePage;
    activePage: number;
    elementsPerPage: number;
    totalElements: number;
    onPageChange: EventEmitter<number>;
    constructor();
    ngOnChanges(changes: {
        [propName: string]: SimpleChange;
    }): void;
    private pageClick(index);
    private previous();
    private next();
    private updatePages();
    private getPages();
}
export default PaginatorComponent;