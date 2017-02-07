import { Component, ElementRef, Input, Output, EventEmitter, AfterViewInit } from "@angular/core";

import * as SDKContext from "carbonldp/SDKContext";
import { Error as HTTPError } from "carbonldp/HTTP/Errors";

import { DocumentsResolverService } from "../documents-resolver.service"
import { Message } from "carbonldp-panel/errors-area/error-message.component";
import { ErrorMessageGenerator } from "carbonldp-panel/errors-area/error-message-generator";
import { DocumentExplorerLibrary } from "carbonldp-panel/document-explorer/document-explorer-library";

import "semantic-ui/semantic";

@Component( {
	selector: "cp-document-deleter",
	template: require( "./document-deleter.component.html" ),
	styles: [ require( "./document-deleter.component.css" ) ],
} )

export class DocumentDeleterComponent implements AfterViewInit {

	private element:ElementRef;
	private $element:JQuery;

	$deleteDocumentModal:JQuery;

	private documentsResolverService:DocumentsResolverService;
	private errorMessage:Message;

	deleteDocumentFormModel:{} = {};
	@Input() context:SDKContext.Class;
	@Input() documentURI:string = "";
	@Output() onSuccess:EventEmitter<any> = new EventEmitter<any>();
	@Output() onError:EventEmitter<any> = new EventEmitter<any>();


	constructor( element:ElementRef, documentsResolverService:DocumentsResolverService ) {
		this.element = element;
		this.documentsResolverService = documentsResolverService;
	}

	ngAfterViewInit():void {
		this.$element = $( this.element.nativeElement );
		this.$deleteDocumentModal = this.$element.find( ".delete.document.modal" ).modal( { closable: false } );
	}

	private onSubmitDeleteDocument( data:{}, $event:any ):void {
		this.documentsResolverService.delete( this.context, this.documentURI ).then( ( result ) => {
			this.onSuccess.emit( DocumentExplorerLibrary.getParentURI( this.documentURI ) );
			this.hide();
		} ).catch( ( error:HTTPError ) => {
			this.onError.emit( error );
			this.errorMessage = ErrorMessageGenerator.getErrorMessage( error );
		} );
	}

	private clearErrorMessage():void {
		this.errorMessage = null;
	}

	public show():void {
		this.$deleteDocumentModal.modal( "show" );
	}

	public hide():void {
		this.hideDeleteDocumentForm();
	}

	private hideDeleteDocumentForm():void {
		this.$deleteDocumentModal.modal( "hide" );
		this.clearErrorMessage();
	}

	public toggle():void {
		this.$deleteDocumentModal.modal( "toggle" );
	}

}

export default DocumentDeleterComponent;
