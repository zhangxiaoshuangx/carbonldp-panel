import { Component, Input, Output, EventEmitter } from "@angular/core";

import template from "./paginator.component.html!";

@Component( {
	selector: "cp-paginator",
	template: template,
	styles: [ ":host{ display:block; }" ],
} )

export class PaginatorComponent {

	private pages:number[] = [];

	private _activePage:number = 0;
	set activePage( value:number ) {
		this._activePage = value;
		this.onPageChange.emit( value );
	}

	get activePage():number {
		return this._activePage;
	}


	@Input() elementsPerPage:number = 5;
	private _totalElements:number = 0;
	@Input() set totalElements( value:number ) {
		this._totalElements = value;
		let i = 0,
			totalPages = this.totalElements === 0 ? 0 : Math.round( this.totalElements / this.elementsPerPage );
		this.pages = [];
		for( let i = 0; i < totalPages; i ++ ) {
			this.pages.push( i );
		}
	};

	get totalElements():number {
		return this._totalElements;
	}

	@Output() onPageChange:EventEmitter<number> = new EventEmitter<number>();


	constructor() {}

	private pageClick( index:number ):void {
		this.activePage = index;
	}

	private previous():void {
		this.activePage > 0 ? this.activePage -- : this.activePage;
	}

	private next():void {
		this.activePage + 1 < this.pages.length ? this.activePage ++ : this.activePage;
	}
}

export default PaginatorComponent;
