import { Router, ActivatedRoute } from "@angular/router";
import { AppContentService } from "carbonldp-panel/my-apps/app-content/app-content.service";
export declare class RoleDetailsView {
    private router;
    private activatedRoute;
    private app;
    private role;
    private canDisplay;
    private mode;
    constructor(router: Router, route: ActivatedRoute, appContentService: AppContentService);
    ngOnInit(): void;
    private goToRoles();
}
export default RoleDetailsView;
