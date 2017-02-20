import { Component, ElementRef, Input, AfterViewInit } from "@angular/core";

import { RouterService } from "carbonldp-panel/router.service";
import { HeaderItem } from "carbonldp-panel/header.service";

import * as $ from "jquery";
import "semantic-ui/semantic";

@Component( {
	selector: "cp-header-item",
	templateUrl: "./header-item.component.html",
	styleUrls: [  "./header-item.component.scss"  ],
} )
export class HeaderItemComponent implements AfterViewInit {
	@Input( "item" ) item:HeaderItem;

	private element:ElementRef;
	private $element:JQuery;
	private routerService:RouterService;

	constructor( element:ElementRef, routerService:RouterService ) {
		this.element = element;
		this.routerService = routerService;
	}

	ngAfterViewInit():void {
		this.$element = $( this.element.nativeElement );
		this.createDropdownMenus();
	}

	createDropdownMenus():void {
		if( ! this.item.children ) return;
		this.$element.find( ".ui.dropdown" ).dropdown( {
			on: "hover",
		} );
	}
}

export default HeaderItemComponent;
