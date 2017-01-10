import { Component, Input, Output, EventEmitter, NgZone } from "@angular/core";

import * as App from "carbonldp/App";
import * as PersistedRole from "carbonldp/App/PersistedRole";

import { RolesService } from "../roles.service";

import template from "./roles-browser.component.html!";
import style from "./roles-browser.component.css!text";


@Component( {
	selector: "cp-roles-browser",
	template: template,
	styles: [ style ],
} )
export class RolesBrowserComponent {

	private rolesService:RolesService;
	private zone:NgZone;

	private activeRole:PersistedRole.Class;
	private selectedRole:string;
	private loading:boolean = false;

	@Input() appContext:App.Context;
	@Output() onRefreshTree:EventEmitter<string> = new EventEmitter();

	constructor( rolesService:RolesService, zone:NgZone ) {
		this.rolesService = rolesService;
		this.zone = zone;
	}

	private resolveRole( roleID:string ):void {
		this.loading = true;
		this.rolesService.get( roleID, this.appContext ).then( ( role:PersistedRole.Class ) => {
			this.zone.run( () => {
				this.activeRole = role;
				this.loading = false;
			} );
		} );
	}

	private onSuccessDelete( roleID:string ):void {
		this.onRefreshTree.emit( roleID );
	}

	private onSuccessCreate( roleID:string ):void {
		this.onRefreshTree.emit( this.selectedRole );
	}
}

export default RolesBrowserComponent;