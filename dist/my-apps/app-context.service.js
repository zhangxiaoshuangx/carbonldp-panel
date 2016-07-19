System.register(["@angular/core", "carbonldp/Carbon", "carbonldp/RDF/URI", "carbonldp/Utils"], function(exports_1, context_1) {
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
    var core_1, Carbon_1, URI, Utils;
    var AppContextService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Carbon_1_1) {
                Carbon_1 = Carbon_1_1;
            },
            function (URI_1) {
                URI = URI_1;
            },
            function (Utils_1) {
                Utils = Utils_1;
            }],
        execute: function() {
            AppContextService = (function () {
                function AppContextService(carbon) {
                    this.carbon = carbon;
                    this.appContexts = new Map();
                }
                AppContextService.prototype.get = function (slug) {
                    var _this = this;
                    slug = this.removeTrailingSlash(slug);
                    return new Promise(function (resolve, reject) {
                        if (_this.appContexts.has(slug)) {
                            resolve(_this.appContexts.get(slug));
                            return;
                        }
                        _this.carbon.apps.getContext(slug + "/").then(function (appContext) {
                            _this.appContexts.set(slug, appContext);
                            resolve(appContext);
                        }).catch(function (error) {
                            console.log(error);
                            reject(error);
                        });
                    });
                };
                AppContextService.prototype.getAll = function () {
                    var _this = this;
                    return this.carbon.apps.getAllContexts().then(function (appContexts) {
                        _this.appContexts.clear();
                        appContexts
                            .forEach(function (appContext) {
                            _this.appContexts.set(_this.getSlug(appContext), appContext);
                        });
                        return Utils.A.from(_this.appContexts.values());
                    });
                };
                AppContextService.prototype.getSlug = function (appContext) {
                    var uri = appContext.app.id;
                    return this.removeTrailingSlash(URI.Util.getSlug(uri));
                };
                AppContextService.prototype.removeTrailingSlash = function (slug) {
                    if (slug.endsWith("/")) {
                        return slug.substr(0, slug.length - 1);
                    }
                    else {
                        return slug;
                    }
                };
                AppContextService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [Carbon_1.default])
                ], AppContextService);
                return AppContextService;
            }());
            exports_1("AppContextService", AppContextService);
            exports_1("default",AppContextService);
        }
    }
});

//# sourceMappingURL=app-context.service.js.map
