import { EventEmitter } from "@angular/core";
export declare class HeaderService {
    logo: HeaderLogo;
    private _items;
    constructor();
    items: HeaderItem[];
    addItems(items: HeaderItem[]): void;
    addItem(item: HeaderItem): void;
    private sortItems(items);
}
export interface HeaderItem {
    name: string;
    icon?: string;
    route?: any[];
    onClick?: EventEmitter<any>;
    index?: number;
    children?: HeaderItem[];
}
export interface HeaderLogo {
    image: string;
    route: any[];
}
export default HeaderService;
