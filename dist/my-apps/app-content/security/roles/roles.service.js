System.register(["@angular/core", "carbonldp/Carbon", "carbonldp/App/Roles", "carbonldp/App/Role", "carbonldp/Utils", "carbonldp/RDF/URI", "carbonldp/NS"], function(exports_1, context_1) {
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
    var core_1, Carbon_1, Roles, Role, Utils, URI, NS;
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
            function (Role_1) {
                Role = Role_1;
            },
            function (Utils_1) {
                Utils = Utils_1;
            },
            function (URI_1) {
                URI = URI_1;
            },
            function (NS_1) {
                NS = NS_1;
            }],
        execute: function() {
            RolesService = (function () {
                function RolesService(carbon) {
                    this.carbon = carbon;
                    this.appContextsRoles = new Map();
                }
                RolesService.prototype.get = function (slugOrURI, appContext) {
                    var uri = appContext.getBaseURI() + ("roles/" + slugOrURI + "/");
                    if (URI.Util.isAbsolute(slugOrURI))
                        uri = slugOrURI;
                    var existingRoles = this.appContextsRoles.get(appContext.getBaseURI());
                    existingRoles = typeof existingRoles === "undefined" ? new Map() : existingRoles;
                    return appContext.documents.get(uri).then(function (_a) {
                        var role = _a[0], response = _a[1];
                        existingRoles.set(role.id, role);
                        return role;
                    });
                };
                RolesService.prototype.getAll = function (appContext, limit, page, orderBy, ascending) {
                    var _this = this;
                    if (ascending === void 0) { ascending = true; }
                    var uri = appContext.getBaseURI() + "roles/";
                    var existingRoles = this.appContextsRoles.get(appContext.getBaseURI());
                    existingRoles = typeof existingRoles === "undefined" ? new Map() : existingRoles;
                    var preferences = {}, property, name = {
                        "@id": NS.CS.Predicate.namae,
                        "@type": "string",
                    }, email = {
                        "@id": NS.VCARD.Predicate.email,
                        "@type": "string",
                    }, created = {
                        "@id": NS.C.Predicate.created,
                        "@type": "dateTime",
                    }, modified = {
                        "@id": NS.C.Predicate.modified,
                        "@type": "dateTime",
                    };
                    switch (orderBy) {
                        case "name":
                            property = name;
                            break;
                        case "email":
                            property = email;
                            break;
                        case "created":
                            property = created;
                            break;
                        case "modified":
                            property = modified;
                            break;
                    }
                    if (!ascending)
                        property["@id"] = "-" + property["@id"];
                    if (!!orderBy)
                        preferences.orderBy = [property];
                    if (typeof limit !== "undefined")
                        preferences.limit = limit;
                    if (typeof page !== "undefined")
                        preferences.offset = page * limit;
                    return this.carbon.documents.getChildren(uri, preferences).then(function (_a) {
                        var roles = _a[0], response = _a[1];
                        roles.filter(function (role) { return !existingRoles.has(role.id); })
                            .forEach(function (role) { return existingRoles.set(role.id, role); });
                        var rolesArray = Utils.A.from(existingRoles.values());
                        if (orderBy)
                            rolesArray = _this.getSortedRoles(rolesArray, orderBy, ascending);
                        return rolesArray;
                    });
                };
                RolesService.prototype.create = function (appContext, parentRole, role, slug) {
                    var MockedRoles = (function (_super) {
                        __extends(MockedRoles, _super);
                        function MockedRoles() {
                            _super.apply(this, arguments);
                        }
                        return MockedRoles;
                    }(Roles.Class));
                    var roles = new MockedRoles(appContext);
                    return roles.createChild(parentRole, role, slug).then(function (_a) {
                        var role = _a[0], response = _a[1];
                        return role;
                    });
                };
                RolesService.prototype.saveAndRefresh = function (appContext, role) {
                    return role.saveAndRefresh();
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
                RolesService.prototype.getNumberOfRoles = function (appContext) {
                    var agentsURI = appContext.getBaseURI() + "roles/", query = "SELECT DISTINCT (COUNT(?role) AS ?count) WHERE {\n\t\t\t?role a <https://carbonldp.com/ns/v1/security#AppRole> . \n\t\t}";
                    return appContext.documents.executeSELECTQuery(agentsURI, query).then(function (_a) {
                        var results = _a[0], response = _a[1];
                        if (typeof results.bindings[0] === "undefined")
                            return 0;
                        return results.bindings[0]["count"];
                    });
                };
                RolesService.prototype.getChildren = function (appContext, roleID) {
                    var rolesURI = appContext.getBaseURI() + "roles/", filter = !!roleID ? "EXISTS { ?role <" + NS.CS.Predicate.parentRole + "> <" + roleID + "> }" : "NOT EXISTS { ?role <" + NS.CS.Predicate.parentRole + "> ?parentRole } ", query = "\n\t\t\t\tSELECT ?role ?name ?parentRole ?childRole\n\t\t\t\tWHERE{\n\t\t\t\t  GRAPH ?role { \n\t\t\t\t    ?role a <https://carbonldp.com/ns/v1/security#AppRole> .\n\t\t\t\t\t?role <https://carbonldp.com/ns/v1/security#name> ?name .\n\t\t\t\t\tOPTIONAL { ?role <https://carbonldp.com/ns/v1/security#parentRole> ?parentRole } .\n\t\t\t\t  }\n\t\t\t\t  BIND( EXISTS { GRAPH ?role { ?role <https://carbonldp.com/ns/v1/security#childRole> ?childRole } } as ?childRole)\n\t\t\t\t  FILTER( " + filter + " )\n\t\t\t\t}";
                    return appContext.documents.executeSELECTQuery(rolesURI, query).then(function (_a) {
                        var results = _a[0], response = _a[1];
                        var roles = [];
                        results.bindings.forEach(function (rolePointer) {
                            var role = Role.Factory.createFrom({ id: rolePointer["role"]["id"] }, rolePointer["name"]);
                            role["hasChildren"] = rolePointer["childRole"];
                            roles.push(role);
                        });
                        return roles;
                    });
                };
                RolesService.prototype.getSortedRoles = function (roles, orderBy, ascending) {
                    return roles.sort(function (roleA, roleB) {
                        if (typeof roleA[orderBy] === "string") {
                            if (roleA[orderBy].toLowerCase() > roleB[orderBy].toLowerCase())
                                return ascending ? -1 : 1;
                            if (roleA[orderBy].toLowerCase() < roleB[orderBy].toLowerCase())
                                return ascending ? 1 : -1;
                        }
                        else {
                            if (roleA[orderBy] > roleB[orderBy])
                                return ascending ? -1 : 1;
                            if (roleA[orderBy] < roleB[orderBy])
                                return ascending ? 1 : -1;
                        }
                        return 0;
                    });
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
