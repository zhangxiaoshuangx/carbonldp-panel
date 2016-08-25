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
import { ErrorMessageComponent } from "./errors-area/error-message.component";
import { ErrorsAreaComponent } from "./errors-area/errors-area.component";
import { ErrorsAreaService } from "./errors-area/errors-area.service";

//import { RouterService } from "carbon-panel/router.service";

@NgModule( {
	imports: [ CommonModule, RouterModule, DeprecatedFormsModule ],
	declarations: [ HeaderComponent,
		HeaderItemComponent,
		LoginComponent,
		RegisterComponent,
		SidebarComponent,
		SidebarItemsComponent,
		ErrorMessageComponent,
		ErrorsAreaComponent,
		MenuBarComponent ],
	exports: [ HeaderComponent,
		LoginComponent,
		RegisterComponent,
		SidebarComponent,
		MenuBarComponent,
		ErrorsAreaComponent,
		ErrorMessageComponent,],
	providers: [ HeaderService, SidebarService, ErrorsAreaService ],
} )

export class PanelModule {

	/*static forRoot(): ModuleWithProviders {
		return {
			ngModule: PanelModule,
			providers: [ HeaderService, SidebarService ]
		};
	}*/
}