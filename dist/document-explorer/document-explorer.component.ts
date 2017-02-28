import { Component, Input, Output, EventEmitter, NgZone } from "@angular/core";

import * as SDKContext from "carbonldp/SDKContext";
import * as RDFDocument from "carbonldp/RDF/Document";
import { Error as HTTPError } from "carbonldp/HTTP/Errors";

import { DocumentsResolverService } from "./documents-resolver.service";
import { ErrorMessageGenerator } from "carbonldp-panel/messages-area/error/error-message-generator";
import { Message } from "carbonldp-panel/messages-area/message.component";

import "semantic-ui/semantic";


@Component( {
	selector: "cp-document-explorer",
	templateUrl: "./document-explorer.component.html",
	styleUrls: [  "./document-explorer.component.scss"  ],
} )

export class DocumentExplorerComponent {

	selectedDocumentURI:string = "";
	loadingDocument:boolean = false;
	savingDocument:boolean = false;
	inspectingDocument:RDFDocument.Class;
	documentsResolverService:DocumentsResolverService;
	messages:Message[] = [];


	@Input() documentContext:SDKContext.Class;
	@Output() onRefreshNode:EventEmitter<string> = new EventEmitter<string>();
	@Output() onOpenNode:EventEmitter<string> = new EventEmitter<string>();
	@Output() onDisplaySuccessMessage:EventEmitter<string> = new EventEmitter<string>();

	private zone:NgZone;

	constructor( documentsResolverService:DocumentsResolverService, zone:NgZone ) {
		this.documentsResolverService = documentsResolverService;
		this.zone = zone;
	}

	onLoadingDocument( loadingDocument:boolean ):void {
		this.loadingDocument = loadingDocument;
	}

	showLoading( savingDocument:boolean ):void {
		this.savingDocument = savingDocument;
	}

	resolveDocument( uri:string ):void {
		this.loadingDocument = true;
		this.documentsResolverService.get( uri, this.documentContext ).then( ( document:RDFDocument.Class ) => {
			this.zone.run( () => {
				this.inspectingDocument = document;
				this.loadingDocument = false;
			} );
		} );
	}

	refreshDocument( documentURI:string ):void {
		this.resolveDocument( documentURI );
	}

	refreshNode( nodeId:string ):void {
		this.onRefreshNode.emit( nodeId );
	}

	openNode( nodeId:string ):void {
		this.onOpenNode.emit( nodeId );
	}

	private changeSelection( documentURI:string ) {
		this.selectedDocumentURI = documentURI;
	}

	private onSuccessAccessPoint( $event:any ):void {
		this.onRefreshNode.emit( this.selectedDocumentURI );
		this.onDisplaySuccessMessage.emit( "<p>The Access Point was created correctly</p>" );
	}

	private onSuccessCreateDocument( $event:any ):void {
		this.onRefreshNode.emit( this.selectedDocumentURI );
		this.onDisplaySuccessMessage.emit( "<p>The child document was created correctly</p>" );
	}

	private onSuccessDeleteDocument( $event:any ):void {
		this.onRefreshNode.emit( $event );
	}

	private handleExternalError( error:HTTPError ):void {
		this.messages.push( ErrorMessageGenerator.getErrorMessage( error ) );
	}

}

export default DocumentExplorerComponent;