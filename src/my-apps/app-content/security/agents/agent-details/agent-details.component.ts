import { ElementRef, Component, Input, AfterViewInit, OnChanges, SimpleChanges, SimpleChange } from "@angular/core";

import * as App from "carbonldp/App";
import * as Agent from "carbonldp/Auth/Agent";
import * as PersistedRole from "carbonldp/Auth/PersistedRole";
import * as PersistedAgent from "carbonldp/Auth/PersistedAgent";

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
	// private availableRoles:PersistedRole.Class[] = [];
	private agentRoles:PersistedRole.Class[] = [];
	private rolesService:RolesService;
	private mode:string = Modes.EDITING;

	@Input() agent:Agent.Class;
	@Input() appContext:App.Context;

	private agentFormModel:{name:string, email:string, roles:string[]} = {
		name: "",
		email: "",
		roles: []
	};

	constructor( element:ElementRef, rolesService:RolesService ) {
		this.element = element;
		this.$element = $( element.nativeElement );
		this.rolesService = rolesService;
	}

	ngAfterViewInit():void {
	}

	ngOnChanges( changes:SimpleChanges ):void {
		if( ! ! changes[ "agent" ] && changes[ "agent" ].currentValue !== changes[ "agent" ].previousValue ) {
			this.changeAgent( changes[ "agent" ].currentValue );
		}
	}

	private changeAgent( newAgent:Agent.Class ):void {
		this.agent = newAgent;
		this.agentFormModel.name = this.agent.name;
		this.agentFormModel.email = this.agent.email;
		this.agentFormModel.roles = [];
		this.agentRoles = [];
		this.getRoles( this.agent ).then( ( roles:PersistedRole.Class[] ) => {
			roles.forEach( ( role:PersistedRole.Class ) => {
				this.agentRoles.push( role );
				this.agentFormModel.roles.push( role.id );
			} );
		} );
	}

	private getRoles():Promise<PersistedRole.Class[]>;
	private getRoles( agent?:Agent.Class ):Promise<PersistedRole.Class[]>;
	private getRoles( agent?:any ):Promise<PersistedRole.Class[]> {
		if( typeof agent !== "undefined" ) {
			return this.rolesService.getAll( this.appContext ).then( ( appRoles:PersistedRole.Class[] ) => {
				return appRoles.filter( ( role:any ) => {
					return role.agents.findIndex( ( listedAgent:Agent.Class ) => {return listedAgent.id === agent.id} ) !== - 1;
				} );
			} );
		}
		return this.rolesService.getAll( this.appContext );
	}

	private changeMode( mode:string ) {
		this.mode = mode;
	}

	private changeRoles( roles:PersistedRole.Class[] ):void {
		this.agentFormModel.roles = [];
		roles.forEach( ( role:PersistedRole.Class ) => {
			this.agentFormModel.roles.push( role.id );
		} );
	}

	private cancelForm():void {
		this.changeAgent( this.agent );
		this.mode = Modes.READING;
	}

	private onSubmit( data:{name:string, email:string, roles:string[]}, $event:any ):void {
		$event.preventDefault();
		console.log( data );
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
}

export default AgentDetailsComponent;

export class Modes {
	static READING:string = "READING";
	static EDITING:string = "EDITING";
	static CREATING:string = "CREATING";
}