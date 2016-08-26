import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule, DeprecatedFormsModule } from '@angular/common';


import { routing } from "./app-content.routing";

import { AppContentView } from "./app-content.view";
import { EditAppView } from "./edit-app/edit-app.view";
import { EditAppComponent } from "./edit-app/edit-app.component";
import { DashboardView } from "./dashboard/dashboard.view";
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
	],
	declarations: [
		AppContentView,
		DashboardView,
		//SPARQLClientView,
		EditAppView,
		EditAppComponent,
		//ExplorerView,
		//ConfigurationView
	],
	providers: [
	],
} )
export class AppContentModule {
}
export default AppContentModule;