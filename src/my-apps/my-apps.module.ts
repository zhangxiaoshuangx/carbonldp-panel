import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule, DeprecatedFormsModule } from '@angular/common';

import { PanelModule } from "./../panel.module";

import { CARBON_PROVIDERS } from "angular2-carbonldp/boot";
import { CARBON_SERVICES_PROVIDERS } from "angular2-carbonldp/services";

import { routing, appRoutingProviders } from "./my-apps.routing";

//import { AppContentView } from "./app-content/app-content.view";
import { AppsCatalogView } from "./apps-catalog/apps-catalog.view";
import { CreateAppView } from "./create-app/create-app.view";
import { AppContextService } from "./app-context.service";
//
// import { DashboardView } from "./app-content/dashboard/dashboard.view";
// import { SPARQLClientView } from "./app-content/sparql-client/sparql-client.view";
// import { EditAppView } from "./app-content/edit-app/edit-app.view";
// import { ExplorerView } from "./app-content/explorer/explorer.view";
// import { ConfigurationView } from "./app-content/configuration/configuration.view";

import { AppsCatalogComponent } from "./apps-catalog/apps-catalog.component";
import { AppsTilesComponent } from "./apps-catalog/apps-tiles/apps-tiles.component";
import { AppTileComponent } from "./apps-catalog/apps-tiles/app-tile.component";
import { AppsListComponent } from "./apps-catalog/apps-list/apps-list.component";
import { AppActionButtonsComponent } from "./apps-catalog/app-action-buttons/app-action-buttons.component";
import { ErrorMessageComponent} from "./../errors-area/error-message.component";

import { MyAppsSidebarService } from "./my-apps-sidebar.service";
//import { SidebarService } from "./../sidebar.service";


@NgModule( {
	imports: [
		BrowserModule,
		CommonModule,
		DeprecatedFormsModule,
		routing,
		PanelModule
	],
	declarations: [
		//AppContentView,
		AppsCatalogView,
		CreateAppView,
		// DashboardView,
		// SPARQLClientView,
		// EditAppView,
		// ExplorerView,
		// ConfigurationView,
		AppsCatalogComponent,
		AppsTilesComponent,
		AppTileComponent,
		AppsListComponent,
		AppActionButtonsComponent,
		ErrorMessageComponent
	],
	providers: [
		appRoutingProviders,

		AppContextService,
		MyAppsSidebarService,
		//SidebarService,

		CARBON_PROVIDERS,
		CARBON_SERVICES_PROVIDERS
	],
} )
export class MyAppsModule {
}
export default MyAppsModule;