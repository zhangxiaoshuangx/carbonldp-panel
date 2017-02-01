import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { MyAppsSidebarService } from "./../my-apps-sidebar.service";
import { AppContentService } from "./app-content.service";
import * as App from "./app";

@Component( {
	selector: "cp-app-content",
	templateUrl: "./app-content.component.html",
	styleUrls: [ "./app-content.component.scss" ],
} )
export class AppContentView {

	public app:App.Class;

	private router:Router;
	private activatedRoute:ActivatedRoute;
	private appContentService:AppContentService;
	private myAppsSidebarService:MyAppsSidebarService;


	constructor( router:Router, route:ActivatedRoute, myAppsSidebarService:MyAppsSidebarService, appContentService:AppContentService ) {
		this.router = router;
		this.activatedRoute = route;
		this.myAppsSidebarService = myAppsSidebarService;
		this.appContentService = appContentService;
	}

	ngOnInit() {
		this.activatedRoute.data.forEach( ( data:{ app:App.Class } ) => {
			this.app = data.app;
			this.appContentService.activeApp = this.app;
			this.myAppsSidebarService.addApp( this.app );
			this.myAppsSidebarService.openApp( this.app );
		} );
	}
}

export default AppContentView;
