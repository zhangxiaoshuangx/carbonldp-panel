import { Component } from "@angular/core";

@Component( {
	selector: "cp-roles-view",
	template: "<router-outlet></router-outlet>",
	styles: [ ":host { display: block; }" ]
} )
export class RolesView {

	constructor() {}

}

export default RolesView;
