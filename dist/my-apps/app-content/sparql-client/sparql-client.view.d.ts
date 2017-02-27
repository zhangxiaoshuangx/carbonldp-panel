/// <reference types="jquery" />
/// <reference types="jstree" />
import * as App from "carbonldp/App";
import { AppContentService } from "./../../app-content/app-content.service";
import { MessagesAreaService } from "carbonldp-panel/messages-area/messages-area.service";
export declare class SPARQLClientView {
    $element: JQuery;
    appContext: App.Context;
    canDisplay: boolean;
    private messagesAreaService;
    constructor(messagesAreaService: MessagesAreaService, appContentService: AppContentService);
    notifyErrorAreaService(error: any): void;
}
export default SPARQLClientView;
