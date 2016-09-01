import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule, DeprecatedFormsModule } from '@angular/common';
import { RouterModule } from "@angular/router";

// Components
import { HeaderComponent } from "./header.component";
import { HeaderItemComponent } from "./header-item.component";
import { LoginComponent } from "./login.component";
import { RegisterComponent } from "./register.component";
import { SidebarComponent } from "./sidebar.component";
import { SidebarItemsComponent } from "./sidebar-items.component";
import { ErrorMessageComponent } from "./errors-area/error-message.component";
import { ErrorsAreaComponent } from "./errors-area/errors-area.component";
import { MenuBarComponent } from "./menu-bar.component";

// Modules
import { SemanticModule } from "./semantic/semantic.module";

// Services
import { RouterService } from "./router.service";
import { HeaderService } from "./header.service";
import { SidebarService } from "./sidebar.service";
import { MyAppsSidebarService } from "./my-apps/my-apps-sidebar.service";
import { ErrorsAreaService } from "./errors-area/errors-area.service";

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
} )

export class PanelModule {

	static forRoot():ModuleWithProviders {
		return {
			ngModule: PanelModule,
			providers: [ HeaderService, SidebarService, RouterService, MyAppsSidebarService, ErrorsAreaService ]
		};
	}
}