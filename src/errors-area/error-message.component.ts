import { Component, Input, Output, ElementRef, SimpleChange, EventEmitter, OnChanges, AfterViewInit } from "@angular/core";

import $ from "jquery";
import "semantic-ui/semantic";

import template from "./error-message.component.html!";
import style from "./error-message.component.css!text";

@Component( {
	selector: "cp-error-message",
	template: template,
	styles: [ style ],
} )

export class ErrorMessageComponent implements OnChanges, AfterViewInit {

	private element:ElementRef;
	private $element:JQuery;
	@Input() title:string;
	@Input() content:string;
	@Input() statusCode:string;
	@Input() statusMessage:string;
	@Input() endpoint:string;
	@Input() message:Message;
	@Input() errors:any[];
	@Input() closable:boolean = false;
	@Input() stack:string;
	@Input() showStack:boolean = false;
	@Output() onClose:EventEmitter<any> = new EventEmitter();

	constructor( element:ElementRef ) {
		this.element = element;
		this.$element = $( this.element.nativeElement );
	}

	ngOnChanges( changes:{ [propName:string]:SimpleChange } ):void {
		if( ! ! changes[ "message" ].currentValue && changes[ "message" ].currentValue !== changes[ "message" ].previousValue ) {
			this.decomposeMessage();
		}
	}

	ngAfterViewInit():void {
		this.$element.find( ".ui.stack.accordion" ).accordion();
	}

	private decomposeMessage():void {
		this.title = this.message.title;
		this.content = this.message.content;
		this.statusCode = this.message.statusCode;
		this.statusMessage = this.message.statusMessage;
		this.endpoint = this.message.endpoint;
		this.errors = this.message.errors;
		this.stack = this.message.stack;
	}

	close( event:Event, messageDiv:HTMLElement ):void {
		$( messageDiv ).transition( {
			animation: "fade",
			onComplete: () => {this.onClose.emit( true );}
		} );
	}
}

export interface Message {
	title?:string;
	content?:string;
	statusCode?:string;
	statusMessage?:string;
	endpoint?:string;
	errors?:any[];
	stack?:string;
}

export default ErrorMessageComponent;