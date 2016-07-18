import Carbon from "carbonldp/Carbon";
import * as App from "carbonldp/App";
export declare class AppContextService {
    carbon: Carbon;
    appContexts: Map<string, App.Context>;
    constructor(carbon: Carbon);
    get(slug: string): Promise<App.Context>;
    getAll(): Promise<App.Context[]>;
    getSlug(appContext: App.Context): string;
    private removeTrailingSlash(slug);
}
export default AppContextService;
