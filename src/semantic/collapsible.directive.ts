import { Directive, ElementRef, ContentChild, HostBinding, HostListener, Input, Output, EventEmitter, AfterContentInit } from "@angular/core";

@Directive( {
	selector: ".title"
} )
export class CollapsibleTitleDirective {
	@HostBinding( "class.active" ) active:boolean = false;
	element:ElementRef;

	constructor( element:ElementRef ) {
		this.element = element;
	}
}
@Directive( {
	selector: ".content"
} )
export class CollapsibleContentDirective {
	@HostBinding( "class.active" ) active:boolean = false;
}

@Directive( {
	selector: "[suiCollapsible]"
} )
export class CollapsibleDirective implements AfterContentInit {
	@ContentChild( CollapsibleContentDirective ) content:CollapsibleContentDirective;
	@ContentChild( CollapsibleTitleDirective ) title:CollapsibleTitleDirective;

	@Output( "suiActiveChange" ) activeChange:EventEmitter<boolean> = new EventEmitter<boolean>();

	element:ElementRef;

	get active():boolean {
		return this.content ? this.content.active : this._active;
	}

	@Input( "suiActive" ) set active( active:boolean ) {
		if( active === this._active && this._activeJustChanged ) {
			this._activeJustChanged = false;
			return;
		}

		this._active = active;
		if( this.content ) this.content.active = active;
		if( this.title ) this.title.active = active;

		this._activeJustChanged = true;
		this.activeChange.emit( active );
	}

	private _active:boolean;
	private _activeJustChanged:boolean = false;

	constructor( element:ElementRef ) {
		this.element = element;
	}

	ngAfterContentInit():void {
		this.content.active = this._active;
		this.title.active = this._active;
	}

	@HostListener( "click", [ "$event" ] ) onClick( event:MouseEvent ):void {
		let titleChildren:HTMLElement[] = this.title.element.nativeElement.children;
		for( let i=0; i <= titleChildren.length; i++){
			if(event.target === titleChildren[i]){
				this.toggleContent();
				return;
			}
		}
		
		if( event.target === this.element.nativeElement || event.target === this.title.element.nativeElement ) this.toggleContent();
	}

	toggleContent():void {
		this.active = ! this.active;
	}
}

export default CollapsibleDirective;
