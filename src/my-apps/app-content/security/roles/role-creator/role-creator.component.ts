import { Component, ElementRef, Input, AfterViewInit } from "@angular/core";

import * as App from "carbonldp/App";

import { RolesService } from "../roles.service";

import "semantic-ui/semantic";

import template from "./role-creator.component.html!";
import style from "./role-creator.component.css!text";

@Component( {
	selector: "cp-role-creator",
	template: template,
	styles: [ style ]
} )

export class RoleCreatorComponent implements AfterViewInit {

	private rolesService:RolesService;
	private element:ElementRef;
	private $element:JQuery;
	private $createRoleModal:JQuery;
	private canDisplayCreator:boolean = true;


	@Input() appContext:App.Context;
	@Input() parentRole:string;


	constructor( element:ElementRef, rolesService:RolesService ) {
		this.element = element;
		this.rolesService = rolesService;
	}

	ngAfterViewInit():void {
		this.$element = $( this.element.nativeElement );
		this.$createRoleModal = this.$element.find( ".create.role.modal" ).modal( { closable: false } );
	}

	public show():void {
		this.canDisplayCreator = true;
		this.$createRoleModal.modal( { observeChanges: true } ).modal( "show" );
	}

	public hide():void {
		this.$createRoleModal.modal( "hide" );
		this.canDisplayCreator = false;
	}

	public toggle():void {
		this.canDisplayCreator = ! this.canDisplayCreator;
		this.$createRoleModal.modal( "toggle" );
	}
}

export default RoleCreatorComponent;