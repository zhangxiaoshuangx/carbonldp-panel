import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import template from "./app-not-found.view.html!";
import style from "./app-not-found.view.css!text";

@Component( {
	selector: "cp-app-content",
	template: template,
	styles: [ style ],
} )
export class AppNotFoundView implements OnInit {
	private timer:number;
	private router:Router;

	constructor( router:Router ) {
		this.router = router;
	}

	ngOnInit():void {
		this.timer = 5;
		let countDown:any = setInterval( ():boolean => {
			this.timer --;
			if( this.timer === 0 ) {
				this.router.navigate( [ "/my-apps" ] );
				clearInterval( countDown );
				return false;
			}
		}, 1000 );
	}
}