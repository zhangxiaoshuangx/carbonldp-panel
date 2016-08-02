import { Title } from "@angular/platform-browser";
import * as App from "carbonldp/App";
import { AppContentView } from "carbon-panel/my-apps/app-content/app-content.view";
import { ErrorsAreaService } from "carbon-panel/errors-area/errors-area.service";
import "semantic-ui/semantic";
export declare class SPARQLClientView {
    $element: JQuery;
    app: App.Class;
    appContext: App.Context;
    private title;
    private errorsAreaService;
    constructor(title: Title, errorsAreaService: ErrorsAreaService, appContent: AppContentView);
    notifyErrorAreaService(error: any): void;
    routerOnActivate(): void;
}
export default SPARQLClientView;
