import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { CARBON_PROVIDERS } from "angular2-carbonldp/boot";
import { CARBON_SERVICES_PROVIDERS } from "angular2-carbonldp/services";

import { routing, appRoutingProviders } from "./my-apps.routing";

import { AppContentView } from "./app-content/app-content.view";
import { AppsCatalogView } from "./apps-catalog/apps-catalog.view";
import { CreateAppView } from "./create-app/create-app.view";

import { DashboardView } from "./app-content/dashboard/dashboard.view";
import { SPARQLClientView } from "./app-content/sparql-client/sparql-client.view";
import { EditAppView } from "./app-content/edit-app/edit-app.view";
import { ExplorerView } from "./app-content/explorer/explorer.view";
import { ConfigurationView } from "./app-content/configuration/configuration.view";

@NgModule( {
	imports: [
		BrowserModule,
		routing
	],
	declarations: [
		AppContentView,
		AppsCatalogView,
		CreateAppView,
		DashboardView,
		SPARQLClientView,
		EditAppView,
		ExplorerView,
		ConfigurationView,
	],
	providers: [
		appRoutingProviders,

		CARBON_PROVIDERS,
		CARBON_SERVICES_PROVIDERS
	],
} )
export class AppModule {
}
