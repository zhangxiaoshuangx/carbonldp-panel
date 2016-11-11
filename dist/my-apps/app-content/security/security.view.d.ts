import { AppContentService } from "./../../app-content/app-content.service";
import * as App from "./../app";
import "semantic-ui/semantic";
export declare class SecurityView {
    app: App.Class;
    canDisplay: boolean;
    constructor(appContentService: AppContentService);
}
export default SecurityView;
