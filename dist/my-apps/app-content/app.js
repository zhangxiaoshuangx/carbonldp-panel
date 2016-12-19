System.register(["carbonldp/RDF/URI"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var URI;
    var Factory, Util;
    return {
        setters:[
            function (URI_1) {
                URI = URI_1;
            }],
        execute: function() {
            Factory = (function () {
                function Factory() {
                }
                Factory.createFrom = function (appContext) {
                    var app = appContext.app;
                    if (!("slug" in app)) {
                        Object.defineProperty(app, "slug", {
                            configurable: true,
                            enumerable: false,
                            get: function () {
                                return Util.getSlug(this);
                            }
                        });
                    }
                    if (!("context" in app)) {
                        Object.defineProperty(app, "context", {
                            configurable: true,
                            enumerable: false,
                            writable: false,
                            value: appContext
                        });
                    }
                    return app;
                };
                return Factory;
            }());
            exports_1("Factory", Factory);
            Util = (function () {
                function Util() {
                }
                Util.getSlug = function (app) {
                    var uri = app.id;
                    return Util.removeTrailingSlash(URI.Util.getSlug(uri));
                };
                Util.removeTrailingSlash = function (slug) {
                    if (slug.endsWith("/")) {
                        return slug.substr(0, slug.length - 1);
                    }
                    else {
                        return slug;
                    }
                };
                return Util;
            }());
            exports_1("Util", Util);
        }
    }
});

//# sourceMappingURL=app.js.map
