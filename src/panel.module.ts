import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule, DeprecatedFormsModule } from '@angular/common';
import { RouterModule } from "@angular/router";

import { HeaderComponent } from "./header.component";
import { HeaderItemComponent } from "./header-item.component";
import { HeaderService } from "./header.service";
import { LoginComponent } from "./login.component";
import { RegisterComponent } from "./register.component";
import { SidebarComponent } from "./sidebar.component";
import { SidebarItemsComponent } from "./sidebar-items.component";
import { SidebarService } from "./sidebar.service";

import { MenuBarComponent } from "./menu-bar.component";

import { ErrorsAreaModule } from "./errors-area/errors-area.module";
import { SemanticModule } from "./semantic/semantic.module";
import { RouterService } from "./router.service";

@NgModule( {
	imports: [
		CommonModule,
		RouterModule,
		DeprecatedFormsModule,
		ErrorsAreaModule.forRoot(),
		SemanticModule
	],
	declarations: [
		HeaderComponent,
		HeaderItemComponent,
		LoginComponent,
		RegisterComponent,
		SidebarComponent,
		SidebarItemsComponent,
		MenuBarComponent,
	],
	exports: [
		ErrorsAreaModule,
		HeaderComponent,
		LoginComponent,
		RegisterComponent,
		SidebarComponent,
		MenuBarComponent,
	],
	//providers: [ HeaderService, SidebarService ],
} )

export class PanelModule {

	static forRoot(): ModuleWithProviders {
		return {
			ngModule: PanelModule,
			providers: [ HeaderService, SidebarService, RouterService ]
		};
	}
}