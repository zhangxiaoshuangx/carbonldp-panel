import { Component, AfterViewInit } from "@angular/core";

import { ErrorsAreaService } from "./errors-area.service";
import { Message, ErrorMessageComponent } from "./error-message.component";

import "semantic-ui/semantic";

import template from "./errors-area.component.html!";
import style from "./errors-area.component.css!text";

@Component( {
	selector: "cp-errors-area",
	template: template,
	styles: [ style ],
	directives: [ ErrorMessageComponent ],
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

}

export default ErrorsAreaComponent;