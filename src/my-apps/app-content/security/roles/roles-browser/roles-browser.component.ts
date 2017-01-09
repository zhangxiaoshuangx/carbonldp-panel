import { Component, Input, Output, EventEmitter } from "@angular/core";

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

	private activeRole:PersistedRole.Class;
	private selectedRole:string;

	@Input() appContext:App.Context;
	@Output() onRefreshTree:EventEmitter<string> = new EventEmitter();

	constructor( rolesService:RolesService ) {
		this.rolesService = rolesService;
	}

	private resolveRole( roleID:string ):void {
		this.rolesService.get( roleID, this.appContext ).then( ( role:PersistedRole.Class ) => {
			this.activeRole = role;
		} );
	}

	private onSuccessDelete( roleID:string ):void {
		this.onRefreshTree.emit( roleID );
	}
}

export default RolesBrowserComponent;