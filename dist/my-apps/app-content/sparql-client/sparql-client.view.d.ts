/// <reference types="jquery" />
/// <reference types="jstree" />
import * as App from "carbonldp/App";
import { AppContentService } from "./../../app-content/app-content.service";
import { ErrorsAreaService } from "carbonldp-panel/errors-area/errors-area.service";
export declare class SPARQLClientView {
    $element: JQuery;
    appContext: App.Context;
    canDisplay: boolean;
    private errorsAreaService;
    constructor(errorsAreaService: ErrorsAreaService, appContentService: AppContentService);
    notifyErrorAreaService(error: any): void;
}
export default SPARQLClientView;
