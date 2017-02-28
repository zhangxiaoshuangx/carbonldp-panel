import { Component, ElementRef, Input, Output, EventEmitter, AfterViewInit } from "@angular/core";

import * as SDKContext from "carbonldp/SDKContext";
import { Error as HTTPError } from "carbonldp/HTTP/Errors";

import { DocumentsResolverService } from "../documents-resolver.service"
import { Message } from "carbonldp-panel/messages-area/message.component";
import { DocumentExplorerLibrary } from "carbonldp-panel/document-explorer/document-explorer-library";
import { ErrorMessageGenerator } from "carbonldp-panel/messages-area/error/error-message-generator";

import "semantic-ui/semantic";

@Component( {
	selector: "cp-document-deleter",
	templateUrl: "./document-deleter.component.html",
	styleUrls: [  "./document-deleter.component.scss"  ],
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
