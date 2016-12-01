import { Component } from "@angular/core";

import template from "./auth.view.html!";

@Component( {
	selector: "cp-auth-view",
	template: template,
	styles: [ ":host { display: block; }" ],
} )

export class AuthView {

	constructor() {}
	
}

export default AuthView;
