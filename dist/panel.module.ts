import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

// Components
import { HeaderComponent } from "./header.component";
import { HeaderItemComponent } from "./header-item.component";
import { LoginComponent } from "./login.component";
import { RegisterComponent } from "./register.component";
import { SidebarComponent } from "./sidebar.component";
import { SidebarItemsComponent } from "./sidebar-items.component";
import { MessageComponent } from "./messages-area/message.component";
import { MessagesAreaComponent } from "./messages-area/messages-area.component";
import { MenuBarComponent } from "./menu-bar.component";
import { PaginatorComponent } from "./paginator/paginator.component";
import { ErrorLabelComponent } from "./messages-area/error/error-label.component";

// Modules
import { SemanticModule } from "./semantic/semantic.module";
import { DirectivesModule } from "./directives/directives.module";

// Services
import { RouterService } from "./router.service";
import { HeaderService } from "./header.service";
import { SidebarService } from "./sidebar.service";
import { MyAppsSidebarService } from "./my-apps/my-apps-sidebar.service";
import { MessagesAreaService } from "./messages-area/messages-area.service";

@NgModule( {
	imports: [
		CommonModule,
		RouterModule,
		SemanticModule,
		DirectivesModule,
		FormsModule
	],
	declarations: [
		HeaderComponent,
		HeaderItemComponent,
		LoginComponent,
		RegisterComponent,
		SidebarComponent,
		SidebarItemsComponent,
		MessageComponent,
		MessagesAreaComponent,
		MenuBarComponent,
		PaginatorComponent,
		ErrorLabelComponent,
	],
	exports: [
		HeaderComponent,
		LoginComponent,
		RegisterComponent,
		SidebarComponent,
		MenuBarComponent,
		MessageComponent,
		MessagesAreaComponent,
		PaginatorComponent,
		ErrorLabelComponent,
	],
	providers: []
} )

export class PanelModule {

	static forRoot():ModuleWithProviders {
		return {
			ngModule: PanelModule,
			providers: [ HeaderService, SidebarService, RouterService, MyAppsSidebarService, MessagesAreaService ]
		};
	}
}