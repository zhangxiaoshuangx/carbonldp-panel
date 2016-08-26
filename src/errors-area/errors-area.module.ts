import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule, DeprecatedFormsModule } from '@angular/common';
import { RouterModule } from "@angular/router";

import { ErrorMessageComponent } from "./error-message.component";
import { ErrorsAreaComponent } from "./errors-area.component";
import { ErrorsAreaService } from "./errors-area.service";

@NgModule( {
	imports: [ CommonModule, RouterModule, DeprecatedFormsModule ],
	declarations: [
		ErrorMessageComponent,
		ErrorsAreaComponent
	],
	exports: [
		ErrorMessageComponent,
		ErrorsAreaComponent,
	],
	providers: [ ErrorsAreaService ],
} )

export class ErrorsAreaModule {

	static forRoot(): ModuleWithProviders {
		return {
			ngModule: ErrorsAreaModule,
			providers: [ ErrorsAreaService ]
		};
	}
}