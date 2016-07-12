import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, ControlGroup, AbstractControl, Validators } from "@angular/common";

import Carbon from "carbonldp/Carbon";
import * as HTTP from "carbonldp/HTTP";
import * as PersistedApp from "carbonldp/PersistedApp";

import * as App from "../app";
import { ErrorMessageComponent, Message } from "../../../errors-area/error-message.component";

import "semantic-ui/semantic";

import template from "./edit-app.component.html!";
import style from "./edit-app.component.css!text";

@Component( {
	selector: "cp-edit-app",
	template: template,
	styles: [ style ],
	directives: [ ErrorMessageComponent ],
} )

export class EditAppComponent implements OnInit {

	submitting:boolean = false;
	displaySuccessMessage:boolean = false;
	errorMessage:Message;

	editAppForm:ControlGroup;
	corsGroup:ControlGroup;
	formBuilder:FormBuilder;
	name:AbstractControl;
	description:AbstractControl;
	allDomains:AbstractControl;
	domain:AbstractControl;

	allowedDomains:string[] = [];
	domainStr:string = "";

	// Inputs and Outputs
	@Input() app:App.Class;


	constructor( formBuilder:FormBuilder ) {
		this.formBuilder = formBuilder;
	}

	ngOnInit():void {
		let allowAllOrigins:boolean = false;
		if( ! ! this.app.allowsOrigins && this.app.allowsOrigins.length > 0 ) {
			allowAllOrigins = this.app.allowsOrigins[ 0 ][ "id" ] === Carbon.NS.CS.Class.AllOrigins;
			if( ! allowAllOrigins )this.allowedDomains = <string[]>this.app.allowsOrigins;
		}

		this.editAppForm = this.formBuilder.group( {
			name: [ this.app.name, Validators.compose( [ Validators.required ] ) ],
			description: [ this.app.description, Validators.compose( [ Validators.required ] ) ],
			cors: this.formBuilder.group( {
				allDomains: [ allowAllOrigins ],
				domain: [ this.domainStr ],
				allowedDomains: [ this.allowedDomains ],
			}, { validator: Validators.compose( [ this.domainValidator, this.allowedDomainsValidator ] ) } ),
		} );
		this.name = this.editAppForm.controls[ "name" ];
		this.description = this.editAppForm.controls[ "description" ];
		this.corsGroup = <ControlGroup>this.editAppForm.controls[ "cors" ];
		this.allDomains = this.corsGroup.controls[ "allDomains" ];
		this.domain = this.corsGroup.controls[ "domain" ];
	}

	domainValidator( corsGroup:ControlGroup ):any {
		let allDomains:AbstractControl = corsGroup.controls[ "allDomains" ];
		let domain:AbstractControl = corsGroup.controls[ "domain" ];
		if( allDomains.value || (! allDomains.value && ! ! domain.value && ! ! domain.value.match( /^http(s?):\/\/((\w+\.)?\w+\.\w+|((2[0-5]{2}|1[0-9]{2}|[0-9]{1,2})\.){3}(2[0-5]{2}|1[0-9]{2}|[0-9]{1,2}))(\/)?$/gm ) ) ) {
			return null;
		}
		if( ! ! domain.value ) {
			return { "invalidURLAddress": true };
		}
	}

	allowedDomainsValidator( corsGroup:ControlGroup ):any {
		if( ! corsGroup.value[ "allDomains" ] && (<string[]>corsGroup.value[ "allowedDomains" ]).length <= 0 ) {
			return { "emptyAllowedAddresses": true };
		}
		return null;
	}

	addDomain( domain:string ):void {
		if( this.domain.valid && ! ! domain ) this.allowedDomains.push( domain );
		this.corsGroup.updateValueAndValidity();
	}

	removeDomain( option:string ):void {
		let idx:number = this.allowedDomains.indexOf( option );
		if( idx >= 0 ) {
			this.allowedDomains.splice( idx, 1 );
			this.corsGroup.updateValueAndValidity();
		}
	}

	canDisplayErrors():boolean {
		return (! this.name.pristine && ! this.name.valid) || (! this.description.pristine && ! this.description.valid);
	}

	onSubmit( data:{ name:string, description:string, cors:{allDomains:boolean, domain:string, allowedDomains:string[], } }, $event:Event ):void {
		$event.preventDefault();

		this.submitting = true;
		this.errorMessage = null;

		this.name.markAsDirty( true );
		this.description.markAsDirty( true );

		if( ! this.editAppForm.valid ) {
			this.submitting = false;
			return;
		}

		let name:string = data.name;
		let description:string = data.description;
		let allowsAllOrigin:any = data.cors.allDomains;
		let allowedDomains:string[] = data.cors.allowedDomains;

		if( name ) this.app.name = name;
		if( description ) this.app.description = description;
		if( allowsAllOrigin ) {
			this.app.allowsOrigins = [ Carbon.Pointer.Factory.create( Carbon.NS.CS.Class.AllOrigins ) ];
		} else {
			this.app.allowsOrigins = allowedDomains.length > 0 ? allowedDomains : this.app.allowsOrigins;
		}

		this.app.save().then( ( [updatedApp, response]:[PersistedApp.Class, HTTP.Response.Class] ):void => {
			this.app.refresh().catch( ( error:HTTP.Errors.Error ):void => this.setErrorMessage( error ) );
			this.displaySuccessMessage = true;
		} ).catch( ( error:HTTP.Errors.Error ):void => {
			this.errorMessage = {
				title: error.name,
				content: this.getErrorMessage( error ),
				statusCode: "" + error.response.status,
				statusMessage: (<XMLHttpRequest>error.response.request).statusText,
				endpoint: (<any>error.response.request).responseURL,
			};
		} ).then( ():void => {
			this.submitting = false;
		} );
	}

	getErrorMessage( error:HTTP.Errors.Error ):string {
		let tempMessage:string = "";
		switch ( true ) {
			case error instanceof HTTP.Errors.BadRequestError:
				tempMessage = "";
				break;
			case error instanceof HTTP.Errors.ConflictError:
				tempMessage = "There's already a resource with that slug. Error:" + error.response.status;
				break;
			case error instanceof HTTP.Errors.ForbiddenError:
				tempMessage = "Forbidden Action.";
				break;
			case error instanceof HTTP.Errors.NotFoundError:
				tempMessage = "Couldn't found the requested URL.";
				break;
			case error instanceof HTTP.Errors.RequestEntityTooLargeError:
				tempMessage = "Request entity too large.";
				break;
			case error instanceof HTTP.Errors.UnauthorizedError:
				tempMessage = "Unauthorized operation.";
				break;
			case error instanceof HTTP.Errors.InternalServerErrorError:
				tempMessage = "An internal error occurred while trying to update the app. Please try again later. Error: " + error.response.status;
				break;
			case error instanceof HTTP.Errors.ServiceUnavailableError:
				tempMessage = "Service currently unavailable.";
				break;
			case error instanceof HTTP.Errors.UnknownError:
				tempMessage = "An error occurred while trying to update the app. Please try again later. Error: " + error.response.status;
				break;
			default:
				tempMessage = "There was a problem processing the request. Error: " + error.response.status;
				break;
		}
		return tempMessage;
	}

	clearMessages( evt:Event ):void {
		this.displaySuccessMessage = false;
		this.errorMessage = null;
	}
}

export default EditAppComponent;
