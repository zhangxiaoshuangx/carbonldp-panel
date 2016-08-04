import { Title } from "@angular/platform-browser";
import { Router, RouteData } from "@angular/router-deprecated";
import { AppContentView } from "./../app-content.view";
import * as App from "./../app";
import "semantic-ui/semantic";
export declare class ExplorerView {
    app: App.Class;
    private title;
    private router;
    private routeData;
    constructor(routeData: RouteData, router: Router, title: Title, appContent: AppContentView);
    routerOnActivate(): void;
}
export default ExplorerView;
