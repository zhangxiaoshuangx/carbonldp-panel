import { Router, ActivatedRoute } from "@angular/router";
import { AppContentService } from "carbonldp-panel/my-apps/app-content/app-content.service";
export declare class AgentDetailsView {
    private router;
    private activatedRoute;
    private app;
    private agent;
    private mode;
    canDisplay: boolean;
    constructor(router: Router, route: ActivatedRoute, appContentService: AppContentService);
    ngOnInit(): void;
    private goToAgent();
}
