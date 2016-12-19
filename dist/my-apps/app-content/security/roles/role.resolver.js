System.register(['@angular/core', '@angular/common', '@angular/router', "carbonldp/App/Role", "carbonldp/NS", "./roles.service", "carbonldp-panel/my-apps/app-content/app-content.service"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, router_1, Role, NS, roles_service_1, app_content_service_1;
    var RoleResolver;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (Role_1) {
                Role = Role_1;
            },
            function (NS_1) {
                NS = NS_1;
            },
            function (roles_service_1_1) {
                roles_service_1 = roles_service_1_1;
            },
            function (app_content_service_1_1) {
                app_content_service_1 = app_content_service_1_1;
            }],
        execute: function() {
            RoleResolver = (function () {
                function RoleResolver(router, route, rolesService, appContentService, location) {
                    this.location = location;
                    this.router = router;
                    this.activatedRoute = route;
                    this.rolesService = rolesService;
                    this.appContentService = appContentService;
                }
                // TODO: Change the use of location to the righ way of navigate with an activatedRoute, check if this 'bug' has been resolved on further angular versions
                RoleResolver.prototype.resolve = function (route) {
                    var _this = this;
                    var slug = route.params["role-slug"];
                    // TODO: Remove extendObjectSchema when SDK implements description and childRole
                    this.appContentService.activeApp.context.extendObjectSchema(Role.RDF_CLASS, {
                        "description": {
                            "@id": NS.CS.Predicate.description,
                            "@type": "string"
                        },
                        "childRole": {
                            "@id": NS.CS.Predicate.childRole,
                            "@container": "@set"
                        }
                    });
                    return this.rolesService.get(slug, this.appContentService.activeApp.context).then(function (role) {
                        return role;
                    }).catch(function (error) {
                        var url = _this.location.path(), lastSlashIdx = url.lastIndexOf("/"), finalURL = url.substr(0, lastSlashIdx) + "/role-not-found";
                        _this.router.navigate([finalURL]);
                        return false;
                    });
                };
                RoleResolver = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, roles_service_1.RolesService, app_content_service_1.AppContentService, common_1.Location])
                ], RoleResolver);
                return RoleResolver;
            }());
            exports_1("RoleResolver", RoleResolver);
        }
    }
});

//# sourceMappingURL=role.resolver.js.map
