import { EventEmitter, QueryList, AfterContentInit, OnChanges, SimpleChange } from "@angular/core";
import { TabComponent } from "./tab.component";
export declare class TabsComponent implements AfterContentInit, OnChanges {
    tabs: QueryList<TabComponent>;
    activeTab: number;
    activeTabChange: EventEmitter<number>;
    private justChanged;
    private titles;
    ngAfterContentInit(): void;
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
    reloadTitles(): void;
    activateTab(index?: number): void;
    onTitleClick(titleIndex: number): void;
}
export default TabsComponent;
