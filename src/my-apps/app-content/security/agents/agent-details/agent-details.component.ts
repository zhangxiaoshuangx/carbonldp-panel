import { ElementRef, Component, Input, Output, EventEmitter, AfterViewInit, OnChanges, SimpleChanges, SimpleChange } from "@angular/core";

import * as App from "carbonldp/App";
import * as Agent from "carbonldp/Auth/Agent";
import * as PersistedRole from "carbonldp/Auth/PersistedRole";
import * as PersistedAgent from "carbonldp/Auth/PersistedAgent";
import * as HTTP from "carbonldp/HTTP";
import * as RDF from "carbonldp/RDF";

import { AgentsService } from "carbonldp-panel/my-apps/app-content/security/agents/agents.service";
import { RolesService } from "carbonldp-panel/my-apps/app-content/security/roles/roles.service";
import { DocumentExplorerLibrary } from "carbonldp-panel/document-explorer/document-explorer-library";
import { Message } from "carbonldp-panel/errors-area/error-message.component";
import { ErrorMessageGenerator } from "carbonldp-panel/errors-area/error-message-generator";

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
	private errorMessage:Message;

	private agentsService:AgentsService;
	private rolesService:RolesService;

	@Input() mode:string = Modes.READ;
	@Input() agent:PersistedAgent.Class;
	@Input() appContext:App.Context;

	@Output() onClose:EventEmitter<boolean> = new EventEmitter<boolean>();

	private agentFormModel:AgentFormModel = {
		slug: "",
		name: "",
		email: "",
		roles: [],
		password: "",
		repeatPassword: "",
		enabled: false,
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
		this.$element.find( ".enabled.checkbox" ).checkbox();
	}

	ngOnChanges( changes:SimpleChanges ):void {
		if( ! ! changes[ "agent" ] && changes[ "agent" ].currentValue !== changes[ "agent" ].previousValue ) {
			if( this.mode === Modes.CREATE && ! this.agent ) {
				this.agent = <Agent.Class & PersistedAgent.Class>Agent.Factory.create( "New Agent Name", "new-agent@mail.com", "password" );
			}
			this.changeAgent( this.agent );
		}
	}

	private changeAgent( newAgent:PersistedAgent.Class ):void {
		this.agent = newAgent;
		let agentSlug:string = RDF.URI.Util.getSlug( this.agent.id );
		if( this.mode === Modes.CREATE ) {
			agentSlug = "new-agent-name";
		}

		this.agentFormModel.slug = this.getSanitizedSlug( agentSlug );
		this.agentFormModel.name = this.agent.name;
		this.agentFormModel.email = this.agent.email;
		this.agentFormModel.roles = [];
		this.agentFormModel.password = this.mode === Modes.CREATE ? "" : this.agent.password;
		this.agentFormModel.repeatPassword = this.mode === Modes.CREATE ? "" : this.agent.password;
		this.agentFormModel.enabled = this.mode === Modes.CREATE ? true : this.agent.enabled;
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
		if( ! agent ) return this.rolesService.getAll( this.appContext );
		return this.rolesService.getAll( this.appContext ).then( ( appRoles:PersistedRole.Class[] ) => {
			return appRoles.filter( ( role:any ) => {
				return ! role.agents ? false : role.agents.some( ( listedAgent:Agent.Class ) => {return listedAgent.id === agent.id } );
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
		if( this.mode === Modes.CREATE ) {
			this.close();
		} else {
			this.mode = Modes.READ;
		}
	}

	private onSubmit( data:AgentFormModel, $event:any ):void {
		$event.preventDefault();
		switch( this.mode ) {
			case Modes.EDIT:
				this.editAgent( this.agent, data );
				break;
			case Modes.CREATE:
				this.createAgent( this.agent, data );
				break;
		}
	}

	private editAgent( agent:PersistedAgent.Class, agentData:AgentFormModel ):void {
		agent.email = agentData.email;
		agent.name = agentData.name;
		agent.password = agentData.password;
		agent.enabled = agentData.enabled;
		this.agentsService.saveAndRefreshAgent( this.appContext, agent ).then( ( [updatedAgent, [saveResponse, refreshResponse]]:[PersistedAgent.Class, [HTTP.Response.Class,HTTP.Response.Class]] ) => {
			return this.editAgentRoles( agent, agentData.roles );
		} ).then( () => {
			console.log( "Modified Agent: Roles edited successfully!" );
		} ).catch( ( error ) => {
			this.errorMessage = ErrorMessageGenerator.getErrorMessage( error );
		} );
	}

	private createAgent( agent:PersistedAgent.Class, agentData:AgentFormModel ):void {
		agent.email = agentData.email;
		agent.name = agentData.name;
		agent.password = agentData.password;
		agent.enabled = agentData.enabled;
		this.agentsService.createAgent( this.appContext, <any>agent, agentData.slug ).then( ( [updatedAgent, [saveResponse, refreshResponse]]:[PersistedAgent.Class, [HTTP.Response.Class,HTTP.Response.Class]] ) => {
			return this.editAgentRoles( agent, agentData.roles );
		} ).then( () => {
			console.log( "Created Agent: Roles edited successfully!" );
		} ).catch( ( error ) => {
			this.errorMessage = ErrorMessageGenerator.getErrorMessage( error );
		} );
	}

	private getSanitizedSlug( slug:string ):string {
		return DocumentExplorerLibrary.getSanitizedSlug( slug );
	}

	private slugLostFocus( evt:any ):void {
		evt.target.value = DocumentExplorerLibrary.getAppendedSlashSlug( evt.target.value );
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
		} ).catch( ( error ) => {
			this.errorMessage = ErrorMessageGenerator.getErrorMessage( error );
			this.errorMessage.title = "Agent Saved";
			this.errorMessage.content = "The agent was saved but an error occurred while trying to persist its roles: " + this.errorMessage.content;
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

export interface AgentFormModel {
	slug:string
	name:string,
	email:string,
	roles:string[],
	password:string,
	repeatPassword:string,
	enabled:boolean,
}

export default AgentDetailsComponent;