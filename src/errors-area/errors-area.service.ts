import { Injectable, EventEmitter } from "@angular/core";

import { Message } from "./error-message.component";

@Injectable()
export class ErrorsAreaService {

	addErrorEmitter:EventEmitter<any> = new EventEmitter();

	constructor() { }

	addError( title:string, content:string, statusCode:string, statusMessage:string, endpoint:string ):void {
		let message:Message = {
			title: title,
			content: content,
			statusCode: statusCode,
			statusMessage: statusMessage,
			endpoint: endpoint,
		};
		this.addErrorEmitter.emit( message );
	}
}

export default ErrorsAreaService;