import { Component, Input, Output, EventEmitter, ContentChildren, QueryList, AfterContentInit, OnChanges, SimpleChange } from "@angular/core";

import { TabComponent } from "./tab.component";

import template from "./tabs.component.html!";
import style from "./tabs.component.css!text";

@Component( {
	selector: "sui-tabs",
	template: template,
	styles: [ style ],
} )
export class TabsComponent implements AfterContentInit, OnChanges {
	@ContentChildren( TabComponent ) tabs:QueryList<TabComponent>;

	@Input( "activeTab" ) activeTab:number = 0;
	@Output( "activeTabChange" ) activeTabChange:EventEmitter<number> = new EventEmitter<number>();

	private justChanged:boolean = false;
	private titles:string[] = [];

	ngAfterContentInit():void {
		this.reloadTitles();
		this.activateTab( 0 );
		this.activateDropdown();
		this.tabs.changes.subscribe( this.reloadTitles );
	}

	ngOnChanges( changes:{ [key:string]:SimpleChange; } ):void {
		if( "activeTab" in changes ) {
			this.justChanged = true;
			this.activateTab( changes[ "activeTab" ].currentValue );
		}
	}
	activateDropdown(){
		$(".ui.dropdown").dropdown();
	};

	reloadTitles():void {
		this.titles = this.tabs.toArray().filter( tab => tab.title ).map( tab => tab.title );
		console.log(this.titles);
	}

	activateTab( index:number = 0 ):void {
		this.activeTab = index;

		if( this.tabs ) {
			this.tabs.toArray().forEach( ( tab, index ) => {
				tab.active = this.activeTab === index;
			} );
		}

		if( ! this.justChanged ) this.activeTabChange.emit( index );
		else this.justChanged = false;
	}

	onTitleClick( titleIndex:number ):void {
		this.activateTab( titleIndex );
	}
}


export default TabsComponent;
