import { EventEmitter } from "@angular/core";
export declare class SidebarService {
    private _items;
    readonly items: SidebarItem[];
    addAppEmitter: EventEmitter<any>;
    toggleEmitter: EventEmitter<any>;
    toggleMenuButtonEmitter: EventEmitter<any>;
    addItem(item: SidebarLink | SidebarSubmenu | SidebarDivider | SidebarGroup): void;
    addItems(items: (SidebarLink | SidebarSubmenu | SidebarDivider | SidebarGroup)[]): void;
    removeItem(item: SidebarLink | SidebarSubmenu | SidebarDivider | SidebarGroup): void;
    toggle(): void;
    private sortItems(items);
}
export interface SidebarItem {
    type: "link" | "submenu" | "divider" | "group";
    index?: number;
}
export interface SidebarLink extends SidebarItem {
    type: "link";
    route: any[];
    icon?: string;
}
export interface SidebarSubmenu extends SidebarItem {
    type: "submenu";
    name: string;
    children: SidebarItem[];
    closeable?: boolean;
    onClose?: EventEmitter<any>;
    icon?: string;
}
export interface SidebarDivider extends SidebarItem {
    type: "divider";
    name: string;
    icon?: string;
}
export interface SidebarGroup extends SidebarItem {
    type: "group";
    children: SidebarItem;
}
export default SidebarService;
