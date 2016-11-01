import { Component, ElementRef, Input, Output, EventEmitter } from "@angular/core";

import * as SDKContext from "carbonldp/SDKContext";
import * as RDFDocument from "carbonldp/RDF/Document";
import * as HTTP from "carbonldp/HTTP";
import * as JSONLDParser from "carbonldp/JSONLD/Parser";
import * as PersistedDocument from "carbonldp/PersistedDocument";
import * as URI from "carbonldp/RDF/URI";
import * as AccessPoint from "carbonldp/AccessPoint";
import { Error as HTTPError } from "carbonldp/HTTP/Errors";

import { DocumentsResolverService } from "./documents-resolver.service"
import { Message } from "carbonldp-panel/errors-area/error-message.component";

import "semantic-ui/semantic";

import template from "./document-explorer.component.html!";
import style from "./document-explorer.component.css!text";

@Component( {
	selector: "cp-document-explorer",
	template: template,
	styles: [ style ],
} )

export class DocumentExplorerComponent {

	element:ElementRef;
	$element:JQuery;

	$createChildSuccessMessage:JQuery;
	$createChildForm:JQuery;
	$createDocumentDimmer:JQuery;
	$deleteDocumentDimmer:JQuery;

	$createAccessPointDimmer:JQuery;
	$createAccessPointForm:JQuery;
	$deleteAccessPointDimmer:JQuery;

	selectedDocumentURI:string = "";
	loadingDocument:boolean = false;
	savingDocument:boolean = false;
	inspectingDocument:RDFDocument.Class;
	documentsResolverService:DocumentsResolverService;
	messages:Message[] = [];
	savingErrorMessage:Message;

	createChildFormModel:{ slug:string, advancedOptions:{hasMemberRelation:string, isMemberOfRelation:string }} = {
		slug: "",
		advancedOptions: {
			hasMemberRelation: "http://www.w3.org/ns/ldp#member",
			isMemberOfRelation: ""
		}
	};
	createAccessPointFormModel:{ slug:string, hasMemberRelation:string, isMemberOfRelation:string } = {
		slug: "",
		hasMemberRelation: "http://www.w3.org/ns/ldp#member",
		isMemberOfRelation: ""
	};

	@Input() documentContext:SDKContext.Class;
	@Output() onRefreshNode:EventEmitter<string> = new EventEmitter<string>();
	@Output() onOpenNode:EventEmitter<string> = new EventEmitter<string>();
	@Output() onDisplaySuccessMessage:EventEmitter<string> = new EventEmitter<string>();

	constructor( element:ElementRef, documentsResolverService:DocumentsResolverService ) {
		this.element = element;
		this.documentsResolverService = documentsResolverService;
	}

	ngAfterViewInit():void {
		this.$element = $( this.element.nativeElement );
		this.$createChildSuccessMessage = this.$element.find( ".success.createchild.message" );
		this.$createDocumentDimmer = this.$element.find( ".create.document.dimmer" ).dimmer( { closable: false } );
		this.$deleteDocumentDimmer = this.$element.find( ".delete.document.dimmer" ).dimmer( { closable: false } );
		this.$createAccessPointDimmer = this.$element.find( ".create.accesspoint.dimmer" ).dimmer( { closable: false } );
		this.$createChildForm = this.$element.find( ".createchild.form" );
		this.$createChildForm.find( ".advancedoptions.accordion" ).accordion();
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

	refreshNode( nodeId:string ):void {
		this.onRefreshNode.emit( nodeId );
	}

	openNode( nodeId:string ):void {
		this.onOpenNode.emit( nodeId );
	}

	//<editor-fold desc="#region Create child">
	private changeSelection( documentURI:string ) {
		this.selectedDocumentURI = documentURI;
	}

	private showCreateChildForm():void {
		this.$createDocumentDimmer.dimmer( "show" );
	}

	private showCreateAccessPointForm():void {
		this.$createAccessPointDimmer.dimmer( "show" );
	}

	private hideCreateChildForm():void {
		this.$createDocumentDimmer.dimmer( "hide" );
		this.clearSavingError();
		this.createChildFormModel.slug = "";
		this.createChildFormModel.advancedOptions.hasMemberRelation = "http://www.w3.org/ns/ldp#member";
		this.createChildFormModel.advancedOptions.isMemberOfRelation = "";
	}

	private hideCreateAccessPointForm():void {
		this.$createAccessPointDimmer.dimmer( "hide" );
		this.clearSavingError();
		this.createAccessPointFormModel.slug = "";
		this.createAccessPointFormModel.hasMemberRelation = "http://www.w3.org/ns/ldp#member";
		this.createAccessPointFormModel.isMemberOfRelation = "";
	}

	private slugLostControl( evt:any ):void {
		if( typeof (evt.target) === "undefined" ) return;
		if( ! evt.target.value.endsWith( "/" ) && evt.target.value.trim() !== "" ) evt.target.value += "/";
	}

	private getSanitizedSlug( slug:string ):string {
		if( ! slug ) return slug;
		return slug.toLowerCase().replace( / - | -|- /g, "-" ).replace( /[^-\w ]+/g, "" ).replace( / +/g, "-" );
	}

	private createChild():void {
		let childSlug:string = null;
		if( ! ! this.createChildFormModel.slug )
			childSlug = this.createChildFormModel.slug + ((this.createChildFormModel.slug.endsWith( "/" ) && this.createChildFormModel.slug.trim() !== "" ) ? "/" : "");
		let childContent:any = {
			hasMemberRelation: this.createChildFormModel.advancedOptions.hasMemberRelation
		};
		if( ! ! this.createChildFormModel.advancedOptions.isMemberOfRelation ) childContent[ "isMemberOfRelation" ] = this.createChildFormModel.advancedOptions.isMemberOfRelation;
		this.loadingDocument = true;
		this.documentsResolverService.createChild( this.documentContext, this.selectedDocumentURI, childContent, childSlug ).then(
			( createdChild:PersistedDocument.Class ) => {
				this.onRefreshNode.emit( this.selectedDocumentURI );
				this.hideCreateChildForm();
				this.onDisplaySuccessMessage.emit( "createchild" );
			}
		).catch( ( error:HTTPError )=> {
			this.savingErrorMessage = {
				title: error.name,
				content: error.message,
				statusCode: "" + error.statusCode,
				statusMessage: (<XMLHttpRequest>error.response.request).statusText,
				endpoint: (<any>error.response.request).responseURL,
			};
			if( ! ! error.response.data ) {
				this.getErrors( error ).then( ( errors )=> {
					this.savingErrorMessage[ "errors" ] = errors;
				} );
			}
		} ).then( ()=> {
			this.loadingDocument = false;
		} );
	}

	private onSubmitAccessPoint( data:{ slug:string, hasMemberRelation:string, isMemberOfRelation:string }, $event:any ):void {
		$event.preventDefault();
		let slug:string = data.slug;
		let accessPoint:AccessPoint.Class = {
			hasMemberRelation: data.hasMemberRelation
		};
		if( ! ! data.isMemberOfRelation ) accessPoint.isMemberOfRelation = data.isMemberOfRelation;

		this.documentContext.documents.get( this.selectedDocumentURI ).then( ( [document, response]:[PersistedDocument.Class, HTTP.Response.Class] )=> {

			return this.documentsResolverService.createAccessPoint( document, accessPoint, slug );

		} ).then( ( document:PersistedDocument.Class )=> {

			this.onRefreshNode.emit( this.selectedDocumentURI );
			this.hideCreateAccessPointForm();
			this.onDisplaySuccessMessage.emit( "createchild" );

		} ).catch( ( error:HTTPError )=> {
			this.savingErrorMessage = {
				title: error.name,
				content: error.message,
				statusCode: "" + error.statusCode,
				statusMessage: (<XMLHttpRequest>error.response.request).statusText,
				endpoint: (<any>error.response.request).responseURL,
			};
			if( ! ! error.response.data ) {
				this.getErrors( error ).then( ( errors )=> {
					this.savingErrorMessage[ "errors" ] = errors;
				} );
			}
		} );
	}

	private clearSavingError():void {
		this.savingErrorMessage = null;
	}

	private getErrors( error:HTTPError ):Promise<any[]> {
		let parser:JSONLDParser.Class = new JSONLDParser.Class();
		let mainError = {};
		let errors:any[] = [];
		return parser.parse( error.response.data ).then( ( mainErrors )=> {
			mainError = mainErrors.find( ( error )=> { return error[ "@type" ].indexOf( "https://carbonldp.com/ns/v1/platform#ErrorResponse" ) !== - 1} );
			errors = mainErrors.filter( ( error )=> { return error[ "@type" ].indexOf( "https://carbonldp.com/ns/v1/platform#Error" ) !== - 1} );
			return errors;
		} );
	}

	//</editor-fold>

	//<editor-fold desc="#region Delete child">
	private deleteDocument():void {
		this.documentsResolverService.delete( this.documentContext, this.selectedDocumentURI ).then( ( result )=> {

			this.refreshNode( this.getParentURI( this.selectedDocumentURI ) );
			this.cancelDeletion();

		} ).catch( ( error:HTTPError )=> {
			this.savingErrorMessage = {
				title: error.name,
				content: error.message,
				statusCode: "" + error.statusCode,
				statusMessage: (<XMLHttpRequest>error.response.request).statusText,
				endpoint: (<any>error.response.request).responseURL,
			};
			if( ! ! error.response.data ) {
				this.getErrors( error ).then( ( errors )=> {
					this.savingErrorMessage[ "errors" ] = errors;
				} );
			}
		} );
	}

	private cancelDeletion():void {
		this.$deleteDocumentDimmer.dimmer( "hide" );
	}

	private showDeleteChildForm():void {
		this.$deleteDocumentDimmer.dimmer( "show" );
	}

	private getParentURI( documentURI:string ):string {
		let slug:string = URI.Util.getSlug( documentURI ),
			slugIdx:number = documentURI.indexOf( slug );
		return documentURI.substr( 0, slugIdx );
	}

	//</editor-fold>

	private getHTTPErrorMessage( error:HTTP.Errors.Error, content:string ):Message {
		return {
			title: error.name,
			content: content + (! ! error.message ? (" Reason: " + error.message) : ""),
			endpoint: (<any>error.response.request).responseURL,
			statusCode: "" + (<XMLHttpRequest>error.response.request).status + " - RequestID: " + error.requestID,
			statusMessage: (<XMLHttpRequest>error.response.request).statusText
		};
	}

	private getErrorMessage( error:HTTP.Errors.Error ):string {
		let tempMessage:string = "";
		switch( true ) {
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