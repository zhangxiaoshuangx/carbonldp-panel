import { Component, Input, Output, EventEmitter } from "@angular/core";

import template from "./paginator.component.html!";

@Component( {
	selector: "cp-paginator",
	template: template,
	styles: [ ":host{ display:block; }" ],
} )

export class PaginatorComponent {

	private pages:number[] = [];

	@Input() activePage:number = 0;


	private _elementsPerPage:number = 5;
	@Input() set elementsPerPage( value:number ) {
		this._elementsPerPage = value;
		this.updatePages();
	};

	get elementsPerPage():number {
		return this._elementsPerPage;
	}

	private _totalElements:number = 0;
	@Input() set totalElements( value:number ) {
		this._totalElements = value;
		this.updatePages();
	};

	get totalElements():number {
		return this._totalElements;
	}

	@Output() onPageChange:EventEmitter<number> = new EventEmitter<number>();


	constructor() {}

	private pageClick( index:number ):void {
		this.activePage = index;
		this.onPageChange.emit( this.activePage );
	}

	private previous():void {
		this.activePage > 0 ? this.activePage -- : this.activePage;
		this.onPageChange.emit( this.activePage );
	}

	private next():void {
		this.activePage + 1 < this.pages.length ? this.activePage ++ : this.activePage;
		this.onPageChange.emit( this.activePage );
	}

	private updatePages():void {
		this.pages = this.getPages();
		if( this.activePage >= this.pages.length && this.pages.length > 0 ) setTimeout( () => {
			this.activePage = this.pages[ this.pages.length - 1 ];
			this.onPageChange.emit( this.activePage );
		} );
	}

	private getPages():number[] {
		let pages:number[] = [];
		let totalPages = this.totalElements === 0 ? 0 : Math.ceil( this.totalElements / this.elementsPerPage );
		for( let i = 0; i < totalPages; i ++ ) {
			pages.push( i );
		}
		return pages;
	}
}

export default PaginatorComponent;
