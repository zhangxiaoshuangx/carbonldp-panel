import { Component, Input, EventEmitter } from "@angular/core";

import * as App from "carbonldp/App";

import template from "./roles-catalog.component.html!";


@Component( {
	selector: "cp-roles-catalog",
	template: template,
} )
export class RolesCatalogComponent {

	private loading:boolean;
	private view:string = "tree";
	private refresher:EventEmitter<boolean> = new EventEmitter();

	@Input() appContext:App.Context;

	constructor() {}

	private setView( view:string ):void {
		this.view = view;
	}

	private refreshRoles():void {
		this.refresher.emit( true );
	}

	private changeLoadingState( state:boolean ) {
		this.loading = state;
	}
}

export default RolesCatalogComponent;