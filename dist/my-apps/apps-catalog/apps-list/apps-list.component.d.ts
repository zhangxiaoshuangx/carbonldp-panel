import { EventEmitter } from "@angular/core";
import * as App from "../../app-content/app";
import "semantic-ui/semantic";
export declare class AppsListComponent {
    apps: App.Class[];
    openApp: EventEmitter<App.Class>;
    deleteApp: EventEmitter<App.Class>;
    headers: Header[];
    sortedColumn: string;
    ascending: boolean;
    constructor();
    sortColumn(header: Header): void;
    onOpenApp(appContext: App.Class): void;
    onDeleteApp(appContext: App.Class): void;
}
export interface Header {
    name: string;
    value: string;
}
