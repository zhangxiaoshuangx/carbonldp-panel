System.register(["@angular/core", "carbonldp/Carbon", "carbonldp/HTTP", "./response/response.component", "carbon-panel/code-mirror/code-mirror.component", "jquery", "semantic-ui/semantic", "./sparql-client.component.html!", "./sparql-client.component.css!text"], function(exports_1, context_1) {
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
    var core_1, Carbon_1, HTTP, response_component_1, CodeMirrorComponent, jquery_1, sparql_client_component_html_1, sparql_client_component_css_text_1;
    var SPARQLClientComponent;
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
            function (response_component_1_1) {
                response_component_1 = response_component_1_1;
            },
            function (CodeMirrorComponent_1) {
                CodeMirrorComponent = CodeMirrorComponent_1;
            },
            function (jquery_1_1) {
                jquery_1 = jquery_1_1;
            },
            function (_1) {},
            function (sparql_client_component_html_1_1) {
                sparql_client_component_html_1 = sparql_client_component_html_1_1;
            },
            function (sparql_client_component_css_text_1_1) {
                sparql_client_component_css_text_1 = sparql_client_component_css_text_1_1;
            }],
        execute: function() {
            SPARQLClientComponent = (function () {
                function SPARQLClientComponent(element, carbon) {
                    this.sparqlTypes = {
                        query: "Query",
                        update: "Update",
                    };
                    this.sparqlQueryOperations = {
                        select: {
                            name: "SELECT",
                            formats: [
                                { value: response_component_1.SPARQLFormats.table, name: "Friendly Table" },
                            ],
                        },
                        describe: {
                            name: "DESCRIBE",
                            formats: [
                                { value: response_component_1.SPARQLFormats.jsonLD, name: "JSON-LD" },
                                { value: response_component_1.SPARQLFormats.turtle, name: "TURTLE" },
                                { value: response_component_1.SPARQLFormats.jsonRDF, name: "RDF/JSON" },
                                { value: response_component_1.SPARQLFormats.rdfXML, name: "RDF/XML" },
                                { value: response_component_1.SPARQLFormats.n3, name: "N3" },
                            ],
                        },
                        construct: {
                            name: "CONSTRUCT",
                            formats: [
                                { value: response_component_1.SPARQLFormats.jsonLD, name: "JSON-LD" },
                                { value: response_component_1.SPARQLFormats.turtle, name: "TURTLE" },
                                { value: response_component_1.SPARQLFormats.jsonRDF, name: "RDF/JSON" },
                                { value: response_component_1.SPARQLFormats.rdfXML, name: "RDF/XML" },
                                { value: response_component_1.SPARQLFormats.n3, name: "N3" },
                            ],
                        },
                        ask: {
                            name: "ASK",
                            formats: [
                                { value: response_component_1.SPARQLFormats.boolean, name: "Boolean" },
                            ],
                        },
                        update: {
                            name: "UPDATE",
                            formats: [
                                { value: response_component_1.SPARQLFormats.text, name: "Text" },
                            ]
                        },
                        clear: {
                            name: "CLEAR",
                            formats: [
                                { value: response_component_1.SPARQLFormats.text, name: "Text" },
                            ]
                        },
                        insert: {
                            name: "INSERT",
                            formats: [
                                { value: response_component_1.SPARQLFormats.text, name: "Text" },
                            ]
                        },
                        "delete": {
                            name: "DELETE",
                            formats: [
                                { value: response_component_1.SPARQLFormats.text, name: "Text" },
                            ]
                        },
                        drop: {
                            name: "DROP",
                            formats: [
                                { value: response_component_1.SPARQLFormats.text, name: "Text" },
                            ]
                        },
                        load: {
                            name: "LOAD",
                            formats: [
                                { value: response_component_1.SPARQLFormats.text, name: "Text" },
                            ]
                        },
                        create: {
                            name: "CREATE",
                            formats: [
                                { value: response_component_1.SPARQLFormats.text, name: "Text" },
                            ]
                        }
                    };
                    this.isQueryType = true;
                    this.isSending = false;
                    this.isSaving = false;
                    this.isCarbonContext = false;
                    this.responses = [];
                    this.currentQuery = {
                        endpoint: "",
                        type: this.sparqlTypes.query,
                        content: "",
                        operation: null,
                        format: null,
                        name: "",
                    };
                    this.askingQuery = {
                        endpoint: "",
                        type: this.sparqlTypes.query,
                        content: "",
                        operation: null,
                        format: null,
                        name: "",
                    };
                    this.formatsAvailable = [];
                    this.savedQueries = [];
                    this.messages = [];
                    // Regex
                    this.regExpSelect = new RegExp("((.|\n)+)?SELECT((.|\n)+)?", "i");
                    this.regExpConstruct = new RegExp("((.|\n)+)?CONSTRUCT((.|\n)+)?", "i");
                    this.regExpAsk = new RegExp("((.|\n)+)?ASK((.|\n)+)?", "i");
                    this.regExpDescribe = new RegExp("((.|\n)+)?DESCRIBE((.|\n)+)?", "i");
                    this.regExpURL = new RegExp("(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})");
                    this.regExpInsert = new RegExp("((.|\n)+)?INSERT((.|\n)+)?", "i");
                    this.regExpDelete = new RegExp("((.|\n)+)?DELETE((.|\n)+)?", "i");
                    this.regExpClear = new RegExp("((.|\n)+)?CLEAR((.|\n)+)?", "i");
                    this.regExpCreate = new RegExp("((.|\n)+)?CREATE((.|\n)+)?", "i");
                    this.regExpDrop = new RegExp("((.|\n)+)?DROP((.|\n)+)?", "i");
                    this.regExpLoad = new RegExp("((.|\n)+)?LOAD((.|\n)+)?", "i");
                    this.emitErrors = false;
                    this.errorOccurs = new core_1.EventEmitter();
                    // TODO: Make them configurable
                    this.prefixes = {
                        "acl": "http://www.w3.org/ns/auth/acl#",
                        "api": "http://purl.org/linked-data/api/vocab#",
                        "c": "https://carbonldp.com/ns/v1/platform#",
                        "cs": "https://carbonldp.com/ns/v1/security#",
                        "cp": "https://carbonldp.com/ns/v1/patch#",
                        "cc": "http://creativecommons.org/ns#",
                        "cert": "http://www.w3.org/ns/auth/cert#",
                        "dbp": "http://dbpedia.org/property/",
                        "dc": "http://purl.org/dc/terms/",
                        "dc11": "http://purl.org/dc/elements/1.1/",
                        "dcterms": "http://purl.org/dc/terms/",
                        "doap": "http://usefulinc.com/ns/doap#",
                        "example": "http://example.org/ns#",
                        "ex": "http://example.org/ns#",
                        "exif": "http://www.w3.org/2003/12/exif/ns#",
                        "fn": "http://www.w3.org/2005/xpath-functions#",
                        "foaf": "http://xmlns.com/foaf/0.1/",
                        "geo": "http://www.w3.org/2003/01/geo/wgs84_pos#",
                        "geonames": "http://www.geonames.org/ontology#",
                        "gr": "http://purl.org/goodrelations/v1#",
                        "http": "http://www.w3.org/2006/http#",
                        "ldp": "http://www.w3.org/ns/ldp#",
                        "log": "http://www.w3.org/2000/10/swap/log#",
                        "owl": "http://www.w3.org/2002/07/owl#",
                        "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
                        "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
                        "rei": "http://www.w3.org/2004/06/rei#",
                        "rsa": "http://www.w3.org/ns/auth/rsa#",
                        "rss": "http://purl.org/rss/1.0/",
                        "sd": "http://www.w3.org/ns/sparql-service-description#",
                        "sfn": "http://www.w3.org/ns/sparql#",
                        "sioc": "http://rdfs.org/sioc/ns#",
                        "skos": "http://www.w3.org/2004/02/skos/core#",
                        "swrc": "http://swrc.ontoware.org/ontology#",
                        "types": "http://rdfs.org/sioc/types#",
                        "vcard": "http://www.w3.org/2001/vcard-rdf/3.0#",
                        "wot": "http://xmlns.com/wot/0.1/",
                        "xhtml": "http://www.w3.org/1999/xhtml#",
                        "xsd": "http://www.w3.org/2001/XMLSchema#",
                    };
                    this._sparql = "";
                    this._endpoint = "";
                    this.element = element;
                    this.isSending = false;
                    this.savedQueries = this.getLocalSavedQueries() || [];
                    this.carbon = carbon;
                }
                Object.defineProperty(SPARQLClientComponent.prototype, "codeMirrorMode", {
                    // Getters and Setters
                    get: function () { return CodeMirrorComponent.Mode; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SPARQLClientComponent.prototype, "sparql", {
                    get: function () { return this._sparql; },
                    set: function (value) {
                        this._sparql = value;
                        this.currentQuery.content = value;
                        this.sparqlChanged();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SPARQLClientComponent.prototype, "endpoint", {
                    get: function () { return this._endpoint; },
                    set: function (value) {
                        this._endpoint = value;
                        this.endpointChanged();
                    },
                    enumerable: true,
                    configurable: true
                });
                SPARQLClientComponent.prototype.ngOnInit = function () {
                    if (!this.context) {
                        this.context = this.carbon;
                        this.isCarbonContext = true;
                    }
                    else {
                        this.endpoint = this.context.getBaseURI();
                    }
                };
                SPARQLClientComponent.prototype.ngAfterViewInit = function () {
                    this.$element = jquery_1.default(this.element.nativeElement);
                    this.btnSaveQuery = this.$element.find(".btnSaveQuery");
                    this.btnsGroupSaveQuery = this.$element.find(".btnsGroupSaveQuery");
                    this.btnSave = this.btnsGroupSaveQuery.find(".btnSave");
                    this.btnSaveAs = this.btnsGroupSaveQuery.find(".btnSaveAs");
                    this.sidebar = this.$element.find(".query-builder .ui.sidebar");
                    this.btnsGroupSaveQuery.find(".dropdown").dropdown();
                    this.replaceQueryConfirmationModal = this.$element.find(".ui.replace-query-confirmation.modal");
                    this.deleteQueryConfirmationModal = this.$element.find(".ui.delete-query-confirmation.modal");
                    this.initializeSavedQueriesSidebar();
                    this.initializeModal();
                };
                SPARQLClientComponent.prototype.onChangeQueryType = function ($event) {
                    var type = $event.target.value;
                    this.isQueryType = type === this.sparqlTypes.query;
                };
                /**
                 * Updates the currentQuery and the available formats depending on the SPARQL Query Operation
                 * Triggered whenever the user writes code inside the CodeMirror text area.
                 */
                SPARQLClientComponent.prototype.sparqlChanged = function () {
                    var operation = this.getSPARQLOperation(this.sparql);
                    if (operation !== null && this.sparqlQueryOperations[operation.toLowerCase()]) {
                        operation = operation.toLowerCase();
                        this.formatsAvailable = this.sparqlQueryOperations[operation].formats;
                        if (this.formatsAvailable.indexOf(this.currentQuery.format) === -1) {
                            this.currentQuery.format = this.sparqlQueryOperations[operation].formats[0].value;
                        }
                        this.currentQuery.type = this.sparqlTypes.query;
                        var queryOperations = ["select", "describe", "construct", "ask"];
                        if (queryOperations.indexOf(operation) === -1)
                            this.currentQuery.type = this.sparqlTypes.update;
                        this.currentQuery.operation = operation.toUpperCase();
                    }
                    else {
                        this.currentQuery.format = null;
                        this.currentQuery.operation = "update";
                        this.formatsAvailable = [];
                    }
                };
                /**
                 * Updates the currentQuery endpoints according to the context in which the editor is working.
                 * Triggered whenever the user writes the endpoint URI.
                 */
                SPARQLClientComponent.prototype.endpointChanged = function () {
                    if (this.regExpURL.test(this.endpoint)) {
                        this.currentQuery.endpoint = this.endpoint;
                    }
                    else {
                        this.currentQuery.endpoint = this.context.getBaseURI() + this.endpoint;
                    }
                };
                /**
                 * Identifies which SPARL Query Operation will be called
                 * @param query  String. The content of the Code Mirror plugin.
                 * @returns      String. The name of the main SPARQL Query Operation.
                 */
                SPARQLClientComponent.prototype.getSPARQLOperation = function (query) {
                    switch (true) {
                        case (this.regExpSelect.test(query)):
                            return this.sparqlQueryOperations.select.name;
                        case (this.regExpConstruct.test(query)):
                            return this.sparqlQueryOperations.construct.name;
                        case (this.regExpAsk.test(query)):
                            return this.sparqlQueryOperations.ask.name;
                        case (this.regExpDescribe.test(query)):
                            return this.sparqlQueryOperations.describe.name;
                        case (this.regExpInsert.test(query)):
                            return this.sparqlQueryOperations.insert.name;
                        case (this.regExpDelete.test(query)):
                            return this.sparqlQueryOperations.delete.name;
                        case (this.regExpClear.test(query)):
                            return this.sparqlQueryOperations.clear.name;
                        case (this.regExpCreate.test(query)):
                            return this.sparqlQueryOperations.create.name;
                        case (this.regExpDrop.test(query)):
                            return this.sparqlQueryOperations.drop.name;
                        case (this.regExpLoad.test(query)):
                            return this.sparqlQueryOperations.load.name;
                        default:
                            return null;
                    }
                };
                SPARQLClientComponent.prototype.onReExecute = function (originalResponse) {
                    originalResponse.isReExecuting = true;
                    this.execute(originalResponse.query, originalResponse).then(function (newResponse) {
                        originalResponse.duration = newResponse.duration;
                        originalResponse.resultset = Object.assign({}, newResponse.resultset);
                        originalResponse.setData = Object.assign({}, newResponse.resultset);
                        originalResponse.query = Object.assign({}, newResponse.query);
                        originalResponse.isReExecuting = false;
                    }).catch(function (error) {
                        originalResponse.isReExecuting = false;
                        throw error;
                    });
                };
                SPARQLClientComponent.prototype.onExecute = function () {
                    var _this = this;
                    this.isSending = true;
                    var query = Object.assign({}, this.currentQuery);
                    this.execute(query, null).then(function (response) {
                        _this.addResponse(response);
                        return response;
                    }).catch(function (error) {
                        if (_this.emitErrors) {
                            _this.errorOccurs.emit(_this.getMessage(error));
                        }
                        else {
                            _this.messages.push(_this.getMessage(error));
                        }
                    });
                };
                SPARQLClientComponent.prototype.onErase = function () {
                    this.currentQuery.type = this.sparqlTypes.query;
                    this.sparql = "";
                    this.endpoint = "";
                };
                SPARQLClientComponent.prototype.execute = function (query, activeResponse) {
                    var _this = this;
                    var type = query.type;
                    if (activeResponse) {
                        query = activeResponse.query;
                    }
                    var promise = null;
                    switch (type) {
                        case this.sparqlTypes.query:
                            promise = this.executeQuery(query);
                            break;
                        case this.sparqlTypes.update:
                            promise = this.executeUPDATE(query);
                            break;
                        default:
                            // Unsupported Operation
                            promise = new Promise(function (resolve, reject) {
                                reject("Unsupported Type");
                            });
                    }
                    return promise.then(function (response) {
                        // Response Success
                        _this.isSending = false;
                        return response;
                    }, function (error) {
                        // Response Fail
                        _this.isSending = false;
                        return Promise.reject(error);
                    });
                };
                SPARQLClientComponent.prototype.executeQuery = function (query) {
                    this.isSending = true;
                    switch (query.operation) {
                        case this.sparqlQueryOperations.select.name:
                            return this.executeSELECT(query);
                        case this.sparqlQueryOperations.describe.name:
                            return this.executeDESCRIBE(query);
                        case this.sparqlQueryOperations.construct.name:
                            return this.executeCONSTRUCT(query);
                        case this.sparqlQueryOperations.ask.name:
                            return this.executeASK(query);
                        default:
                            // Unsupported Operation
                            return Promise.reject("Unsupported Operation");
                    }
                };
                SPARQLClientComponent.prototype.executeSELECT = function (query) {
                    var _this = this;
                    var beforeTimestamp = (new Date()).valueOf();
                    return this.context.documents.executeRawSELECTQuery(query.endpoint, query.content).then(function (_a) {
                        var result = _a[0], response = _a[1];
                        var duration = (new Date()).valueOf() - beforeTimestamp;
                        return _this.buildResponse(duration, result, response_component_1.SPARQLResponseType.success, query);
                    }, function (error) {
                        return _this.handleError(error, query, beforeTimestamp);
                    });
                };
                SPARQLClientComponent.prototype.executeDESCRIBE = function (query) {
                    var _this = this;
                    var beforeTimestamp = (new Date()).valueOf();
                    var requestOptions = { headers: new Map().set("Accept", new HTTP.Header.Class(query.format)) };
                    return this.context.documents.executeRawDESCRIBEQuery(query.endpoint, query.content, requestOptions).then(function (_a) {
                        var result = _a[0], response = _a[1];
                        var duration = (new Date()).valueOf() - beforeTimestamp;
                        return _this.buildResponse(duration, result, response_component_1.SPARQLResponseType.success, query);
                    }, function (error) {
                        return _this.handleError(error, query, beforeTimestamp);
                    });
                };
                SPARQLClientComponent.prototype.executeCONSTRUCT = function (query) {
                    var _this = this;
                    var beforeTimestamp = (new Date()).valueOf();
                    var requestOptions = { headers: new Map().set("Accept", new HTTP.Header.Class(query.format)) };
                    return this.context.documents.executeRawCONSTRUCTQuery(query.endpoint, query.content, requestOptions).then(function (_a) {
                        var result = _a[0], response = _a[1];
                        var duration = (new Date()).valueOf() - beforeTimestamp;
                        return _this.buildResponse(duration, result, response_component_1.SPARQLResponseType.success, query);
                    }, function (error) {
                        return _this.handleError(error, query, beforeTimestamp);
                    });
                };
                SPARQLClientComponent.prototype.executeASK = function (query) {
                    var _this = this;
                    var beforeTimestamp = (new Date()).valueOf();
                    return this.context.documents.executeRawASKQuery(query.endpoint, query.content).then(function (_a) {
                        var result = _a[0], response = _a[1];
                        var duration = (new Date()).valueOf() - beforeTimestamp;
                        return _this.buildResponse(duration, result, response_component_1.SPARQLResponseType.success, query);
                    }, function (error) {
                        return _this.handleError(error, query, beforeTimestamp);
                    });
                };
                SPARQLClientComponent.prototype.executeUPDATE = function (query) {
                    var _this = this;
                    this.isSending = true;
                    var beforeTimestamp = (new Date()).valueOf();
                    return this.context.documents.executeUPDATE(query.endpoint, query.content).then(function (result) {
                        var duration = (new Date()).valueOf() - beforeTimestamp;
                        return _this.buildResponse(duration, result.request.status + " - " + result.request.statusText, response_component_1.SPARQLResponseType.success, query);
                    }, function (error) {
                        return _this.handleError(error, query, beforeTimestamp);
                    });
                };
                SPARQLClientComponent.prototype.canExecute = function () {
                    return !!(this.currentQuery.endpoint && this.currentQuery.type && this.currentQuery.content && this.currentQuery.operation && this.currentQuery.format);
                };
                SPARQLClientComponent.prototype.canSaveQuery = function () {
                    return !!(this.currentQuery.endpoint && this.currentQuery.type && this.currentQuery.content && this.currentQuery.operation && this.currentQuery.format && this.currentQuery.name);
                };
                SPARQLClientComponent.prototype.canErase = function () {
                    return (!!this.endpoint || !!this.sparql);
                };
                SPARQLClientComponent.prototype.onEmptyStack = function () {
                    this.responses = [];
                };
                SPARQLClientComponent.prototype.onRemove = function (response) {
                    var idx = this.responses.indexOf(response);
                    if (idx > -1)
                        this.responses.splice(idx, 1);
                };
                SPARQLClientComponent.prototype.onConfigureResponse = function (response) {
                    var configureQuery = this.askingQuery = Object.assign({}, response.query);
                    if (JSON.stringify(this.currentQuery) !== JSON.stringify(configureQuery)) {
                        this.toggleReplaceQueryConfirmationModal();
                    }
                    else {
                        this.loadQuery(configureQuery);
                    }
                };
                SPARQLClientComponent.prototype.addResponse = function (response) {
                    var responsesLength = this.responses.length, i;
                    for (i = responsesLength; i > 0; i--) {
                        this.responses[i] = this.responses[i - 1];
                    }
                    this.responses[0] = response;
                };
                SPARQLClientComponent.prototype.onClickSaveQuery = function () {
                    var _this = this;
                    var query = {
                        endpoint: this.currentQuery.endpoint,
                        type: this.currentQuery.type,
                        content: this.currentQuery.content,
                        operation: this.currentQuery.operation,
                        format: this.currentQuery.format,
                        name: this.currentQuery.name,
                        id: this.savedQueries.length,
                    };
                    this.isSaving = true;
                    this.savedQueries = this.getLocalSavedQueries();
                    this.savedQueries.push(query);
                    this.updateLocalSavedQueries();
                    setInterval(function () {
                        _this.isSaving = false;
                    }, 500);
                };
                SPARQLClientComponent.prototype.onClickSaveExistingQuery = function () {
                    var _this = this;
                    this.savedQueries = this.getLocalSavedQueries();
                    var queryIdx = -1;
                    this.savedQueries.forEach(function (iteratingQuery, index) {
                        if (iteratingQuery.id === _this.currentQuery.id) {
                            queryIdx = index;
                        }
                    });
                    if (queryIdx > -1) {
                        this.savedQueries[queryIdx] = {
                            endpoint: this.currentQuery.endpoint,
                            type: this.currentQuery.type,
                            content: this.currentQuery.content,
                            operation: this.currentQuery.operation,
                            format: this.currentQuery.format,
                            name: this.currentQuery.name,
                            id: this.currentQuery.id,
                        };
                    }
                    else {
                        this.currentQuery.id = this.savedQueries.length;
                        this.savedQueries.push(this.currentQuery);
                    }
                    this.updateLocalSavedQueries();
                };
                SPARQLClientComponent.prototype.onClickSavedQuery = function (selectedQuery) {
                    if (!!this.currentQuery.endpoint || !!this.currentQuery.content) {
                        if (!!this.currentQuery.endpoint && !!this.currentQuery.content) {
                            if (JSON.stringify(this.currentQuery) !== JSON.stringify(selectedQuery)) {
                                this.askConfirmationToReplace(selectedQuery);
                            }
                            else {
                                this.loadQuery(selectedQuery);
                                this.toggleSidebar();
                            }
                        }
                        else {
                            if ((!!this.currentQuery.endpoint && this.currentQuery.endpoint === selectedQuery.endpoint) ||
                                (!!this.currentQuery.content && this.currentQuery.content === selectedQuery.content)) {
                                this.loadQuery(selectedQuery);
                                this.toggleSidebar();
                            }
                            else {
                                this.askConfirmationToReplace(selectedQuery);
                            }
                        }
                    }
                    else {
                        this.loadQuery(selectedQuery);
                        this.toggleSidebar();
                    }
                };
                SPARQLClientComponent.prototype.askConfirmationToReplace = function (selectedQuery) {
                    this.askingQuery = Object.assign({}, selectedQuery);
                    this.toggleReplaceQueryConfirmationModal();
                };
                SPARQLClientComponent.prototype.onClickRemoveSavedQuery = function (index) {
                    this.savedQueries = this.getLocalSavedQueries();
                    this.askingQuery = this.savedQueries[index];
                    this.toggleDeleteQueryConfirmationModal();
                };
                SPARQLClientComponent.prototype.removeQuery = function (query) {
                    this.savedQueries = this.getLocalSavedQueries();
                    var index = this.savedQueries.indexOf(query);
                    this.savedQueries.splice(index, 1);
                    this.updateLocalSavedQueries();
                };
                SPARQLClientComponent.prototype.loadQuery = function (query) {
                    this.currentQuery = Object.assign({}, query);
                    this.askingQuery = Object.assign({}, query);
                    this.endpoint = query.endpoint;
                    this.sparql = query.content;
                };
                SPARQLClientComponent.prototype.initializeSavedQueriesSidebar = function () {
                    this.sidebar.sidebar({
                        context: this.$element.find(".query-builder .pushable"),
                    });
                };
                SPARQLClientComponent.prototype.initializeModal = function () {
                    this.deleteQueryConfirmationModal.modal({
                        closable: false,
                        blurring: true,
                    });
                    this.replaceQueryConfirmationModal.modal({
                        closable: false,
                        blurring: true,
                    });
                };
                SPARQLClientComponent.prototype.toggleReplaceQueryConfirmationModal = function () {
                    this.replaceQueryConfirmationModal.modal("toggle");
                };
                SPARQLClientComponent.prototype.toggleDeleteQueryConfirmationModal = function () {
                    this.deleteQueryConfirmationModal.modal("toggle");
                };
                SPARQLClientComponent.prototype.onApproveQueryReplacement = function (approvedQuery) {
                    this.askingQuery = {};
                    this.loadQuery(approvedQuery);
                    this.hideSidebar();
                };
                SPARQLClientComponent.prototype.onApproveQueryRemoval = function (approvedQuery) {
                    this.removeQuery(approvedQuery);
                    this.askingQuery = {};
                };
                SPARQLClientComponent.prototype.getLocalSavedQueries = function () {
                    if (!window.localStorage.getItem("savedQueries"))
                        this.updateLocalSavedQueries();
                    return JSON.parse(window.localStorage.getItem("savedQueries"));
                };
                SPARQLClientComponent.prototype.updateLocalSavedQueries = function () {
                    window.localStorage.setItem("savedQueries", JSON.stringify(this.savedQueries));
                };
                SPARQLClientComponent.prototype.toggleSidebar = function () {
                    this.sidebar.sidebar("toggle");
                };
                SPARQLClientComponent.prototype.hideSidebar = function () {
                    this.sidebar.sidebar("hide");
                };
                SPARQLClientComponent.prototype.closeMessage = function (evt) {
                    jquery_1.default(evt.srcElement).closest(".ui.message").transition("fade");
                };
                SPARQLClientComponent.prototype.getMessage = function (error) {
                    switch (typeof error) {
                        case "string":
                            return {
                                title: error,
                                content: "",
                                statusCode: "",
                                statusMessage: "",
                                endpoint: "",
                            };
                        case "object":
                            return {
                                title: error.name,
                                content: error.message,
                                statusCode: error.response.status,
                                statusMessage: error.response.request.statusText,
                                endpoint: error.response.request.responseURL,
                            };
                        default:
                            return {
                                title: error.toString(),
                            };
                    }
                };
                SPARQLClientComponent.prototype.buildResponse = function (duration, resultset, responseType, query) {
                    var clientResponse = new response_component_1.SPARQLClientResponse();
                    clientResponse.duration = duration;
                    clientResponse.resultset = resultset;
                    clientResponse.setData(resultset);
                    clientResponse.query = query;
                    clientResponse.result = responseType;
                    return clientResponse;
                };
                SPARQLClientComponent.prototype.handleError = function (error, query, beforeTimestamp) {
                    var _this = this;
                    var duration = (new Date()).valueOf() - beforeTimestamp;
                    return new Promise(function (resolve, reject) {
                        var stackErrors = [400, 403, 404, 413, 414, 429];
                        // TODO implement login modal when 401
                        if (stackErrors.indexOf(error.response.status) > -1) {
                            var errorMessage = _this.getMessage(error);
                            var errorResponse = _this.buildResponse(duration, errorMessage, response_component_1.SPARQLResponseType.error, query);
                            resolve(errorResponse);
                        }
                        else {
                            reject(error);
                        }
                    }).then(function (response) {
                        return response;
                    }, function (_error) {
                        return Promise.reject(_error);
                    });
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], SPARQLClientComponent.prototype, "context", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], SPARQLClientComponent.prototype, "emitErrors", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], SPARQLClientComponent.prototype, "errorOccurs", void 0);
                SPARQLClientComponent = __decorate([
                    core_1.Component({
                        selector: "cp-sparql-client",
                        template: sparql_client_component_html_1.default,
                        styles: [sparql_client_component_css_text_1.default],
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, Carbon_1.default])
                ], SPARQLClientComponent);
                return SPARQLClientComponent;
            }());
            exports_1("SPARQLClientComponent", SPARQLClientComponent);
            exports_1("default",SPARQLClientComponent);
        }
    }
});

//# sourceMappingURL=sparql-client.component.js.map
