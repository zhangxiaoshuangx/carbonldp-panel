System.register(["carbonldp/RDF/URI"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var URI;
    var DocumentExplorerLibrary;
    return {
        setters:[
            function (URI_1) {
                URI = URI_1;
            }],
        execute: function() {
            DocumentExplorerLibrary = (function () {
                function DocumentExplorerLibrary() {
                }
                DocumentExplorerLibrary.getSanitizedSlug = function (slug) {
                    if (!slug)
                        return slug;
                    return slug.toLowerCase().replace(/ - | -|- /g, "-").replace(/[^-\w ]+/g, "").replace(/ +/g, "-");
                };
                DocumentExplorerLibrary.getAppendedSlashSlug = function (slug) {
                    if (!slug)
                        return slug;
                    if (!slug.endsWith("/") && slug.trim() !== "")
                        slug += "/";
                    return slug;
                };
                DocumentExplorerLibrary.getParentURI = function (documentURI) {
                    var slug = URI.Util.getSlug(documentURI), slugIdx = documentURI.indexOf(slug);
                    return documentURI.substr(0, slugIdx);
                };
                return DocumentExplorerLibrary;
            }());
            exports_1("DocumentExplorerLibrary", DocumentExplorerLibrary);
            exports_1("default",DocumentExplorerLibrary);
        }
    }
});

//# sourceMappingURL=document-explorer-library.js.map
