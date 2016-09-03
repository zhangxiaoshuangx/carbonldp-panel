import { Router } from "@angular/router";
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
    constructor(router: Router);
    isActive(routes: string[], exact?: boolean): boolean;
}
export default RouterService;
