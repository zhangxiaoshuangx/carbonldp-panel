import { Location } from "@angular/common";
import { Router, ActivatedRoute } from "@angular/router";
import { AppContentService } from "carbonldp-panel/my-apps/app-content/app-content.service";
import { Modes } from "../agent-details/agent-details.component";
export declare class AgentCreatorView {
    private location;
    private router;
    private activatedRoute;
    private app;
    private agent;
    Modes: typeof Modes;
    canDisplay: boolean;
    constructor(router: Router, route: ActivatedRoute, appContentService: AppContentService, location: Location);
    goToAgents(): void;
}
