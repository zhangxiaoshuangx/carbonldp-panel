import { Title } from "@angular/platform-browser";
import { RouteData, Router } from "@angular/router-deprecated";
import { AppContentView } from "./../../app-content/app-content.view";
import * as App from "./../app";
import "semantic-ui/semantic";
export declare class EditAppView {
    app: App.Class;
    title: Title;
    routeData: RouteData;
    private router;
    constructor(router: Router, routeData: RouteData, title: Title, appContentView: AppContentView);
    routerOnActivate(): void;
}
export default EditAppView;
