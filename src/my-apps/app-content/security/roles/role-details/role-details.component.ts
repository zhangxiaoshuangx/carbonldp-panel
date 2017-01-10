import { Component, Input, Output, ElementRef, SimpleChange, EventEmitter } from "@angular/core"

import * as App from "carbonldp/App";
import * as Role from "carbonldp/App/Role";
import * as PersistedRole from "carbonldp/App/PersistedRole";
import * as PersistedAgent from "carbonldp/App/PersistedAgent";
import * as HTTP from "carbonldp/HTTP";
import * as NS from "carbonldp/NS";
import * as Pointer from "carbonldp/Pointer";

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

	private element:ElementRef;
	private $element:JQuery;
	private rolesService:RolesService;
	private Modes:Modes = Modes;
	private roleFormModel:RoleFormModel = {
		slug: "",
		name: "",
		description: "",
		parentRole: "",
		agents: [],
	};
	private activeTab:string = "details";
	private roleAgents:PersistedAgent.Class[] = [];
	private errorMessage:Message;
	private displaySuccessMessage:boolean = false;


	@Input() embedded:boolean = true;
	@Input() mode:string = Modes.READ;
	@Input() role:PersistedRole.Class = <any>Role.Factory.create( "New Role" );
	@Input() appContext:App.Context;
	@Input() parentRole:string;

	@Output() onClose:EventEmitter<boolean> = new EventEmitter<boolean>();
	@Output() onSuccess:EventEmitter<string> = new EventEmitter<string>();
	@Output() onError:EventEmitter<boolean> = new EventEmitter<boolean>();


	constructor( element:ElementRef, rolesService:RolesService ) {
		this.element = element;
		this.$element = $( this.element.nativeElement );
		this.rolesService = rolesService;
	}

	ngAfterViewInit():void { }

	ngOnChanges( changes:{ [propName:string]:SimpleChange } ):void {
		if( changes[ "role" ] && ! ! changes[ "role" ].currentValue && changes[ "role" ].currentValue !== changes[ "role" ].previousValue ) {
			this.changeRole( this.role );
		}
	}

	private changeRole( role:PersistedRole.Class ):void {
		this.mode = Modes.READ;
		this.displaySuccessMessage = false;
		this.errorMessage = null;
		this.roleFormModel.slug = this.getSanitizedSlug( role.id );
		this.roleFormModel.name = role.name;
		this.roleFormModel.description = role[ NS.CS.Predicate.description ];
		this.getAgents( this.role ).then( ( agents ) => {
			this.roleAgents = [];
			this.roleAgents = agents;
			this.roleFormModel.agents = [ ...agents ];
		} );
	}

	private changeMode( mode:string ):void {
		this.mode = mode;
	}

	private onSubmit( data:RoleFormModel, $event:any ):void {
		$event.preventDefault();
		switch( this.mode ) {
			case Modes.EDIT:
				this.editRole( this.role, data );
				break;
			case Modes.CREATE:
				this.createRole( this.role, data );
				break;
		}
	}

	private editRole( role:PersistedRole.Class, roleData:RoleFormModel ):void {
		role.name = roleData.name;
		role[ NS.CS.Predicate.description ] = roleData.description;
		this.rolesService.saveAndRefresh( this.appContext, role ).then( ( [ updatedRole, [ saveResponse, refreshResponse ] ]:[ PersistedRole.Class, [ HTTP.Response.Class, HTTP.Response.Class ] ] ) => {
			return this.editRoleAgents( role, roleData.agents );
		} ).then( () => {
			return role.refresh();
		} ).then( () => {
			this.onSuccess.emit( this.role.id );
			this.cancelForm();
			this.displaySuccessMessage = true;
		} ).catch( ( error ) => {
			this.errorMessage = ErrorMessageGenerator.getErrorMessage( error );
			if( typeof error.name !== "undefined" ) this.errorMessage.title = error.name;
			this.onError.emit( true );
		} );
	}

	private createRole( role:PersistedRole.Class, roleData:RoleFormModel ):void {
		role.name = roleData.name;
		role[ NS.CS.Predicate.description ] = roleData.description;
		this.rolesService.create( this.appContext, this.parentRole, this.role, roleData.slug ).then( ( persistedRole:PersistedRole.Class ) => {
			return this.editRoleAgents( persistedRole, roleData.agents );
		} ).then( ( persistedRole:PersistedRole.Class ) => {
			this.onSuccess.emit( this.role.id );
			this.cancelForm();
			this.displaySuccessMessage = true;
		} ).catch( ( error ) => {
			this.errorMessage = ErrorMessageGenerator.getErrorMessage( error );
			if( typeof error.name !== "undefined" ) this.errorMessage.title = error.name;
			this.onError.emit( true );
		} );
	}

	private getAgents( role:PersistedRole.Class ):Promise<PersistedAgent.Class[]> {
		let promises:Promise<any>[] = [],
			agents:PersistedAgent.Class[] = [];
		if( typeof role.agents === "undefined" ) return Promise.resolve( agents );

		(<any>role.agents).forEach( ( agentPointer:Pointer.Class ) => {
			promises.push( agentPointer.resolve() );
		} );
		return Promise.all( promises ).then( ( resolvedAgents:[ PersistedAgent.Class, HTTP.Response.Class ][] ) => {
			resolvedAgents.forEach( ( [ resolvedAgent, response ]:[ PersistedAgent.Class, HTTP.Response.Class ] ) => {
				if( resolvedAgent.id.indexOf( this.appContext.getBaseURI() ) !== - 1 )
					agents.push( resolvedAgent );
			} );
			return agents;
		} );
	}

	private editRoleAgents( role:PersistedRole.Class, selectedAgents:PersistedAgent.Class[] ):Promise<any> {
		let promises:Promise<any>[] = [],
			removedAgents:PersistedAgent.Class[] = this.getRemovedAgents( selectedAgents );

		selectedAgents.forEach( ( agent:PersistedAgent.Class ) => {
			promises.push( this.registerAgentToRole( agent.id, role.id ) )
		} );
		removedAgents.forEach( ( agent:PersistedAgent.Class ) => {
			promises.push( this.removeAgentFromRole( agent.id, role.id ) )
		} );

		return Promise.all( promises ).catch( ( error ) => {
			let generatedMessage:Message = ErrorMessageGenerator.getErrorMessage( error ),
				finalError:Error = new Error( "The role details were saved but an error occurred while trying to persist the agents: " + generatedMessage.content );
			finalError.name = "Agent Saved";
			throw finalError;
		} );
	}

	private getRemovedAgents( selectedAgents:PersistedAgent.Class[] ):PersistedAgent.Class[] {
		return this.roleAgents.filter( ( roleAgent:PersistedAgent.Class ) => {
			return ! selectedAgents.some( ( selectedAgent:PersistedAgent.Class ) => selectedAgent.id === roleAgent.id );
		} ).map( ( removedAgent:PersistedAgent.Class ) => {
			return removedAgent
		} );
	}

	private registerAgentToRole( agentID:string, roleID:string ):Promise<HTTP.Response.Class> {
		return this.rolesService.registerAgent( this.appContext, agentID, roleID );
	}

	private removeAgentFromRole( agentID:string, roleID:string ):Promise<HTTP.Response.Class> {
		return this.rolesService.removeAgent( this.appContext, agentID, roleID );
	}

	private getSanitizedSlug( slug:string ):string {
		return DocumentExplorerLibrary.getSanitizedSlug( slug );
	}

	private slugLostFocus( evt:any ):void {
		evt.target.value = DocumentExplorerLibrary.getAppendedSlashSlug( evt.target.value );
	}

	private changeAgents( selectedAgents:PersistedAgent.Class[] ):void {
		this.roleFormModel.agents = selectedAgents;
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

	private closeError():void {
		this.errorMessage = null;
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
	agents:PersistedAgent.Class[];
}

export default RoleDetailsComponent;