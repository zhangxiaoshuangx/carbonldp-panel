import { Component, ElementRef, Input, Output, EventEmitter, AfterViewInit } from "@angular/core";

import * as SDKContext from "carbonldp/SDKContext";
import * as HTTP from "carbonldp/HTTP";
import * as PersistedDocument from "carbonldp/PersistedDocument";
import * as AccessPoint from "carbonldp/AccessPoint";
import { Error as HTTPError } from "carbonldp/HTTP/Errors";

import { DocumentsResolverService } from "../documents-resolver.service"
import { Message } from "carbonldp-panel/errors-area/error-message.component";
import { DocumentExplorerLibrary } from "carbonldp-panel/document-explorer/document-explorer-library";
import { ErrorMessageGenerator } from "carbonldp-panel/errors-area/error-message-generator";

import "semantic-ui/semantic";

import template from "./create-access-point-modal.component.html!";

@Component( {
	selector: "cp-create-access-point-modal",
	template: template,
} )

export class CreateAccessPointModalComponent implements AfterViewInit {

	private element:ElementRef;
	private $element:JQuery;

	private $createAccessPointModal:JQuery;

	private documentsResolverService:DocumentsResolverService;
	private errorMessage:Message;

	private createAccessPointFormModel:{ slug:string, hasMemberRelation:string, isMemberOfRelation:string } = {
		slug: "",
		hasMemberRelation: "http://www.w3.org/ns/ldp#member",
		isMemberOfRelation: ""
	};
	@Input() context:SDKContext.Class;
	@Input() parentURI:string = "";
	@Output() onSuccess:EventEmitter<any> = new EventEmitter<any>();
	@Output() onError:EventEmitter<any> = new EventEmitter<any>();


	constructor( element:ElementRef, documentsResolverService:DocumentsResolverService ) {
		this.element = element;
		this.documentsResolverService = documentsResolverService;
	}

	ngAfterViewInit():void {
		this.$element = $( this.element.nativeElement );
		this.$createAccessPointModal = this.$element.find( ".create.accesspoint.modal" ).modal( { closable: false } );
	}

	private onSubmitAccessPoint( data:{ slug:string, hasMemberRelation:string, isMemberOfRelation:string }, $event:any ):void {
		$event.preventDefault();
		let slug:string = data.slug;
		let accessPoint:AccessPoint.Class = {
			hasMemberRelation: data.hasMemberRelation
		};
		if( ! ! data.isMemberOfRelation ) accessPoint.isMemberOfRelation = data.isMemberOfRelation;

		this.context.documents.get( this.parentURI ).then( ( [document, response]:[PersistedDocument.Class, HTTP.Response.Class] )=> {
			return this.documentsResolverService.createAccessPoint( document, accessPoint, slug );
		} ).then( ( document:PersistedDocument.Class )=> {
			this.onSuccess.emit( document );
			this.hide();
		} ).catch( ( error:HTTPError )=> {
			this.onError.emit( error );
			this.errorMessage = ErrorMessageGenerator.getErrorMessage( error );
		} );
	}

	private clearErrorMessage():void {
		this.errorMessage = null;
	}

	private getSanitizedSlug( slug:string ):string {
		return DocumentExplorerLibrary.getSanitizedSlug( slug );
	}

	private slugLostFocus( evt:any ):void {
		evt.target.value = DocumentExplorerLibrary.getAppendedSlashSlug( evt.target.value );
	}

	public show():void {
		this.$createAccessPointModal.modal( "show" );
	}

	public hide():void {
		this.hideCreateAccessPointForm();
	}

	private hideCreateAccessPointForm():void {
		this.$createAccessPointModal.modal( "hide" );
		this.clearErrorMessage();
		this.createAccessPointFormModel.slug = "";
		this.createAccessPointFormModel.hasMemberRelation = "http://www.w3.org/ns/ldp#member";
		this.createAccessPointFormModel.isMemberOfRelation = "";
	}

	public toggle():void {
		this.$createAccessPointModal.modal( "toggle" );
	}

}

export default CreateAccessPointModalComponent;