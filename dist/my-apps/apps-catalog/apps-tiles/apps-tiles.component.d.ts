import { EventEmitter } from "@angular/core";
import * as App from "../../app-content/app";
import "semantic-ui/semantic";
export declare class AppsTilesComponent {
    apps: App.Class[];
    deleteApp: EventEmitter<App.Class>;
    constructor();
    onDeleteApp(app: App.Class): void;
}
export default AppsTilesComponent;
