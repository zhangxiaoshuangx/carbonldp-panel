import { Component, AfterViewInit } from "@angular/core";

import { MessagesAreaService } from "./messages-area.service";
import { Message } from "./message.component";

import "semantic-ui/semantic";

import template from "./messages-area.component.html!";
import style from "./messages-area.component.css!text";

@Component( {
	selector: "cp-messages-area",
	template: template,
	styles: [ style ],
} )
export class MessagesAreaComponent implements AfterViewInit {
	messages:Message[] = [];
	messagesAreaService:MessagesAreaService;

	constructor( errorsAreaService:MessagesAreaService ) {
		this.messagesAreaService = errorsAreaService;
	}

	ngAfterViewInit():void {
		this.messagesAreaService.addMessageEmitter.subscribe(
			( message ):void => {
				this.messages.push( message );
			}
		);
	}

	removeMessage( event:boolean, message:Message, index:number ):void {
		this.messages.splice( index, 1 );
	}

}

export default MessagesAreaComponent;