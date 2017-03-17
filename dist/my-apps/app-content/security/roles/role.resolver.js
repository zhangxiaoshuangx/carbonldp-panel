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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var Role = require("carbonldp/App/Role");
var NS = require("carbonldp/NS");
var roles_service_1 = require("./roles.service");
var app_content_service_1 = require("carbonldp-panel/my-apps/app-content/app-content.service");
var RoleResolver = (function () {
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
    return RoleResolver;
}());
RoleResolver = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router, router_1.ActivatedRoute, roles_service_1.RolesService, app_content_service_1.AppContentService, common_1.Location])
], RoleResolver);
exports.RoleResolver = RoleResolver;
