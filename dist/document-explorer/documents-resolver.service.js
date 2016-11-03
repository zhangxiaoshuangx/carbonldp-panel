System.register(["@angular/core", "carbonldp/Carbon", "carbonldp/HTTP", "carbonldp/NS", "carbonldp/RDF/Document"], function(exports_1, context_1) {
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
    var core_1, Carbon_1, HTTP, NS, RDFDocument;
    var DocumentsResolverService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Carbon_1_1) {
                Carbon_1 = Carbon_1_1;
            },
            function (HTTP_1) {
                HTTP = HTTP_1;
            },
            function (NS_1) {
                NS = NS_1;
            },
            function (RDFDocument_1) {
                RDFDocument = RDFDocument_1;
            }],
        execute: function() {
            DocumentsResolverService = (function () {
                function DocumentsResolverService(carbon) {
                    this.documents = new Map();
                    this.parser = new RDFDocument.Parser();
                    this.carbon = carbon;
                }
                DocumentsResolverService.prototype.get = function (uri, documentContext) {
                    var _this = this;
                    if (!uri || !documentContext)
                        return Promise.reject(new Error("Provide the required parameters"));
                    var requestOptions = { sendCredentialsOnCORS: true, };
                    if (documentContext && documentContext.auth.isAuthenticated())
                        documentContext.auth.addAuthentication(requestOptions);
                    HTTP.Request.Util.setAcceptHeader("application/ld+json", requestOptions);
                    HTTP.Request.Util.setPreferredInteractionModel(NS.LDP.Class.RDFSource, requestOptions);
                    return HTTP.Request.Service.get(uri, requestOptions).then(function (response) {
                        var eTag = HTTP.Response.Util.getETag(response);
                        return _this.parser.parse(response.data).then(function (persistedDocument) {
                            return [persistedDocument, eTag];
                        });
                    }).then(function (_a) {
                        var parsedDocument = _a[0], eTag = _a[1];
                        if (!parsedDocument[0])
                            return null;
                        _this.documents.set(uri, { document: parsedDocument, ETag: eTag });
                        return parsedDocument;
                    }).catch(function (error) {
                        console.error(error);
                        return Promise.reject(error);
                    });
                };
                DocumentsResolverService.prototype.getAll = function () {
                    var _this = this;
                    return new Promise(function (resolve, reject) {
                        var keys = Object.keys(_this.documents);
                        var values = keys.map(function (v) { return _this.documents[v].document; });
                        resolve(values);
                    });
                };
                DocumentsResolverService.prototype.createChild = function (context, parentURI, content, childSlug) {
                    return context.documents.createChild(parentURI, content, childSlug).then(function (_a) {
                        var createdChild = _a[0], response = _a[1];
                        return createdChild;
                    }).catch(function (error) {
                        console.error(error);
                        return Promise.reject(error);
                    });
                };
                DocumentsResolverService.prototype.createAccessPoint = function (document, accessPoint, slug) {
                    return document.createAccessPoint(accessPoint, slug).then(function (_a) {
                        var createdChild = _a[0], response = _a[1];
                        return createdChild;
                    }).catch(function (error) {
                        console.error(error);
                        return Promise.reject(error);
                    });
                };
                DocumentsResolverService.prototype.delete = function (context, documentURI) {
                    return context.documents.delete(documentURI).catch(function (error) {
                        console.error(error);
                        return Promise.reject(error);
                    });
                };
                DocumentsResolverService.prototype.update = function (uri, body, documentContext) {
                    if (!uri || !body)
                        return Promise.reject(new Error("Provide the required parameters"));
                    //Refresh document ETag
                    var eTag = this.documents.get(uri).ETag;
                    return this.callUpdate(uri, body, eTag, documentContext);
                };
                DocumentsResolverService.prototype.callUpdate = function (uri, body, eTag, documentContext) {
                    var _this = this;
                    var requestOptions = { sendCredentialsOnCORS: true, };
                    if (documentContext && documentContext.auth.isAuthenticated())
                        documentContext.auth.addAuthentication(requestOptions);
                    HTTP.Request.Util.setAcceptHeader("application/ld+json", requestOptions);
                    HTTP.Request.Util.setContentTypeHeader("application/ld+json", requestOptions);
                    HTTP.Request.Util.setIfMatchHeader(eTag, requestOptions);
                    HTTP.Request.Util.setPreferredInteractionModel(NS.LDP.Class.RDFSource, requestOptions);
                    return HTTP.Request.Service.put(uri, body, requestOptions).then(function (response) {
                        return _this.get(uri, documentContext);
                    }).then(function (parsedDocument) {
                        if (!parsedDocument[0])
                            return null;
                        return parsedDocument;
                    }).catch(function (error) {
                        console.error(error);
                        return Promise.reject(error);
                    });
                };
                DocumentsResolverService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [Carbon_1.default])
                ], DocumentsResolverService);
                return DocumentsResolverService;
            }());
            exports_1("DocumentsResolverService", DocumentsResolverService);
            exports_1("default",DocumentsResolverService);
        }
    }
});

//# sourceMappingURL=documents-resolver.service.js.map
