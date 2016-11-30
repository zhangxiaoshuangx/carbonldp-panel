import { Component } from "@angular/core";

import template from "./auth.view.html!";

@Component( {
	selector: "cp-my-apps",
	template: template,
	styles: [ ":host { display: block; }" ],
} )

export class AuthView {
	
}

export default AuthView;
