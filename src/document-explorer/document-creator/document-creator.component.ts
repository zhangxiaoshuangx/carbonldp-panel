import { Component, ElementRef, Input, Output, EventEmitter, AfterViewInit } from "@angular/core";

import * as SDKContext from "carbonldp/SDKContext";
import * as PersistedDocument from "carbonldp/PersistedDocument";
import { Error as HTTPError } from "carbonldp/HTTP/Errors";

import { DocumentsResolverService } from "../documents-resolver.service"
import { Message } from "carbonldp-panel/errors-area/error-message.component";
import { DocumentExplorerLibrary } from "carbonldp-panel/document-explorer/document-explorer-library";
import { ErrorMessageGenerator } from "carbonldp-panel/errors-area/error-message-generator";

import "semantic-ui/semantic";

import template from "./document-creator.component.html!";

@Component( {
	selector: "cp-document-creator",
	template: template,
} )

export class DocumentCreatorComponent implements AfterViewInit {

	private element:ElementRef;
	private $element:JQuery;

	$createDocumentModal:JQuery;

	private documentsResolverService:DocumentsResolverService;
	private errorMessage:Message;

	createChildFormModel:{ slug:string, advancedOptions:{hasMemberRelation:string, isMemberOfRelation:string }} = {
		slug: "",
		advancedOptions: {
			hasMemberRelation: "http://www.w3.org/ns/ldp#member",
			isMemberOfRelation: ""
		}
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
		this.$createDocumentModal = this.$element.find( ".create.document.modal" ).modal( { closable: false } );
		this.$createDocumentModal.find( ".advancedoptions.accordion" ).accordion();
	}

	private onSubmitCreateChild( data:{ slug:string, advancedOptions:{hasMemberRelation:string, isMemberOfRelation:string }}, $event:any ):void {
		$event.preventDefault();
		let childSlug:string = null;
		if( ! ! data.slug )
			childSlug = data.slug + ((data.slug.endsWith( "/" ) && data.slug.trim() !== "" ) ? "/" : "");
		let childContent:any = {
			hasMemberRelation: data.advancedOptions.hasMemberRelation
		};
		if( ! ! data.advancedOptions.isMemberOfRelation ) childContent[ "isMemberOfRelation" ] = data.advancedOptions.isMemberOfRelation;
		this.documentsResolverService.createChild( this.context, this.parentURI, childContent, childSlug ).then( ( createdChild:PersistedDocument.Class ) => {
			this.onSuccess.emit( createdChild );
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
		this.$createDocumentModal.modal( "show" );
	}

	public hide():void {
		this.hideForm();
	}

	private hideForm():void {
		this.$createDocumentModal.modal( "hide" );
		this.clearErrorMessage();
		this.createChildFormModel.slug = "";
		this.createChildFormModel.advancedOptions.hasMemberRelation = "http://www.w3.org/ns/ldp#member";
		this.createChildFormModel.advancedOptions.isMemberOfRelation = "";
	}

	public toggle():void {
		this.$createDocumentModal.modal( "toggle" );
	}

}

export default DocumentCreatorComponent;
