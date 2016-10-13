import { Type } from "@angular/core";

import { AccordionComponent } from "./semantic/accordion.component";
import { CollapsibleDirective, CollapsibleTitleDirective, CollapsibleContentDirective } from "./semantic/collapsible.directive";
import { TabsComponent } from "./semantic/tabs.component";
import { TabComponent } from "./semantic/tab.component";

export const SUI_COMPONENTS:Type<any>[] = [
	AccordionComponent,
	CollapsibleDirective,
	CollapsibleTitleDirective,
	CollapsibleContentDirective,
	TabsComponent,
	TabComponent,
];
