import { ElementRef, Component, Input, AfterViewInit, OnChanges, SimpleChanges, SimpleChange } from "@angular/core";

import * as App from "carbonldp/App";
import * as Agent from "carbonldp/Auth/Agent";
import * as PersistedRole from "carbonldp/Auth/PersistedRole";
import * as PersistedAgent from "carbonldp/Auth/PersistedAgent";
import * as HTTP from "carbonldp/HTTP";

import { AgentsService } from "carbonldp-panel/my-apps/app-content/security/agents/agents.service";
import { RolesService } from "carbonldp-panel/my-apps/app-content/security/roles/roles.service";

import template from "./agent-details.component.html!";
import style from "./agent-details.component.css!text";

@Component( {
	selector: "cp-agent-details",
	template: template,
	styles: [ style ],
} )

export class AgentDetailsComponent implements OnChanges {

	private element:ElementRef;
	private $element:JQuery;

	private Modes:Modes = Modes;
	private agentRoles:PersistedRole.Class[] = [];
	private availableRoles:string[] = [];
	private agentsService:AgentsService;
	private rolesService:RolesService;
	private mode:string = Modes.EDIT;

	@Input() agent:PersistedAgent.Class;
	@Input() appContext:App.Context;

	private agentFormModel:AgentFormModel = {
		name: "",
		email: "",
		roles: []
	};

	constructor( element:ElementRef, agentsService:AgentsService, rolesService:RolesService ) {
		this.element = element;
		this.$element = $( element.nativeElement );
		this.agentsService = agentsService;
		this.rolesService = rolesService;
	}

	ngAfterViewInit():void {
		this.getRoles( this.agent ).then( ( roles:PersistedRole.Class[] ) => {
			roles.forEach( ( role:PersistedRole.Class ) => {
				this.availableRoles.push( role.id );
			} );
		} );
	}

	ngOnChanges( changes:SimpleChanges ):void {
		if( ! ! changes[ "agent" ] && changes[ "agent" ].currentValue !== changes[ "agent" ].previousValue ) {
			this.changeAgent( changes[ "agent" ].currentValue );
		}
	}

	private changeAgent( newAgent:PersistedAgent.Class ):void {
		this.agent = newAgent;
		this.agentFormModel.name = this.agent.name;
		this.agentFormModel.email = this.agent.email;
		this.agentFormModel.roles = [];
		this.agentRoles = [];
		this.getRoles( this.agent ).then( ( roles:PersistedRole.Class[] ) => {
			roles.forEach( ( role:PersistedRole.Class ) => {
				this.agentFormModel.roles.push( role.id );
			} );
			this.agentRoles = roles;
		} );
	}

	private getRoles():Promise<PersistedRole.Class[]>;
	private getRoles( agent?:PersistedAgent.Class ):Promise<PersistedRole.Class[]>;
	private getRoles( agent?:any ):Promise<PersistedRole.Class[]> {
		if( typeof agent === "undefined" ) return this.rolesService.getAll( this.appContext );
		return this.rolesService.getAll( this.appContext ).then( ( appRoles:PersistedRole.Class[] ) => {
			return appRoles.filter( ( role:any ) => {
				if( typeof role.agents == "undefined" ) return [];
				return role.agents.findIndex( ( listedAgent:Agent.Class ) => {return listedAgent.id === agent.id} ) !== - 1;
			} );
		} );
	}

	private changeMode( mode:string ) {
		this.mode = mode;
	}

	private changeRoles( selectedRoles:PersistedRole.Class[] ):void {
		this.agentFormModel.roles = [];
		selectedRoles.forEach( ( selectedRole:PersistedRole.Class ) => {
			this.agentFormModel.roles.push( selectedRole.id );
		} );
	}

	private cancelForm():void {
		this.changeAgent( this.agent );
		this.mode = Modes.READ;
	}

	private onSubmit( data:AgentFormModel, $event:any ):void {
		$event.preventDefault();
		console.log( data );
		switch( this.mode ) {
			case Modes.EDIT:
				this.editAgent( <PersistedAgent.Class>this.agent, data );
				break;
		}
		// let childSlug:string = null;
		// if( ! ! data.slug )
		// 	childSlug = data.slug + ((data.slug.endsWith( "/" ) && data.slug.trim() !== "" ) ? "/" : "");
		// let childContent:any = {
		// 	hasMemberRelation: data.advancedOptions.hasMemberRelation
		// };
		// if( ! ! data.advancedOptions.isMemberOfRelation ) childContent[ "isMemberOfRelation" ] = data.advancedOptions.isMemberOfRelation;
		// this.documentsResolverService.createChild( this.context, this.parentURI, childContent, childSlug ).then( ( createdChild:PersistedDocument.Class ) => {
		// 	this.onSuccess.emit( createdChild );
		// 	this.hide();
		// } ).catch( ( error:HTTPError )=> {
		// 	this.onError.emit( error );
		// 	this.errorMessage = ErrorMessageGenerator.getErrorMessage( error );
		// } );
	}

	private editAgent( agent:PersistedAgent.Class, agentData:AgentFormModel ):void {
		agent.email = agentData.email;
		agent.name = agentData.name;
		this.agentsService.saveAndRefreshAgent( this.appContext, agent ).then( ( [updatedAgent, [saveResponse, refreshResponse]]:[PersistedAgent.Class, [HTTP.Response.Class,HTTP.Response.Class]] ) => {
			return this.editAgentRoles( agent, agentData.roles );
		} ).then( () => {
			console.log( "Roles edited successfully!" );
		} ).catch( ( error ) => {
			console.error( error );
		} );
	}

	private editAgentRoles( agent:PersistedAgent.Class, selectedRoles:string[] ):void {
		let removedRoles:string[] = this.getRemovedRoles( selectedRoles ),
			promises:Promise<any>[] = [];

		selectedRoles.forEach( ( roleID:string, idx:number, roles:string[] ) => {
			promises.push( this.registerAgentToRole( agent.id, roleID ) )
		} );
		removedRoles.forEach( ( roleID:string, idx:number, roles:string[] ) => {
			promises.push( this.removeAgentFromRole( agent.id, roleID ) )
		} );

		Promise.all( promises ).then( ( values ) => {
			console.log( values );
		} );
	}

	private getRemovedRoles( selectedRoles:string[] ):string[] {
		return this.agentRoles.filter( ( agentRole:PersistedRole.Class ) => {
			return ! selectedRoles.some( ( selectedRole:string ) => {
				return selectedRole === agentRole.id;
			} );
		} ).map( ( removedRole:PersistedRole.Class ) => {
			return removedRole.id
		} );
	}

	private registerAgentToRole( agentID:string, roleID:string ):Promise<HTTP.Response.Class> {
		return this.rolesService.registerAgent( this.appContext, agentID, roleID );
	}

	private removeAgentFromRole( agentID:string, roleID:string ):Promise<HTTP.Response.Class> {
		return this.rolesService.removeAgent( this.appContext, agentID, roleID );
	}
}

export class Modes {
	static READ:string = "READ";
	static EDIT:string = "EDIT";
	static CREATE:string = "CREATE";
}

export interface AgentFormModel {
	name:string,
	email:string,
	roles:string[]
}

export default AgentDetailsComponent;