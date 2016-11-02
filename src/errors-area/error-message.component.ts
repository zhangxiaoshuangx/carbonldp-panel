import { Component, Input, Output, SimpleChange, EventEmitter, OnChanges } from "@angular/core";

import $ from "jquery";
import "semantic-ui/semantic";

import template from "./error-message.component.html!";

@Component( {
	selector: "cp-error-message",
	template: template,
	styles: [ ":host{ display:block; }" ],
} )

export class ErrorMessageComponent implements OnChanges {

	@Input() title:string;
	@Input() content:string;
	@Input() statusCode:string;
	@Input() statusMessage:string;
	@Input() endpoint:string;
	@Input() message:Message;
	@Input() errors:any[];
	@Input() closable:boolean = false;
	@Output() onClose:EventEmitter<any> = new EventEmitter();

	constructor() { }

	ngOnChanges( changes:{[propName:string]:SimpleChange} ):void {
		if( ! ! changes[ "message" ].currentValue && changes[ "message" ].currentValue !== changes[ "message" ].previousValue ) {
			this.decomposeMessage();
		}
	}

	private decomposeMessage():void {
		this.title = this.message.title;
		this.content = this.message.content;
		this.statusCode = this.message.statusCode;
		this.statusMessage = this.message.statusMessage;
		this.endpoint = this.message.endpoint;
		this.errors = this.message.errors;
	}

	close( event:Event, messageDiv:HTMLElement ):void {
		$( messageDiv ).transition( {
			animation: "fade",
			onComplete: ()=> {this.onClose.emit( true );}
		} );
	}
}

export interface Message {
	title:string;
	content:string;
	statusCode:string;
	statusMessage:string;
	endpoint:string;
	errors:any[];
}

export default ErrorMessageComponent;