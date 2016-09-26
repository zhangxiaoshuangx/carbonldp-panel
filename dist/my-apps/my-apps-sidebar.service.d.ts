import { SidebarService } from "./../sidebar.service";
import * as App from "./app-content/app";
export declare class MyAppsSidebarService {
    private base;
    private sidebarService;
    private openAppsGroup;
    private openApps;
    private openAppsDivider;
    constructor(sidebarService: SidebarService);
    init(): void;
    addApp(app: App.Class): void;
    openApp(app: App.Class): void;
    closeApp(app: App.Class): void;
    removeApp(app: App.Class): void;
    private addOpenAppsDivider();
    private removeOpenAppsDivider();
}
export default MyAppsSidebarService;
