import { Component } from "@angular/core";

@Component( {
	selector: "cp-security-view",
	template: require( "./security.view.html" ),
	styles: [ ":host { display: block; }" ],
} )

export class SecurityView {

	constructor() {}

}

export default SecurityView;
