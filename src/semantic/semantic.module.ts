import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabComponent } from "./tab.component";
import { TabsComponent } from "./tabs.component";
import { AccordionComponent } from "./accordion.component";
import { CollapsibleDirective } from "./collapsible.directive";
import { CollapsibleTitleDirective } from "./collapsible.directive";
import { CollapsibleContentDirective } from "./collapsible.directive";


@NgModule( {
	imports: [ CommonModule ],
	declarations: [
		TabComponent,
		TabsComponent,
		AccordionComponent,
		CollapsibleDirective,
		CollapsibleTitleDirective,
		CollapsibleContentDirective
	],
	exports: [
		TabComponent,
		TabsComponent,
		AccordionComponent,
		CollapsibleDirective,
		CollapsibleTitleDirective,
		CollapsibleContentDirective
	],
} )

export class SemanticModule {

}