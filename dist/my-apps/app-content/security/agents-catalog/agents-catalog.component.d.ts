import * as App from "carbonldp/App";
import "semantic-ui/semantic";
export declare class AgentsCatalogComponent {
    private agents;
    private loading;
    appContext: App.Context;
    constructor();
    ngOnInit(): void;
    private loadAgents();
    private getSlug(slug);
}
export default AgentsCatalogComponent;
