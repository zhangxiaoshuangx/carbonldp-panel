export declare class PaginatorComponent {
    activePage: number;
    totalPages: number;
    pageSize: number;
    constructor();
    ngAfterViewInit(): void;
}
export interface Page {
    id: number;
}
export default PaginatorComponent;
