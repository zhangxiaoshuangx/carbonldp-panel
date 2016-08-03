import { Component, Input } from "@angular/core";

import * as App from "carbonldp/App";
import * as PersistedDocument from "carbonldp/PersistedDocument";
import { Error as HTTPError } from "carbonldp/HTTP/Errors";

import { Message, ErrorMessageComponent } from "carbon-panel/errors-area/error-message.component";
import { JobsService } from "../../job/jobs.service";
import * as Job from "../../job/job";

import "semantic-ui/semantic";

import template from "./backup-exporter.component.html!";
import style from "./backup-exporter.component.css!text";

@Component( {
	selector: "cp-backup-exporter",
	template: template,
	styles: [ style ],
	directives: [ ErrorMessageComponent ],
} )

export class BackupExporterComponent {

	executingBackup:boolean = false;

	@Input() appContext:App.Context;
	@Input() backupJob:PersistedDocument.Class;
	errorMessages:Message[] = [];
	jobsService:JobsService;
	exportSuccess:boolean;

	constructor( jobsService:JobsService ) {
		this.jobsService = jobsService;
	}

	onGenerateBackup():void {
		this.executingBackup = true;

		this.jobsService.runJob( this.backupJob ).then( ( execution:PersistedDocument.Class )=> {
			return this.monitorExecution( execution ).catch( ( executionOrError:HTTPError|PersistedDocument.Class ) => {
				if( executionOrError.hasOwnProperty( "response" ) ) return Promise.reject( executionOrError );
				let errorMessage:Message = <Message>{
					title: "Couldn't execute backup.",
					content: "An error occurred while executing your export backup job. This may be caused due to a bad configuration during the creation of your job.",
					statusMessage: execution[ Job.Execution.ERROR_DESCRIPTION ]
				};
				this.errorMessages.push( errorMessage );
			} );
		} ).then( ()=> {
			this.exportSuccess = true;
		} ).catch( ( error:HTTPError )=> {
			let errorMessage:Message = <Message>{
				title: error.name,
				content: "Couldn't execute backup.",
				endpoint: (<any>error.response.request).responseURL,
				statusCode: "" + (<XMLHttpRequest>error.response.request).status,
				statusMessage: (<XMLHttpRequest>error.response.request).statusText
			};
			this.errorMessages.push( errorMessage );
		} ).then( ()=> {
			this.executingBackup = false;
		} );
	}

	monitorExecution( execution:PersistedDocument.Class ):Promise<PersistedDocument.Class> {
		return new Promise<PersistedDocument.Class>( ( resolve:( result:any ) => void, reject:( error:HTTPError|PersistedDocument.Class ) => void ) => {
			// setInterval in the browser returns a number but in NodeJS it returns a Time object, that's why this variable needs to be of type "any"
			let interval:any = setInterval( ()=> {
				execution.refresh().then( ()=> {
					switch( execution[ Job.Execution.STATUS ].id ) {
						case Job.ExecutionStatus.FINISHED:
							clearInterval( interval );
							resolve( execution );
							break;
						case Job.ExecutionStatus.ERROR:
							clearInterval( interval );
							reject( execution );
							break;
					}
				} ).catch( ( error:HTTPError ) => {
					let errorMessage:Message = <Message>{
						title: error.name,
						content: "Couldn't monitor the exporting backup status.",
						endpoint: (<any>error.response.request).responseURL,
						statusCode: "" + (<XMLHttpRequest>error.response.request).status,
						statusMessage: (<XMLHttpRequest>error.response.request).statusText
					};
					this.errorMessages = [ errorMessage ];
					clearInterval( interval );
					this.executingBackup = false;
				} );
			}, 3000 );
		} );
	}

	removeMessage( index:number ):void {
		this.errorMessages.splice( index, 1 );
	}

	onCloseSuccess():void {
		this.exportSuccess = false;
	}
}

export default BackupExporterComponent;
