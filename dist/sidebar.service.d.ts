import { EventEmitter } from "@angular/core";
export declare class SidebarService {
    private _items;
    private _toggleEmitter;
    private _toggledEmitter;
    private _isVisible;
    items: SidebarItem[];
    toggleEmitter: EventEmitter<any>;
    toggledEmitter: EventEmitter<any>;
    isVisible: boolean;
    constructor();
    addAppEmitter: EventEmitter<any>;
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
    children: (SidebarLink | SidebarSubmenu | SidebarDivider | SidebarGroup)[];
    open?: boolean;
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
    children: (SidebarLink | SidebarSubmenu | SidebarDivider | SidebarGroup)[];
}
export default SidebarService;
