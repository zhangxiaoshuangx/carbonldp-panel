import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabComponent } from "./tab.component";
import { TabsComponent } from "./tabs.component";
import { AccordionComponent } from "./accordion.component";
import { CollapsibleDirective } from "./collapsible.directive";


@NgModule( {
	imports: [ CommonModule ],
	declarations: [
		TabComponent,
		TabsComponent,
		AccordionComponent,
		CollapsibleDirective
	],
	exports: [
		TabComponent,
		TabsComponent,
		AccordionComponent,
		CollapsibleDirective
	],
} )

export class SemanticModule {

}