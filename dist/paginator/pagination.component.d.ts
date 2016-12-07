import { EventEmitter } from "@angular/core";
export declare class PaginationComponent {
    private pages;
    private _activePage;
    activePage: number;
    elementsPerPage: number;
    private _totalElements;
    totalElements: number;
    onPageChange: EventEmitter<number>;
    constructor();
    private pageClick(index);
    private previous();
    private next();
}
export interface Page {
    id: number;
}
export default PaginationComponent;
