import * as App from "carbonldp/App";
import { AppContentView } from "carbon-panel/my-apps/app-content/app-content.view";
import { ErrorsAreaService } from "carbon-panel/errors-area/errors-area.service";
import "semantic-ui/semantic";
export declare class SPARQLClientView {
    $element: JQuery;
    appContext: App.Context;
    private errorsAreaService;
    constructor(errorsAreaService: ErrorsAreaService, appContent: AppContentView);
}
export default SPARQLClientView;
