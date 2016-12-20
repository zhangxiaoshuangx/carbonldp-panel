import { ElementRef, Component, Input, Output, AfterViewInit, EventEmitter } from "@angular/core";

import * as App from "carbonldp/App";
import * as PersistedRole from "carbonldp/Auth/PersistedRole";

import { RolesService } from "../roles.service";

import template from "./roles-chooser.component.html!";
import style from "./roles-chooser.component.css!text";

@Component( {
	selector: "cp-roles-chooser",
	template: template,
	styles: [ style ],
} )

export class RolesChooserComponent implements AfterViewInit {

	private element:ElementRef;
	private $element:JQuery;
	private rolesService:RolesService;
	private availableRoles:PersistedRole.Class[] = [];

	private _selectedRoles:PersistedRole.Class[] = [];
	@Input() set selectedRoles( value:PersistedRole.Class[] ) {
		let selectedRoles:PersistedRole.Class[] = [];
		value.forEach( ( selectedRole:PersistedRole.Class ) => {
			selectedRoles.push( selectedRole );
		} );
		this._selectedRoles = selectedRoles;
	}

	get selectedRoles():PersistedRole.Class[] {
		return this._selectedRoles;
	}

	@Input() appContext:App.Context;
	@Input() bordered:boolean = true;

	@Output() onChangeSelection:EventEmitter<PersistedRole.Class[]> = new EventEmitter<PersistedRole.Class[]>();

	constructor( element:ElementRef, rolesService:RolesService ) {
		this.element = element;
		this.$element = $( element.nativeElement );
		this.rolesService = rolesService;
	}

	ngAfterViewInit():void {
		this.rolesService.getAll( this.appContext ).then( ( roles:PersistedRole.Class[] ) => {
			this.availableRoles = roles;
		} ).then( () => {
			setTimeout( () => { this.$element.find( ".ui.checkbox" ).checkbox(); } );
		} );
	}

	private hasRole( role:string, list:PersistedRole.Class[] ):boolean {
		return list.findIndex( ( persistedRole:PersistedRole.Class ) => { return role === persistedRole.id } ) !== - 1;
	}

	private onClickRole( role:PersistedRole.Class, evt:Event ):void {
		evt.stopPropagation();
		this.selectRole( role );
	}

	private selectRole( role:PersistedRole.Class ):void {
		let idx:number = this.selectedRoles.findIndex( ( persistedRole:PersistedRole.Class ) => { return role.id === persistedRole.id } );
		if( idx === - 1 )
			this.selectedRoles.push( role );
		else
			this.selectedRoles.splice( idx, 1 );
		this.onChangeSelection.emit( this.selectedRoles );
	}
}

export default RolesChooserComponent;