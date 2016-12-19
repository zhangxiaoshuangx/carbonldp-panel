System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    // @Injectable()
    // class RoleDecorator implements CanActivate {
    // 	private authService:any;
    // 	private contextToken:any;
    //
    // 	constructor( authService:any, contextToken:any ) {
    // 		console.log( "AuthService: %o", authService );
    // 		console.log( "ContextToken: %o", contextToken );
    // 	}
    //
    // 	canActivate( route:ActivatedRouteSnapshot, state:RouterStateSnapshot ):Observable<boolean>|Promise<boolean>|boolean {
    // 		return true;
    // 	}
    // }
    // export const Roles = ( ...rolesAllowed:string[] ) => {
    // 	return CanActivate( ( next:ComponentInstruction, prev:ComponentInstruction ) => {
    // 		//this would not work if user info was not being kept in session storage
    // 		//as of now it doesn't seem possible to access same-instance application services through non-components
    // 		const injector = Injector.resolveAndCreate( [ Authentication, Storage ] );
    // 		const authentication:Authentication = injector.get( Authentication );
    // 		const userRoles:Array<string> = authentication.userRoles;
    // 		return isAllowedAccess( rolesAllowed, userRoles );
    // 	} );
    // };
    // const isAllowedAccess = ( rolesAllowed:Array<string>, currentRoles:Array<string> ) => {
    // 	const intersectedRoles = currentRoles.reduce( ( acc, curr ) => {
    // 		return [
    // 			...acc,
    // 			...rolesAllowed.filter( role => role.trim().toUpperCase() === curr.trim().toUpperCase() )
    // 		]
    // 	}, [] );
    // 	return intersectedRoles.length > 0;
    // };
    // START: TEST WITH DECORATORS
    function Log(prefix) {
        return function (target) {
            // // save a reference to the original constructor
            // let original = target;
            //
            // // a utility function to generate instances of a class
            // function construct( constructor, args ) {
            // 	let c:any = function() {
            // 		return constructor.apply( this, args );
            // 	};
            // 	c.prototype = constructor.prototype;
            // 	return new c();
            // }
            //
            // // the new constructor behavior
            // let f:any = function( ...args ) {
            // 	console.log( prefix + original.name );
            // 	return construct( original, args );
            // };
            //
            // // copy prototype so instanceof operator still works
            // f.prototype = original.prototype;
            //
            // // return new constructor (will override original)
            // return f;
            console.log(target);
        };
    }
    exports_1("Log", Log);
    return {
        setters:[],
        execute: function() {
        }
    }
});
// END: TEST WITH DECORATORS 

//# sourceMappingURL=role.decorator.js.map
