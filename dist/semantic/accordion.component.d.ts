import { QueryList, AfterContentInit } from "@angular/core";
import { CollapsibleDirective } from "./collapsible.directive";
import "semantic-ui/semantic";
export declare class AccordionComponent implements AfterContentInit {
    blocks: QueryList<CollapsibleDirective>;
    ngAfterContentInit(): void;
    subscribeBlocks(): void;
    onBlockActive(triggeredBlock: CollapsibleDirective, active: boolean): void;
}
export default AccordionComponent;
