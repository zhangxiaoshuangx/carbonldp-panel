import { Location } from "@angular/common";
import { Router, Instruction } from "@angular/router-deprecated";
import { StringMapWrapper } from "@angular/router-deprecated/src/facade/collection";
import { isPresent, isBlank } from "@angular/router-deprecated/src/facade/lang";

/**
 * Service that wraps router related functionality. This service must not be automatically injected,
 * because we need a different instance each time we inject it into a component (not a singleton).
 * Instead use a factory like:
 * <pre><code>
 *      provide( RouterService, {
 *          useFactory: ( router:Router ):RouterService => {
 *              return new RouterService( router );
 *          },
 *          deps: [ Router ]
 *      })
 * </pre></code>
 */
export class RouterService {
	private router:Router;
	private location:Location;

	constructor( router:Router, location:Location ) {
		this.router = router;
		this.location = location;
	}

	isActive( route:any[] ):boolean {
		if( route.length === 0 ) return false;

		let routeIsRelative:boolean = route[ 0 ].startsWith( "./" );
		let instruction:Instruction = this.router.generate( route );
		let router:Router = this.router;
		let currentInstruction:Instruction = routeIsRelative ? router.currentInstruction : this.getRootRouter( router ).currentInstruction;
		if( isBlank( currentInstruction ) ) return false;

		let currentInstructionBranch:Instruction[] = this.buildInstructionBranch( currentInstruction );
		let instructionBranch:Instruction[] = this.buildInstructionBranch( instruction );

		if( instructionBranch.length > currentInstructionBranch.length ) return false;

		for( let i:number = 0, length:number = instructionBranch.length; i < length; i ++ ) {
			let instructionA:Instruction = instructionBranch[ i ];
			let instructionB:Instruction = currentInstructionBranch[ i ];
			if( instructionA.component.routeName !== instructionB.component.routeName ) return false;

			if( ! this.compareInstructionParameters( instructionA, instructionB ) ) return false;
		}

		return true;
	}

	private getRootRouter( router:Router ):Router {
		while( isPresent( router.parent ) ) {
			router = router.parent;
		}
		return router;
	}

	private buildInstructionBranch( instruction:Instruction ):Instruction[] {
		let instructionBranch:Instruction[] = [];
		let currentInstruction:Instruction = instruction;
		while( isPresent( currentInstruction ) ) {
			instructionBranch.push( currentInstruction );
			currentInstruction = currentInstruction.child;
		}

		instructionBranch.reverse();
		return instructionBranch;
	}

	private compareInstructionParameters( instructionA:Instruction, instructionB:Instruction ):boolean {
		if( ! isPresent( instructionA.component.params ) && ! isPresent( instructionB.component.params ) ) return true;
		if( ! isPresent( instructionA.component.params ) || ! isPresent( instructionB.component.params ) ) return true;

		let parametersAreEqual:boolean = true;
		StringMapWrapper.forEach( instructionA.component.params, ( value, key ) => {
			if( instructionB.component.params[ key ] !== value ) parametersAreEqual = false;
		} );
		return parametersAreEqual;
	}
}

export default RouterService;
