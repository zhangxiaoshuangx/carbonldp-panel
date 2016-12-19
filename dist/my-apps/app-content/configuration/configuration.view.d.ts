import { AppContentService } from "./../../app-content/app-content.service";
import * as App from "./../app";
import "semantic-ui/semantic";
export declare class ConfigurationView {
    app: App.Class;
    canDisplay: boolean;
    constructor(appContentService: AppContentService);
}
export default ConfigurationView;
