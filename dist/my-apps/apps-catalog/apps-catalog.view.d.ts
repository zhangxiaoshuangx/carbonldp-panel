import { RouteData, Router } from "@angular/router-deprecated";
import { Title } from "@angular/platform-browser";
import "semantic-ui/semantic";
export declare class AppsCatalogView {
    private routeData;
    private title;
    private router;
    constructor(router: Router, routeData: RouteData, title: Title);
    routerOnActivate(): void;
}
export default AppsCatalogView;
