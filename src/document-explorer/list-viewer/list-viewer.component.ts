import { Component, ElementRef, Input, Output, EventEmitter, OnInit } from "@angular/core";

import "semantic-ui/semantic";

import * as RDFNode from "carbonldp/RDF/RDFNode";
import * as URI from "carbonldp/RDF/URI";

import template from "./template.html!";

@Component( {
	selector: "cp-property-list",
	template: template,
	styles: [ ":host { display:block; }" ],
} )

export class ListViewerComponent implements OnInit {

	element:ElementRef;
	@Input() list:RDFNode.Class[];
	@Output() onGoToBNode:EventEmitter<string> = new EventEmitter<string>();

	headers:string[] = [];

	constructor( element:ElementRef ) {
		this.element = element;
	}

	ngOnInit():void {
		this.headers = this.getHeaders();
	}

	hasCommonHeaders():boolean {
		return this.headers.indexOf( "@id" ) > - 1 ? true : this.headers.indexOf( "@type" ) > - 1 ? true : this.headers.indexOf( "@value" ) > - 1 ? true : false;
	}

	hasHeader( value:string ):boolean {
		return this.headers.indexOf( value ) > - 1 ? true : false;
	}

	getHeaders():string[] {
		let temp:string[] = [];

		this.list.forEach( ( item )=> {
			temp = temp.concat( Object.keys( item ) );
		} );

		return temp.filter( ( item, pos ) => {
			return temp.indexOf( item ) === pos
		} );
	}

	goToBNode( id:string ):void {
		this.onGoToBNode.emit( id );
	}

	isBNode( uri:string ):boolean {
		return ! ! uri ? URI.Util.isBNodeID( uri ) : false;
	}

}

export default ListViewerComponent;