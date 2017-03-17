import * as CarbonApp from "carbonldp/App";
import * as PersistedApp from "carbonldp/PersistedApp";
export interface Class extends PersistedApp.Class {
    slug: string;
    context: CarbonApp.Context;
}
export declare class Factory {
    static createFrom(appContext: CarbonApp.Context): Class;
}
export declare class Util {
    static getSlug(app: PersistedApp.Class): string;
    private static removeTrailingSlash(slug);
}
