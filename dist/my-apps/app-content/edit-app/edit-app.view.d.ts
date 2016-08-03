import { Title } from "@angular/platform-browser";
import { AppContentView } from "./../../app-content/app-content.view";
import * as App from "./../app";
import "semantic-ui/semantic";
export declare class EditAppView {
    app: App.Class;
    title: Title;
    constructor(title: Title, appContentView: AppContentView);
    routerOnActivate(): void;
}
export default EditAppView;
