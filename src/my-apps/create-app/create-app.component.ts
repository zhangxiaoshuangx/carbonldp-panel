import { Component, AfterViewInit, OnInit } from "@angular/core";
import { FormBuilder, ControlGroup, AbstractControl, Control, Validators } from "@angular/common";
import { ROUTER_DIRECTIVES } from "@angular/router-deprecated";

import Carbon from "carbonldp/Carbon";
import * as CarbonApp from "carbonldp/App";
import * as HTTP from "carbonldp/HTTP";
import * as Pointer from "carbonldp/Pointer";

import { AppContextService } from "./../app-context.service";
import { ErrorMessageComponent, Message } from "./../../errors-area/error-message.component";

import "semantic-ui/semantic";

import template from "./create-app.component.html!";

@Component( {
	selector: "cp-create-app",
	template: template,
	styles: [ ":host { display: block; }" ],
	directives: [ ROUTER_DIRECTIVES, ErrorMessageComponent ],
} )
export class CreateAppComponent implements AfterViewInit, OnInit {
	carbon:Carbon;

	appContextService:AppContextService;

	submitting:boolean = false;
	displaySuccessMessage:boolean = false;
	errorMessage:Message;

	_name:string = "";
	_slug:string = "";
	persistedSlug:string = "";
	persistedName:string = "";

	createAppForm:ControlGroup;
	formBuilder:FormBuilder;
	name:AbstractControl;
	slug:AbstractControl;
	description:AbstractControl;


	constructor( formBuilder:FormBuilder, carbon:Carbon, appContextService:AppContextService ) {
		this.formBuilder = formBuilder;
		this.carbon = carbon;
		this.appContextService = appContextService;
	}

	ngOnInit():void {
		this.createAppForm = this.formBuilder.group( {
			name: [ "", Validators.compose( [ Validators.required ] ) ],
			slug: [ "", Validators.compose( [ this.slugValidator ] ) ],
			description: [ "", Validators.compose( [ Validators.required ] ) ],
		} );
		this.name = this.createAppForm.controls[ "name" ];
		this.slug = this.createAppForm.controls[ "slug" ];
		this.description = this.createAppForm.controls[ "description" ];
	}

	ngAfterViewInit():void {
		this.name.valueChanges.subscribe(
			( value ):void => {
				if( value ) {
					this._slug = this.getSanitizedSlug( value );
					this.slug.updateValueAndValidity();
				}
			}
		);
	}

	slugLostControl( evt:any ):void {
		if( ! evt.target.value.match( /^[a-z0-9]+(?:-[a-z0-9]*)*(?:\/*)$/ ) ) {
			(<Control> this.slug).updateValue( this.getSanitizedSlug( evt.target.value ) );
			this._slug = this.slug.value;
		}
	}

	getSanitizedSlug( slug:string ):string {
		if( slug ) {
			slug = slug.toLowerCase().replace( /[^\w ]+/g, "" ).replace( / +/g, "-" );
			if( slug.charAt( slug.length - 1 ) !== "/" ) slug += "/";
		}
		return slug;
	}

	canDisplayErrors():boolean {
		return (! this.name.pristine && ! this.name.valid) || (! this.slug.pristine && ! this.slug.valid) || (! this.description.pristine && ! this.description.valid);
	}

	onSubmit( data:{ name:string, slug:string, description:string }, $event:any ):void {
		$event.preventDefault();

		this.submitting = true;
		this.errorMessage = null;
		this.displaySuccessMessage = false;

		this.name.markAsDirty( true );
		this.slug.markAsDirty( true );
		this.description.markAsDirty( true );

		if( ! this.createAppForm.valid ) {
			this.submitting = false;
			return;
		}

		let name:string = data.name;
		let slug:string = data.slug;
		let description:string = data.description;

		let appDocument:CarbonApp.Class = CarbonApp.Factory.create( name );
		appDocument.description = description;
		this.createApp( slug, appDocument );
	}

	createApp( slug:string, appDocument:CarbonApp.Class ):Promise<[ Pointer.Class, HTTP.Response.Class]> {
		return this.carbon.apps.create( appDocument, slug ).then( ( [appPointer, appCreationResponse]:[ Pointer.Class, HTTP.Response.Class] ) => {
			this.submitting = false;
			this.persistedSlug = this._slug;
			this.persistedName = this._name;
			return this.carbon.apps.getContext( appPointer );
		} ).then( ( appContext:CarbonApp.Context ):void => {
			this.persistedSlug = this.appContextService.getSlug( appContext );
			this.persistedName = appContext.app.name;
			this.displaySuccessMessage = true;
		} ).catch( ( error:HTTP.Errors.Error ) => {
			this.errorMessage = {
				title: error.name,
				content: this.getErrorMessage( error ),
				statusCode: "" + error.response.status,
				statusMessage: (<XMLHttpRequest>error.response.request).statusText,
				endpoint: (<any>error.response.request).responseURL,
			};
			this.submitting = false;
		} );
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


	slugValidator( slug:Control ):any {
		if( ! slug.value ) return null;
		if( slug.value.match( /^[a-z0-9]+(?:-[a-z0-9]*)*(?:\/*)$/ ) ) {
			return null;
		}
		return { "invalidSlug": true };
	}

	clearMessages( evt:Event ):void {
		this.displaySuccessMessage = false;
		this.errorMessage = null;
	}
}

export default CreateAppComponent;
