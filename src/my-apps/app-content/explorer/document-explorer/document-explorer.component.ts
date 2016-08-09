import { Component, Input } from "@angular/core";

import * as SDKContext from "carbonldp/SDKContext";
import * as RDFDocument from "carbonldp/RDF/Document";
import * as HTTP from "carbonldp/HTTP";

import { DocumentsResolverService } from "./documents-resolver.service"
import { DocumentViewerComponent } from "./document-viewer/document-viewer.component";
import { DocumentTreeViewComponent } from "./document-tree-view/document-tree-view.component";
import { Message, ErrorMessageComponent } from "./../../../../errors-area/error-message.component";

import "semantic-ui/semantic";

import template from "./document-explorer.component.html!";
import style from "./document-explorer.component.css!text";

@Component( {
	selector: "cp-document-explorer",
	template: template,
	styles: [ style ],
	directives: [ DocumentTreeViewComponent, DocumentViewerComponent, ErrorMessageComponent ],
} )

export class DocumentExplorerComponent {

	loadingDocument:boolean = false;
	savingDocument:boolean = false;
	inspectingDocument:RDFDocument.Class;
	documentsResolverService:DocumentsResolverService;
	messages:Message[] = [];

	@Input() documentContext:SDKContext.Class;

	constructor( documentsResolverService:DocumentsResolverService ) {
		this.documentsResolverService = documentsResolverService;
	}

	onLoadingDocument( loadingDocument:boolean ):void {
		this.loadingDocument = loadingDocument;
	}

	showLoading( savingDocument:boolean ):void {
		this.savingDocument = savingDocument;
	}

	resolveDocument( uri:string ):void {
		this.loadingDocument = true;
		this.documentsResolverService.get( uri, this.documentContext ).then( ( document:RDFDocument.Class )=> {
			this.inspectingDocument = document[ 0 ];
			this.loadingDocument = false;
		} );
	}

	handleError( error:HTTP.Errors.Error ):void {
		let errorMessage:Message;
		if( error.response ) errorMessage = this.getHTTPErrorMessage( error, this.getErrorMessage( error ) );
		else {
			errorMessage = <Message>{
				title: error.name,
				content: JSON.stringify( error )
			};
		}
		this.messages.push( errorMessage );
	}

	refreshDocument( documentURI:string ):void {
		this.resolveDocument( documentURI );
	}

	private getHTTPErrorMessage( error:HTTP.Errors.Error, content:string ):Message {
		return {
			title: error.name,
			content: content + (! ! error.message ? (" Reason: " + error.message) : ""),
			endpoint: (<any>error.response.request).responseURL,
			statusCode: "" + error.response.request.status + " - RequestID: " + error.requestID,
			statusMessage: error.response.request.statusText
		};
	}

	private getErrorMessage( error:HTTP.Errors.Error ):string {
		let tempMessage:string = "";
		switch ( true ) {
			case error instanceof HTTP.Errors.ForbiddenError:
				tempMessage = "Forbidden Action.";
				break;
			case error instanceof HTTP.Errors.NotFoundError:
				tempMessage = "Couldn't found the requested resource.";
				break;
			case error instanceof HTTP.Errors.UnauthorizedError:
				tempMessage = "Unauthorized operation.";
				break;
			case error instanceof HTTP.Errors.InternalServerErrorError:
				tempMessage = "An internal error occurred while trying to fetch the resource. Please try again later. Error: " + error.response.status;
				break;
			case error instanceof HTTP.Errors.ServiceUnavailableError:
				tempMessage = "Service currently unavailable.";
				break;
			case error instanceof HTTP.Errors.UnknownError:
				// TODO: Check if the UnknownError is due to a bad CORS configuration.
				tempMessage = "An error occurred while trying to fetch the resource content. This could be caused by a missing allowed domain for your App. Please, make sure this is not the case and try again later.";
				break;
			default:
				tempMessage = "There was a problem processing the request. Error: " + error.response.status;
				break;
		}
		return tempMessage;
	}
}

export default DocumentExplorerComponent;