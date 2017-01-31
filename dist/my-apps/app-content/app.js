"use strict";
var URI = require("carbonldp/RDF/URI");
var Factory = (function () {
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
exports.Factory = Factory;
var Util = (function () {
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
exports.Util = Util;

//# sourceMappingURL=app.js.map
