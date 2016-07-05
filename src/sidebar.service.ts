import {Injectable, EventEmitter} from "@angular/core";

@Injectable()
export class SidebarService {
	private _items:SidebarItem[] = [];

	get items():SidebarItem[] {
		return this._items;
	}

	addAppEmitter:EventEmitter<any> = new EventEmitter();
	toggleEmitter:EventEmitter<any> = new EventEmitter();
	toggleMenuButtonEmitter:EventEmitter<any> = new EventEmitter();

	addItem( item:SidebarLink | SidebarSubmenu | SidebarDivider | SidebarGroup ):void {
		this.items.push( item );
		this.sortItems( this._items );
	}

	addItems( items:(SidebarLink | SidebarSubmenu | SidebarDivider | SidebarGroup)[] ):void {
		items.forEach( ( item ) => this.items.push( item ) );
		this.sortItems( this._items );
	}

	removeItem( item:SidebarLink | SidebarSubmenu | SidebarDivider | SidebarGroup ):void {
		let index:number = this._items.indexOf( item );
		if( index === - 1 ) return;
		this._items.splice( index, 1 );
	}

	toggle():void {
		this.toggleEmitter.emit( null );
	}

	private sortItems( items:SidebarItem[] ):SidebarItem[] {
		items.sort( ( itemA, itemB ):number => {
			let indexA:number = "index" in itemA && typeof itemA.index === "number" && ! isNaN( itemA.index ) ? itemA.index : 0;
			let indexB:number = "index" in itemB && typeof itemB.index === "number" && ! isNaN( itemB.index ) ? itemB.index : 0;

			if( indexA > indexB ) return 1;
			else if( indexA < indexB ) return - 1;
			else return 0;
		} );

		items.filter( ( item ) => "children" in item && (<any>item).children ).map( ( item ) => (<any>item).children ).forEach( ( children ) => this.sortItems( children ) );

		return items;
	}
}

export interface SidebarItem {
	type:"link" | "submenu" | "divider" | "group";
	index?:number;
}

export interface SidebarLink extends SidebarItem {
	type:"link";
	route:any[];
	icon?:string;
}

export interface SidebarSubmenu extends SidebarItem {
	type:"submenu";
	name:string;
	children:SidebarItem[];
	closeable?:boolean;
	onClose?:EventEmitter<any>;
	icon?:string;
}

export interface SidebarDivider extends SidebarItem {
	type:"divider";
	name:string;
	icon?:string;
}

export interface SidebarGroup extends SidebarItem {
	type:"group";
	children:SidebarItem;
}

export default SidebarService;
