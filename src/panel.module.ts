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
import { ErrorMessageComponent } from "./errors-area/error-message.component";
import { ErrorsAreaComponent } from "./errors-area/errors-area.component";
import { ErrorsAreaService } from "./errors-area/errors-area.service";
import { MenuBarComponent } from "./menu-bar.component";

// import { MyAppsSidebarService } from "./my-apps/my-apps-sidebar.service";
import { SemanticModule } from "./semantic/semantic.module";
import { RouterService } from "./router.service";
import { MyAppsSidebarService } from "./my-apps/my-apps-sidebar.service";

@NgModule( {
	imports: [
		CommonModule,
		RouterModule,
		DeprecatedFormsModule,
		SemanticModule
	],
	declarations: [
		HeaderComponent,
		HeaderItemComponent,
		LoginComponent,
		RegisterComponent,
		SidebarComponent,
		SidebarItemsComponent,
		ErrorMessageComponent,
		ErrorsAreaComponent,
		MenuBarComponent,
	],
	exports: [
		HeaderComponent,
		LoginComponent,
		RegisterComponent,
		SidebarComponent,
		MenuBarComponent,
		ErrorMessageComponent,
		ErrorsAreaComponent,
	],
	providers: [
		ErrorsAreaService,
	]
} )

export class PanelModule {

	static forRoot():ModuleWithProviders {
		return {
			ngModule: PanelModule,
			providers: [ HeaderService, SidebarService, RouterService, MyAppsSidebarService ]
		};
	}
}