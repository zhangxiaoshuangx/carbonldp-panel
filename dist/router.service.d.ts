import { Location } from "@angular/common";
import { Router } from "@angular/router-deprecated";
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
export declare class RouterService {
    private router;
    private location;
    constructor(router: Router, location: Location);
    isActive(route: any[]): boolean;
    private getRootRouter(router);
    private buildInstructionBranch(instruction);
    private compareInstructionParameters(instructionA, instructionB);
}
export default RouterService;
