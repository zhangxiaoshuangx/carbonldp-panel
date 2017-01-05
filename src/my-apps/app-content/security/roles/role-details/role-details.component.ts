import { Component, Input, Output, ElementRef, SimpleChange, EventEmitter } from "@angular/core"

import * as App from "carbonldp/App";
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
	private availableRoles:PersistedRole.Class[] = [];
	private activeTab:string = "details";
	private roleAgents:PersistedAgent.Class[] = [];


	@Input() embedded:boolean = true;
	@Input() mode:string = Modes.READ;
	@Input() role:PersistedRole.Class;
	@Input() appContext:App.Context;

	@Output() onClose:EventEmitter<boolean> = new EventEmitter<boolean>();
	@Output() onSuccess:EventEmitter<boolean> = new EventEmitter<boolean>();
	@Output() onError:EventEmitter<boolean> = new EventEmitter<boolean>();


	constructor( element:ElementRef, rolesService:RolesService ) {
		this.element = element;
		this.$element = $( this.element.nativeElement );
		this.rolesService = rolesService;
	}

	ngAfterViewInit():void {
		this.initializeTabs();
	}

	initializeTabs():void {
		this.$element.find( ">div.menu.tabs > .item" ).tab( {
			onVisible: ( activeTab ) => { this.activeTab = activeTab; }
		} );
	}

	ngOnChanges( changes:{ [propName:string]:SimpleChange } ):void {
		if( changes[ "role" ] && ! ! changes[ "role" ].currentValue && changes[ "role" ].currentValue !== changes[ "role" ].previousValue ) {
			console.log( this.role );
			this.changeRole( this.role );
		}
	}

	private changeRole( role:PersistedRole.Class ):void {
		this.mode = Modes.READ;
		this.roleFormModel.slug = this.getSanitizedSlug( role.id );
		this.roleFormModel.name = role.name;
		this.roleFormModel.description = role[ NS.CS.Predicate.description ];
		this.getAgents( this.role ).then( ( agents ) => {
			this.roleAgents = [];
			this.roleAgents = agents;
			this.roleFormModel.agents = agents;
		} );
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

	private getAgents( role:PersistedRole.Class ):Promise<PersistedAgent.Class[]> {
		let promises:Promise<any>[] = [],
			agents:PersistedAgent.Class[] = [];
		if( typeof this.role.agents === "undefined" ) return Promise.resolve( agents );

		(<any>this.role.agents).forEach( ( agentPointer:Pointer.Class ) => {
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

	private changeAgents( selectedAgents:PersistedAgent.Class[] ):void {
		console.log( selectedAgents );
		this.roleFormModel.agents = selectedAgents;
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