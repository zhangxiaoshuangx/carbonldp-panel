System.register(["@angular/core", "carbonldp/Carbon", "carbonldp/Auth/Roles", "carbonldp/Utils"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, Carbon_1, Roles, Utils;
    var RolesService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Carbon_1_1) {
                Carbon_1 = Carbon_1_1;
            },
            function (Roles_1) {
                Roles = Roles_1;
            },
            function (Utils_1) {
                Utils = Utils_1;
            }],
        execute: function() {
            RolesService = (function () {
                function RolesService(carbon) {
                    this.carbon = carbon;
                    this.appContextsRoles = new Map();
                }
                RolesService.prototype.getAll = function (appContext) {
                    var uri = appContext.getBaseURI() + "roles/";
                    var existingRoles = this.appContextsRoles.get(appContext.getBaseURI());
                    existingRoles = typeof existingRoles === "undefined" ? new Map() : existingRoles;
                    return this.carbon.documents.getChildren(uri).then(function (_a) {
                        var roles = _a[0], response = _a[1];
                        roles.filter(function (role) { return !existingRoles.has(role.id); })
                            .forEach(function (role) { return existingRoles.set(role.id, role); });
                        return Utils.A.from(existingRoles.values());
                    });
                };
                RolesService.prototype.registerAgent = function (appContext, agentID, roleID) {
                    var MockedRoles = (function (_super) {
                        __extends(MockedRoles, _super);
                        function MockedRoles() {
                            _super.apply(this, arguments);
                        }
                        return MockedRoles;
                    }(Roles.Class));
                    var roles = new MockedRoles(appContext);
                    return roles.addAgent(roleID, agentID);
                };
                RolesService.prototype.removeAgent = function (appContext, agentID, roleID) {
                    var MockedRoles = (function (_super) {
                        __extends(MockedRoles, _super);
                        function MockedRoles() {
                            _super.apply(this, arguments);
                        }
                        return MockedRoles;
                    }(Roles.Class));
                    var roles = new MockedRoles(appContext);
                    return roles.removeAgent(roleID, agentID);
                };
                RolesService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [Carbon_1.default])
                ], RolesService);
                return RolesService;
            }());
            exports_1("RolesService", RolesService);
            exports_1("default",RolesService);
        }
    }
});

//# sourceMappingURL=roles.service.js.map
