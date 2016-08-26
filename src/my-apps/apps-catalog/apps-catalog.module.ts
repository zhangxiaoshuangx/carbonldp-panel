import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule, DeprecatedFormsModule } from '@angular/common';

import { AppsCatalogView } from "./apps-catalog.view";
import { AppsCatalogComponent } from "./apps-catalog.component";
import { AppsTilesComponent } from "./apps-tiles/apps-tiles.component";
import { AppTileComponent } from "./apps-tiles/app-tile.component";
import { AppsListComponent } from "./apps-list/apps-list.component";
import { AppActionButtonsComponent } from "./app-action-buttons/app-action-buttons.component";


@NgModule( {
	imports: [
		CommonModule,
		RouterModule,
		DeprecatedFormsModule,
	],
	declarations: [
		AppsCatalogView,
		AppsCatalogComponent,
		AppsTilesComponent,
		AppTileComponent,
		AppsListComponent,
		AppActionButtonsComponent,
	],
	exports: [
		AppsCatalogView,
	]
} )
export class AppsCatalogModule {
}
export default AppsCatalogModule;