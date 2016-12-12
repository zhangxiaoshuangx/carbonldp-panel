import { Component, Input } from "@angular/core"

import * as App from "carbonldp/App";
import * as Agent from "carbonldp/Auth/Agent";
import * as PersistedRole from "carbonldp/Auth/PersistedRole";
import * as PersistedAgent from "carbonldp/Auth/PersistedAgent";
import * as HTTP from "carbonldp/HTTP";
import * as RDF from "carbonldp/RDF";


import { DocumentExplorerLibrary } from "carbonldp-panel/document-explorer/document-explorer-library";

import template from "./role-details.component.html!";


@Component( {
	selector: "cp-role-details",
	template: template
} )

export class RoleDetailsComponent {

	private Modes:Modes = Modes;
	private roleFormModel:RoleFormModel = {
		slug: "",
		name: "",
		description: "",
	};

	@Input() mode:string = Modes.READ;
	@Input() role:PersistedRole.Class;
	@Input() appContext:App.Context;

	constructor() {}

	private changeMode( mode:string ) {
		this.mode = mode;
	}

	private onSubmit( data:RoleFormModel, $event:any ):void {
		$event.preventDefault();
		console.log( data );
		// switch( this.mode ) {
		// 	case Modes.EDIT:
		// 		this.editAgent( this.agent, data );
		// 		break;
		// 	case Modes.CREATE:
		// 		this.createAgent( this.agent, data );
		// 		break;
		// }
	}

	private getSanitizedSlug( slug:string ):string {
		return DocumentExplorerLibrary.getSanitizedSlug( slug );
	}

	private slugLostFocus( evt:any ):void {
		evt.target.value = DocumentExplorerLibrary.getAppendedSlashSlug( evt.target.value );
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
}

export default RoleDetailsComponent;