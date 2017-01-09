import { Component, ElementRef, Input, Output, EventEmitter, AfterViewInit } from "@angular/core";

import * as App from "carbonldp/App";
import * as PersistedRole from "carbonldp/App/PersistedRole";
import { Error as HTTPError } from "carbonldp/HTTP/Errors";

import { Message } from "carbonldp-panel/errors-area/error-message.component";
import { ErrorMessageGenerator } from "carbonldp-panel/errors-area/error-message-generator";
import { RolesService } from "../roles.service";

import "semantic-ui/semantic";

import template from "./role-deleter.component.html!";
import style from "./role-deleter.component.css!text";

@Component( {
	selector: "cp-role-deleter",
	template: template,
	styles: [ style ],
} )

export class RoleDeleterComponent implements AfterViewInit {

	private element:ElementRef;
	private $element:JQuery;
	private rolesService:RolesService;

	private $deleteRoleModal:JQuery;
	private errorMessage:Message;
	private deletingRole:boolean = false;

	@Input() appContext:App.Context;
	@Input() role:string;
	@Output() onSuccess:EventEmitter<string> = new EventEmitter<string>();
	@Output() onError:EventEmitter<any> = new EventEmitter<any>();


	constructor( element:ElementRef, rolesService:RolesService ) {
		this.element = element;
		this.rolesService = rolesService;
	}

	ngAfterViewInit():void {
		this.$element = $( this.element.nativeElement );
		this.$deleteRoleModal = this.$element.find( ".delete.role.modal" ).modal( {
			closable: false,
			blurring: true,
			onApprove: ():boolean => { return false; },
		} );
	}

	private onSubmitDeleteRole():void {
		this.deletingRole = true;
		this.rolesService.delete( this.appContext, this.role ).then( ( result ) => {
			this.onSuccess.emit( this.role );
			this.hide();
		} ).catch( ( error:HTTPError ) => {
			this.onError.emit( error );
			this.errorMessage = ErrorMessageGenerator.getErrorMessage( error );
		} ).then( () => {
			this.deletingRole = false;
		} );
	}

	private clearErrorMessage():void {
		this.errorMessage = null;
	}

	public show():void {
		this.$deleteRoleModal.modal( "show" );
	}

	public hide():void {
		this.hideDeleteRoleForm();
	}

	private hideDeleteRoleForm():void {
		this.$deleteRoleModal.modal( "hide" );
		this.clearErrorMessage();
	}

	public toggle():void {
		this.$deleteRoleModal.modal( "toggle" );
	}

}

export default RoleDeleterComponent;