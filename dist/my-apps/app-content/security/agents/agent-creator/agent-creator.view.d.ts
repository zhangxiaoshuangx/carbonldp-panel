import { Location } from "@angular/common";
import { Router, ActivatedRoute } from "@angular/router";
import { AppContentService } from "carbonldp-panel/my-apps/app-content/app-content.service";
export declare class AgentCreatorView {
    private location;
    private router;
    private activatedRoute;
    private app;
    private agent;
    private canDisplay;
    private modes;
    constructor(router: Router, route: ActivatedRoute, appContentService: AppContentService, location: Location);
    goToAgents(): void;
}
export default AgentCreatorView;
