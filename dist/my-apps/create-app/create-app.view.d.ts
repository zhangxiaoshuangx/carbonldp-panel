import { Title } from "@angular/platform-browser";
import { Router, RouteData } from "@angular/router-deprecated";
import "semantic-ui/semantic";
export declare class CreateAppView {
    private title;
    private router;
    private routeData;
    constructor(title: Title, router: Router, routeData: RouteData);
    routerOnActivate(): void;
}
export default CreateAppView;
