import { Component, AfterViewInit } from "@angular/core";

import { ErrorsAreaService } from "./errors-area.service";
import { Message } from "./error-message.component";

import "semantic-ui/semantic";

@Component( {
	selector: "cp-errors-area",
	template: require( "./errors-area.component.html" ),
	styles: [ require( "./errors-area.component.css" ) ],
} )
export class ErrorsAreaComponent implements AfterViewInit {
	messages:Message[] = [];
	errorsAreaService:ErrorsAreaService;

	constructor( errorsAreaService:ErrorsAreaService ) {
		this.errorsAreaService = errorsAreaService;
	}

	ngAfterViewInit():void {
		this.errorsAreaService.addErrorEmitter.subscribe(
			( message ):void => {
				this.messages.push( message );
			}
		);
	}

	removeMessage( event:boolean, message:Message, index:number ):void {
		this.messages.splice( index, 1 );
	}

}

export default ErrorsAreaComponent;