"use strict";
var URI = require("carbonldp/RDF/URI");
var DocumentExplorerLibrary = (function () {
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
exports.DocumentExplorerLibrary = DocumentExplorerLibrary;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DocumentExplorerLibrary;

//# sourceMappingURL=document-explorer-library.js.map
