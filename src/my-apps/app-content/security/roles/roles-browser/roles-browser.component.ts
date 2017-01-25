import { Component, Input, Output, EventEmitter, NgZone } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import * as App from "carbonldp/App";
import * as PersistedRole from "carbonldp/App/PersistedRole";

import { Modes } from "../role-details/role-details.component";
import { RolesService } from "../roles.service";
import { Message } from "carbonldp-panel/messages-area/message.component";
import { ErrorMessageGenerator } from "carbonldp-panel/messages-area/error/error-message-generator";

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
	private router:Router;
	private activatedRoute:ActivatedRoute;

	private activeRole:PersistedRole.Class;
	private selectedRole:string;
	private loading:boolean = false;
	private messages:Message[] = [];
	private hasRoleOnRoute:boolean = false;
	private Modes:Modes = Modes;
	private mode:string = Modes.READ;

	@Input() appContext:App.Context;
	@Output() onRefresh:EventEmitter<string> = new EventEmitter();
	@Output() onDelete:EventEmitter<string> = new EventEmitter();

	constructor( router:Router, route:ActivatedRoute, rolesService:RolesService, zone:NgZone ) {
		this.rolesService = rolesService;
		this.zone = zone;
		this.router = router;
		this.activatedRoute = route;
	}

	ngOnInit() {
		this.activatedRoute.data.forEach( ( data:{ role:PersistedRole.Class } ) => {
			this.activeRole = data.role;
			if( ! ! data.role ) this.hasRoleOnRoute = true;
		} );
	}

	private resolveRole( roleID:string ):void {
		this.loading = true;
		new Promise( ( resolve, reject ) => {
			if( this.hasRoleOnRoute ) {
				this.hasRoleOnRoute = false;
				resolve( this.activeRole );
			}
			resolve( this.rolesService.get( roleID, this.appContext ) );
		} ).then( ( role:PersistedRole.Class ) => {
			this.zone.run( () => {
				this.activeRole = role;
				this.loading = false;
			} );
		} ).catch( ( error ) => {
			this.handleError( error );
		} ).then( () => {
			this.loading = false;
		} );
	}

	private onSuccessDelete( roleID:string ):void {
		this.onDelete.emit( roleID );
	}

	private onSuccessCreate( roleID:string ):void {
		this.onRefresh.emit( this.selectedRole );
	}

	private onSuccessEdit( roleID:string ):void {
		this.onRefresh.emit( roleID );
	}

	private handleError( error:any ):void {
		this.messages.push( ErrorMessageGenerator.getErrorMessage( error ) );
	}
}

export default RolesBrowserComponent;