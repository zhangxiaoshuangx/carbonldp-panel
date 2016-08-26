import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule, DeprecatedFormsModule } from '@angular/common';
import { ErrorsAreaModule } from "./../../errors-area/errors-area.module";

import { CreateAppView } from "./create-app.view";
import { CreateAppComponent } from "./create-app.component";



@NgModule( {
	imports: [
		RouterModule,
		CommonModule,
		DeprecatedFormsModule,
		ErrorsAreaModule.forRoot(),
	],
	declarations: [
		CreateAppComponent,
		CreateAppView,
	],
	exports: [
		CreateAppView
	],
} )
export class CreateAppModule {
}
export default CreateAppModule;