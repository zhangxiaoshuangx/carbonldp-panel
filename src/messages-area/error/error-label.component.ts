import { Component, Input, ElementRef } from "@angular/core";

import template from "./error-label.component.html!";
import style from "./error-label.component.css!text";

@Component( {
	selector: "cp-error-label",
	template: template,
	styles: [ style ],
	host: {
		class: "ui red basic error label"
	}
} )

export class ErrorLabelComponent {

	private element:ElementRef;
	private $element:JQuery;
	@Input() message:string|string[];

	constructor( element:ElementRef ) {
		this.element = element;
		this.$element = $( this.element.nativeElement );
	}

}

export default ErrorLabelComponent;