"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var router_1 = require("@angular/router");
var core_1 = require("@angular/core");
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
var RouterService = (function () {
    function RouterService(router) {
        this.router = router;
    }
    RouterService.prototype.isActive = function (routes, exact) {
        if (exact === void 0) { exact = true; }
        var fullRoute = "";
        if (typeof routes === "string") {
            fullRoute = routes;
        }
        else {
            routes.forEach(function (value, idx) {
                fullRoute += value;
                if (idx !== routes.length - 1)
                    fullRoute += "/";
            });
        }
        return this.router.isActive(fullRoute, exact);
    };
    return RouterService;
}());
RouterService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router])
], RouterService);
exports.RouterService = RouterService;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RouterService;

//# sourceMappingURL=router.service.js.map
