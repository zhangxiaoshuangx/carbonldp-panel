import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule, DeprecatedFormsModule } from '@angular/common';

import { CARBON_PROVIDERS } from "angular2-carbonldp/boot";
import { CARBON_SERVICES_PROVIDERS } from "angular2-carbonldp/services";

import { routing } from "./my-apps.routing";

import { MyAppsView } from "./my-apps.view";
import { CreateAppModule } from "./create-app/create-app.module";
import { AppsCatalogModule } from "./apps-catalog/apps-catalog.module";
import { PanelModule } from "./../panel.module";

import { AppContextService } from "./app-context.service";
import { MyAppsSidebarService } from "./my-apps-sidebar.service";
//
// import { DashboardView } from "./app-content/dashboard/dashboard.view";
// import { SPARQLClientView } from "./app-content/sparql-client/sparql-client.view";
// import { EditAppView } from "./app-content/edit-app/edit-app.view";
// import { ExplorerView } from "./app-content/explorer/explorer.view";
// import { ConfigurationView } from "./app-content/configuration/configuration.view";

@NgModule( {
	imports: [
		BrowserModule,
		CommonModule,
		DeprecatedFormsModule,
		routing,
		PanelModule,
		CreateAppModule,
		AppsCatalogModule,
	],
	declarations: [
		MyAppsView
	],
	providers: [
		AppContextService,
		MyAppsSidebarService,

		CARBON_PROVIDERS,
		CARBON_SERVICES_PROVIDERS
	],
} )
export class MyAppsModule {
}
export default MyAppsModule;