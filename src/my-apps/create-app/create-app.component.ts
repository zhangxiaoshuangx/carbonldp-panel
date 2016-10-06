import { Component, OnInit } from "@angular/core";

import Carbon from "carbonldp/Carbon";
import * as CarbonApp from "carbonldp/App";
import * as HTTP from "carbonldp/HTTP";
import * as Pointer from "carbonldp/Pointer";
import * as Auth from "carbonldp/Auth";
import * as CS from "carbonldp/NS/CS";
import * as PersistedProtectedDocument from "carbonldp/PersistedProtectedDocument";
import * as PersistedDocument from "carbonldp/PersistedDocument";

import { AppContextService } from "./../app-context.service";
import { Message } from "./../../errors-area/error-message.component";


import "semantic-ui/semantic";

import template from "./create-app.component.html!";

@Component( {
	selector: "cp-create-app",
	template: template,
	styles: [ ":host { display: block; }" ],
} )
export class CreateAppComponent implements OnInit {
	carbon:Carbon;

	appContextService:AppContextService;

	submitting:boolean = false;
	displaySuccessMessage:boolean = false;
	displayWarningMessage:boolean = false;
	errorMessage:Message;

	_name:string = "";
	_slug:string = "";
	persistedSlug:string = "";
	persistedName:string = "";

	slugInput;
	// createAppForm:ControlGroup;
	// formBuilder:FormBuilder;
	// name:AbstractControl;
	// slug:AbstractControl;
	// description:AbstractControl;
	createAppFormModel:{name:string,slug:string,description:string} = {
		name: "",
		slug: "",
		description: ""
	}

	constructor( carbon:Carbon, appContextService:AppContextService ) {
		this.carbon = carbon;
		this.appContextService = appContextService;
	}

	ngOnInit():void {
		this.slugInput = $( "form > :input[name='slug']" );
	}


	slugLostControl( evt:any ):void {
		if( typeof (evt.target) !== "undefined" ) {
			if( ! evt.target.value.match( /^[a-z0-9]+(?:-[a-z0-9]*)*(?:\/*)$/ ) ) {
				this.getSanitizedSlug( evt );
			}
		}
	}

	getSanitizedSlug( evt:any ):void {
		let slug:string;
		if( typeof evt.target !== "undefined" ) {
			slug = evt.target.value;
			if( slug ) {
				slug = slug.toLowerCase().replace( / - | -|- /g, "-" ).replace( /[^-\w ]+/g, "" ).replace( / +/g, "-" );
				if( slug.charAt( slug.length - 1 ) !== "/" ) slug += "/";

				this.createAppFormModel.slug = slug;
			}
		}
	}

	onSubmit( form:any, $event:any ):void {
		$event.preventDefault();

		this.submitting = true;
		this.errorMessage = null;
		this.displaySuccessMessage = false;
		this.displayWarningMessage = false;

		if( ! form.valid ) {
			this.submitting = false;
			return;
		}

		let name:string = form.value.name;
		let slug:string = form.value.slug;
		let description:string = form.value.description;

		let appDocument:CarbonApp.Class = CarbonApp.Factory.create( name );
		appDocument.description = description;
		appDocument.allowsOrigins = [ Carbon.Pointer.Factory.create( Carbon.NS.CS.Class.AllOrigins ) ];
		this.createApp( slug, appDocument );
	}

	createApp( slug:string, appDocument:CarbonApp.Class ):Promise<Auth.PersistedACL.Class> {
		return this.carbon.apps.create( appDocument, slug ).then( ( [appPointer, appCreationResponse]:[ Pointer.Class, HTTP.Response.Class] ) => {
			this.submitting = false;
			this.persistedSlug = this._slug;
			this.persistedName = this._name;
			return this.carbon.apps.getContext( appPointer );
		} ).then( ( appContext:CarbonApp.Context ) => {
			this.persistedSlug = this.appContextService.getSlug( appContext );
			this.persistedName = appContext.app.name;
			let persistedAppDocument:PersistedProtectedDocument.Class = (<PersistedProtectedDocument.Class>(<PersistedDocument.Class>appContext.app));
			return persistedAppDocument.getACL();
		} ).then( ( [acl,response]:[ Auth.PersistedACL.Class, HTTP.Response.Class ] )=> {
			return this.grantAccess( acl );
		} ).catch( ( error:HTTP.Errors.Error ) => {
			console.error( error );
			if( error.response ) this.errorMessage = this.getHTTPErrorMessage( error, this.getErrorMessage( error ) );
			else {
				this.errorMessage = <Message>{
					title: error.name,
					content: JSON.stringify( error )
				};
			}
			this.submitting = false;
		} );
	}

	private grantAccess( acl:Auth.PersistedACL.Class ):Promise<Auth.PersistedACL.Class> {
		let subject:string = this.carbon.resolve( "roles/anonymous/" ),
			subjectClass:string = CS.namespace + "PlatformRole",
			permissions:string[] = [ CS.namespace + "Read" ];
		acl.grant( subject, subjectClass, permissions );
		return acl.saveAndRefresh().then( ()=> {
			this.displaySuccessMessage = true;
		} ).catch( ( error:HTTP.Errors.Error ) => {
			this.displayWarningMessage = true;
		} ).then( ()=> {
			return acl;
		} );
	}

	private getHTTPErrorMessage( error:HTTP.Errors.Error, content:string ):Message {
		return {
			title: error.name,
			content: content + (! ! error.message ? (" Reason: " + error.message) : ""),
			endpoint: (<any>error.response.request).responseURL,
			statusCode: "" + (<XMLHttpRequest>error.response.request).status + " - RequestID: " + error.requestID,
			statusMessage: (<XMLHttpRequest>error.response.request).statusText
		};
	}

	getErrorMessage( error:HTTP.Errors.Error ):string {
		let friendlyMessage:string = "";
		switch( true ) {
			case error instanceof HTTP.Errors.BadRequestError:
				friendlyMessage = "";
				break;
			case error instanceof HTTP.Errors.ConflictError:
				friendlyMessage = "There's already a resource with that slug. Error:" + error.response.status;
				break;
			case error instanceof HTTP.Errors.ForbiddenError:
				friendlyMessage = "Forbidden Action.";
				break;
			case error instanceof HTTP.Errors.NotFoundError:
				friendlyMessage = "Couldn't found the requested URL.";
				break;
			case error instanceof HTTP.Errors.RequestEntityTooLargeError:
				friendlyMessage = "Request entity too large.";
				break;
			case error instanceof HTTP.Errors.UnauthorizedError:
				friendlyMessage = "Unauthorized operation.";
				break;
			case error instanceof HTTP.Errors.InternalServerErrorError:
				friendlyMessage = "An error occurred while trying to create the app. Please try again later. Error: " + error.response.status;
				break;
			case error instanceof HTTP.Errors.ServiceUnavailableError:
				friendlyMessage = "Service currently unavailable.";
				break;
			case error instanceof HTTP.Errors.UnknownError:
				friendlyMessage = "An error occurred while trying to create the app. Please try again later. Error: " + error.response.status;
				break;
			default:
				friendlyMessage = "There was a problem processing the request. Error: " + error.response.status;
				break;
		}
		return friendlyMessage;
	}

	clearMessages( evt:Event ):void {
		this.displaySuccessMessage = false;
		this.displayWarningMessage = false;
		this.errorMessage = null;
	}
}

export default CreateAppComponent;
