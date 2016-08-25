import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule, DeprecatedFormsModule } from '@angular/common';
import { RouterModule } from "@angular/router";

import {HeaderComponent} from "./header.component";
import {HeaderItemComponent} from "./header-item.component";
import {HeaderService} from "./header.service";
import {LoginComponent} from "./login.component";
import {RegisterComponent} from "./register.component";
import {SidebarService} from "./sidebar.service";

//import { RouterService } from "carbon-panel/router.service";

@NgModule({
	imports:      [ CommonModule, RouterModule, DeprecatedFormsModule ],
	declarations: [ HeaderComponent, HeaderItemComponent,LoginComponent, RegisterComponent ],
	exports:      [ HeaderComponent, LoginComponent, RegisterComponent ],
	providers: [ HeaderService, SidebarService ],
})

export class PanelModule {

	/*static forRoot(): ModuleWithProviders {
		return {
			ngModule: PanelModule,
			providers: [ HeaderService, SidebarService ]
		};
	}*/
}