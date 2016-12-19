import * as App from "carbonldp/App";
export declare class RolesCatalogComponent {
    private loading;
    private view;
    private refresher;
    appContext: App.Context;
    constructor();
    private setView(view);
    private refreshRoles();
    private changeLoadingState(state);
}
export default RolesCatalogComponent;
