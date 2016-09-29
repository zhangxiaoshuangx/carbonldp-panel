import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule, DeprecatedFormsModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

//Providers
import { CARBON_PROVIDERS } from "angular2-carbonldp/boot";
import { CARBON_SERVICES_PROVIDERS } from "angular2-carbonldp/services";
import { routing } from "./my-apps.routing";

// Components
import { MyAppsView } from "./my-apps.view";
import { CreateAppView } from "./create-app/create-app.view";
import { CreateAppComponent } from "./create-app/create-app.component";
import { AppsCatalogView } from "./apps-catalog/apps-catalog.view";
import { AppsCatalogComponent } from "./apps-catalog/apps-catalog.component";
import { AppsTilesComponent } from "./apps-catalog/apps-tiles/apps-tiles.component";
import { AppTileComponent } from "./apps-catalog/apps-tiles/app-tile.component";
import { AppsListComponent } from "./apps-catalog/apps-list/apps-list.component";
import { AppActionButtonsComponent } from "./apps-catalog/app-action-buttons/app-action-buttons.component";
import { AppNotFoundView } from "./app-not-found.view";

// Modules
import { PanelModule } from "./../panel.module";
import { DirectivesModule } from "./../directives.module";

// Services
import { AppContextService } from "./app-context.service";


@NgModule( {
	imports: [
		BrowserModule,
		CommonModule,
		//DeprecatedFormsModule,
		FormsModule,
		routing,
		PanelModule,
		DirectivesModule,
	],
	declarations: [
		MyAppsView,
		CreateAppView,
		AppsCatalogView,
		AppsCatalogComponent,
		AppsTilesComponent,
		AppTileComponent,
		AppsListComponent,
		AppActionButtonsComponent,
		CreateAppComponent,
		AppNotFoundView,
	],
	providers: [
		AppContextService, // TODO: check if this service causes a conflict with being reinitialized because of its provider

		CARBON_PROVIDERS,
		CARBON_SERVICES_PROVIDERS
	],
} )
export class MyAppsModule {
}
export default MyAppsModule;
