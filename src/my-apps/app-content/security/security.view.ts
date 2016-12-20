import { Component } from "@angular/core";

import template from "./security.view.html!";

@Component( {
	selector: "cp-security-view",
	template: template,
	styles: [ ":host { display: block; }" ],
} )

export class SecurityView {

	constructor() {}

}

export default SecurityView;
