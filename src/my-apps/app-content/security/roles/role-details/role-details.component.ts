import { Component, Input, Output, SimpleChange, EventEmitter } from "@angular/core"

import * as App from "carbonldp/App";
import * as PersistedRole from "carbonldp/Auth/PersistedRole";
import * as HTTP from "carbonldp/HTTP";
import * as NS from "carbonldp/NS";

import { RolesService } from "./../roles.service";
import { DocumentExplorerLibrary } from "carbonldp-panel/document-explorer/document-explorer-library";
import { Message } from "carbonldp-panel/errors-area/error-message.component";
import { ErrorMessageGenerator } from "carbonldp-panel/errors-area/error-message-generator";

import template from "./role-details.component.html!";
import style from "./role-details.component.css!text";


@Component( {
	selector: "cp-role-details",
	template: template,
	styles: [ style ],
} )

export class RoleDetailsComponent {

	private rolesService:RolesService;

	private Modes:Modes = Modes;
	private roleFormModel:RoleFormModel = {
		slug: "",
		name: "",
		description: "",
		parentRole: "",
	};
	private availableRoles:PersistedRole.Class[] = [];


	@Input() embedded:boolean = true;
	@Input() mode:string = Modes.READ;
	@Input() role:PersistedRole.Class;
	@Input() appContext:App.Context;

	@Output() onClose:EventEmitter<boolean> = new EventEmitter<boolean>();
	@Output() onSuccess:EventEmitter<boolean> = new EventEmitter<boolean>();
	@Output() onError:EventEmitter<boolean> = new EventEmitter<boolean>();


	constructor( rolesService:RolesService ) {
		this.rolesService = rolesService;
	}

	ngAfterViewInit():void { }

	ngOnChanges( changes:{ [propName:string]:SimpleChange } ):void {
		if( changes[ "role" ] && ! ! changes[ "role" ].currentValue && changes[ "role" ].currentValue !== changes[ "role" ].previousValue ) {
			console.log( this.role );
			this.changeRole( this.role );
		}
	}

	private changeRole( role:PersistedRole.Class ):void {
		this.roleFormModel.slug = this.getSanitizedSlug( role.id );
		this.roleFormModel.name = role.name;
		this.roleFormModel.description = role[ NS.CS.Predicate.description ];
	}

	private changeMode( mode:string ):void {
		this.mode = mode;
	}

	private onSubmit( data:RoleFormModel, $event:any ):void {
		$event.preventDefault();
		console.log( data );
		switch( this.mode ) {
			case Modes.EDIT:
				this.editRole( this.role, data );
				break;
			// 	case Modes.CREATE:
			// 		this.createAgent( this.agent, data );
			// 		break;
		}
	}

	private editRole( role:PersistedRole.Class, roleData:RoleFormModel ):void {
		role.name = roleData.name;
		role[ NS.CS.Predicate.description ] = roleData.description;
		this.rolesService.saveAndRefresh( this.appContext, role ).then( ( [ updatedAgent, [ saveResponse, refreshResponse ] ]:[ PersistedRole.Class, [ HTTP.Response.Class, HTTP.Response.Class ] ] ) => {
			// this.displaySuccessMessage = true;
			this.onSuccess.emit( true );
			this.cancelForm();
		} ).catch( ( error ) => {
			// this.errorMessage = ErrorMessageGenerator.getErrorMessage( error );
			// if( typeof error.name !== "undefined" ) this.errorMessage.title = error.name;
			this.onError.emit( true );
		} );
	}

	private getSanitizedSlug( slug:string ):string {
		return DocumentExplorerLibrary.getSanitizedSlug( slug );
	}

	private slugLostFocus( evt:any ):void {
		evt.target.value = DocumentExplorerLibrary.getAppendedSlashSlug( evt.target.value );
	}

	private getAllRoles():Promise<PersistedRole.Class[]> {
		return this.rolesService.getAll( this.appContext );
	}

	private changeRoles( selectedRoles:PersistedRole.Class[] ):void {
		this.roleFormModel.parentRole = null;
		selectedRoles.forEach( ( selectedRole:PersistedRole.Class ) => {
			this.roleFormModel.parentRole = selectedRole.id;
		} );
	}

	private cancelForm():void {
		if( this.mode === Modes.CREATE ) {
			this.close();
		} else {
			this.mode = Modes.READ;
		}
		this.changeRole( this.role );
	}

	private close():void {
		this.onClose.emit( true );
	}
}

export class Modes {
	static READ:string = "READ";
	static EDIT:string = "EDIT";
	static CREATE:string = "CREATE";
}

export interface RoleFormModel {
	slug:string;
	name:string;
	description?:string;
	parentRole?:string;
}

export default RoleDetailsComponent;