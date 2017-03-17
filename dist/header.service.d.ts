import { EventEmitter } from "@angular/core";
export declare class HeaderService {
    logo: HeaderLogo;
    private _items;
    constructor();
    readonly items: HeaderItem[];
    addItems(items: HeaderItem[]): void;
    addItem(item: HeaderItem): void;
    private sortItems(items);
    clear(): void;
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
