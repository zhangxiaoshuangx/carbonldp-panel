import { Injectable, EventEmitter } from "@angular/core";

import { Message } from "./message.component";

@Injectable()
export class MessagesAreaService {

	addMessageEmitter:EventEmitter<any> = new EventEmitter();

	constructor() { }

	addMessage( title?:string, content?:string, statusCode?:string, statusMessage?:string, endpoint?:string ):void {
		let message:Message = {
			title: title,
			content: content,
			statusCode: statusCode,
			statusMessage: statusMessage,
			endpoint: endpoint,
		};
		this.addMessageEmitter.emit( message );
	}
}

export default MessagesAreaService;