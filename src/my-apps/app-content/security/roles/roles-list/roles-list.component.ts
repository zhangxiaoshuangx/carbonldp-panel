import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { Router, ActivatedRoute, NavigationExtras } from "@angular/router";

import * as App from "carbonldp/App";
import * as Role from "carbonldp/Auth/Role";
import * as PersistedRole from "carbonldp/Auth/PersistedRole";
import * as URI from "carbonldp/RDF/URI";

import { RolesService } from "../roles.service";
import { Modes as RoleDetailsModes } from "../role-details/role-details.component";
import { Message } from "carbonldp-panel/errors-area/error-message.component";
import { ErrorMessageGenerator } from "carbonldp-panel/errors-area/error-message-generator";

import template from "./roles-list.component.html!";
import style from "./roles-list.component.css!text";

@Component( {
	selector: "cp-roles-list",
	template: template,
	styles: [ style ],
} )

export class RolesListComponent implements OnInit {

	private router:Router;
	private route:ActivatedRoute;
	private rolesService:RolesService;

	private roles:PersistedRole.Class[] = [];
	private _loading:boolean = false;
	private set loading( value:boolean ) {
		this._loading = value;
		this.onLoading.emit( value );
	};

	private get loading() {
		return this._loading;
	};

	private deletingRole:Role.Class;
	private activePage:number = 0;
	private totalRoles:number = 0;
	private rolesPerPage:number = 5;

	private headers:Header[] = [ { name: "Name", value: "name" }, { name: "Created", value: "created" }, { name: "Modified", value: "modified" } ];
	private sortedColumn:string = "name";
	private ascending:boolean = false;
	private errorMessage:Message;

	@Input() appContext:App.Context;
	@Input() refresher:EventEmitter<boolean>;

	@Output() onLoading:EventEmitter<boolean> = new EventEmitter();


	constructor( router:Router, route:ActivatedRoute, rolesService:RolesService ) {
		this.router = router;
		this.route = route;
		this.rolesService = rolesService;
	}

	ngOnInit():void {
		this.refresher.subscribe( ( canRefresh:boolean ) => {
			if( canRefresh ) this.loadRoles();
		} );
		this.loadRoles();
	}

	private loadRoles():void {
		this.loading = true;
		this.getNumberOfRoles().then( ( amount:number ) => {
			this.totalRoles = amount;
			return this.getRoles();
		} ).then( ( roles:PersistedRole.Class[] ) => {
			this.roles = roles;
		} ).catch( ( error ) => {
			console.error( error );
			this.errorMessage = ErrorMessageGenerator.getErrorMessage( error );
		} ).then( () => {
			this.loading = false;
		} );
	}

	private getRoles():Promise<PersistedRole.Class[]> {
		return this.rolesService.getAll( this.appContext, this.rolesPerPage, this.activePage, this.sortedColumn, this.ascending );
	}

	private openRole( event:Event, role:PersistedRole.Class ):void {
		event.stopPropagation();
		this.goToRole( role );
	}

	private onClickEditRole( event:Event, role:PersistedRole.Class ):void {
		event.stopPropagation();
		this.goToRole( role, true );
	}

	private goToRole( role:PersistedRole.Class, edit?:boolean ):void {
		let slug:string = URI.Util.getSlug( role.id );
		let extras:NavigationExtras = { relativeTo: this.route };
		if( edit ) extras.queryParams = { mode: RoleDetailsModes.EDIT };
		this.router.navigate( [ slug ], extras );
	}

	private refreshRoles():void {
		this.loadRoles();
	}

	private onClickDeleteRole( event:Event, role:Role.Class ):void {
		event.stopPropagation();
		this.deletingRole = role;
	}

	private getNumberOfRoles():Promise<number> {
		return this.rolesService.getNumberOfRoles( this.appContext );
	}

	private changePage( page:number ):void {
		this.activePage = page;
		this.loadRoles();
	}

	private changeRolesPerPage( rolesPerPage:number ) {
		this.rolesPerPage = rolesPerPage;
		this.loadRoles();
	}

	private sortColumn( header:Header ):void {
		if( this.sortedColumn === header.value ) this.ascending = ! this.ascending;
		this.sortedColumn = header.value;
		this.loadRoles();
	}
}

export interface Header {
	name:string;
	value:string;
}

export default RolesListComponent;
