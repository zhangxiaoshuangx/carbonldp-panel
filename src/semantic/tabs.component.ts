import {Component, ElementRef, ContentChildren, QueryList, AfterContentInit} from "@angular/core";

import {TabComponent} from "./tab.component";

import $ from "jquery";
import "semantic-ui/semantic";

import template from "./tabs.component.html!";

@Component( {
	selector: "sui-tabs",
	template: template,
	styles: [ ":host { display:block; } " ],
	directives: [ TabComponent ],
} )
export class TabsComponent implements AfterContentInit {
	@ContentChildren( TabComponent ) tabs:QueryList<TabComponent>;

	private titles:string[] = [];
	private activeTab:number;

	ngAfterContentInit():void {
		this.reloadTitles();
		this.activateTab( 0 );

		this.tabs.changes.subscribe( this.reloadTitles );
	}

	reloadTitles():void {
		this.titles = this.tabs.toArray().filter( tab => tab.title ).map( tab => tab.title );
	}

	activateTab( index:number = 0 ):void {
		this.activeTab = index;
		this.tabs.toArray().forEach( ( tab, index ) => {
			tab.active = this.activeTab === index;
		} );
	}

	onTitleClick( titleIndex:number ):void {
		this.activateTab( titleIndex );
	}
}


export default TabsComponent;
