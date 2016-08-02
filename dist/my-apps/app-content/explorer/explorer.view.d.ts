import { Title } from "@angular/platform-browser";
import { AppContentView } from "./../app-content.view";
import * as App from "./../app";
import "semantic-ui/semantic";
export declare class ExplorerView {
    app: App.Class;
    private title;
    constructor(title: Title, appContent: AppContentView);
    routerOnActivate(): void;
}
export default ExplorerView;
