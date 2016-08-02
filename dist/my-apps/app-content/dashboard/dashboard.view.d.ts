import { Title } from "@angular/platform-browser";
import { AppContentView } from "./../../app-content/app-content.view";
import * as App from "./../app";
import "semantic-ui/semantic";
export declare class DashboardView {
    app: App.Class;
    private title;
    constructor(title: Title, appContent: AppContentView);
    routerOnActivate(): void;
}
export default DashboardView;
