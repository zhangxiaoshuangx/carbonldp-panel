import { EventEmitter } from "@angular/core";
import * as App from "../../app-content/app";
import "semantic-ui/semantic";
export declare class AppActionButtonsComponent {
    app: App.Class;
    deleteApp: EventEmitter<App.Class>;
    constructor();
    onDeleteApp(event: Event): void;
    avoidRowClick(event: Event): void;
}
