import { Component } from "@angular/core";
import { ROUTER_DIRECTIVES, RouterOutlet } from "@angular/router-deprecated";

@Component( {
	selector: "cp-my-apps",
	template: `<router-outlet></router-outlet>`,
	styles: [ ":host { display: block; }" ],
	directives: [ ROUTER_DIRECTIVES, RouterOutlet ],
	providers: []
} )
export class MyAppsView {
}

export default MyAppsView
