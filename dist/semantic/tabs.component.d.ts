import { QueryList, AfterContentInit } from "@angular/core";
import { TabComponent } from "./tab.component";
import "semantic-ui/semantic";
export declare class TabsComponent implements AfterContentInit {
    tabs: QueryList<TabComponent>;
    private titles;
    private activeTab;
    ngAfterContentInit(): void;
    reloadTitles(): void;
    activateTab(index?: number): void;
    onTitleClick(titleIndex: number): void;
}
export default TabsComponent;
