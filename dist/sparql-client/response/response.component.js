System.register(["@angular/core", "carbon-panel/code-mirror/code-mirror.component", "../resultset-table/resultset-table.component", "jquery", "semantic-ui/semantic", "./response.component.html!", "./response.component.css!text"], function(exports_1, context_1) {
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
    var core_1, CodeMirrorComponent, resultset_table_component_1, jquery_1, response_component_html_1, response_component_css_text_1;
    var ResponseComponent, SPARQLResponseType, SPARQLFormats, SPARQLClientResponse;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (CodeMirrorComponent_1) {
                CodeMirrorComponent = CodeMirrorComponent_1;
            },
            function (resultset_table_component_1_1) {
                resultset_table_component_1 = resultset_table_component_1_1;
            },
            function (jquery_1_1) {
                jquery_1 = jquery_1_1;
            },
            function (_1) {},
            function (response_component_html_1_1) {
                response_component_html_1 = response_component_html_1_1;
            },
            function (response_component_css_text_1_1) {
                response_component_css_text_1 = response_component_css_text_1_1;
            }],
        execute: function() {
            ResponseComponent = (function () {
                function ResponseComponent(element) {
                    this.onRemove = new core_1.EventEmitter();
                    this.onConfigure = new core_1.EventEmitter();
                    this.onReExecute = new core_1.EventEmitter();
                    this.sparqlFormats = SPARQLFormats;
                    this.accordionOpen = true;
                    this.element = element;
                }
                Object.defineProperty(ResponseComponent.prototype, "codeMirrorMode", {
                    get: function () { return CodeMirrorComponent.Mode; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ResponseComponent.prototype, "responseType", {
                    get: function () { return SPARQLResponseType; },
                    enumerable: true,
                    configurable: true
                });
                ResponseComponent.prototype.ngOnInit = function () {
                    this.outputformat = this.response.query.format;
                    var format = this.getCodeMirrorMode(this.response.query.format);
                    this.outputformat = !!format ? format : this.outputformat;
                };
                ResponseComponent.prototype.ngAfterViewInit = function () {
                    this.$element = jquery_1.default(this.element.nativeElement);
                    this.accordion = this.$element.find(".accordion");
                    this.accordion.accordion({
                        onOpen: this.onOpen.bind(this),
                        onClose: this.onClose.bind(this),
                    });
                    this.menu = this.$element.find(".content .tabular.menu > .item");
                    this.menu.tab({
                        context: this.$element.find(".tabs"),
                        childrenOnly: true,
                        onLoad: this.onLoadTab.bind(this),
                    });
                    this.openAccordion();
                };
                ResponseComponent.prototype.toggleAccordion = function () {
                    this.accordion.accordion("toggle");
                };
                ResponseComponent.prototype.openAccordion = function () {
                    this.accordion.accordion("open", 0);
                };
                ResponseComponent.prototype.onRemoveResponse = function (event) {
                    this.onRemove.emit(this.response);
                    event.stopPropagation();
                };
                ResponseComponent.prototype.onOpen = function () {
                    this.accordionOpen = true;
                    this.$element.find(".CodeMirror").each(function (i, element) {
                        element.CodeMirror.refresh();
                    });
                };
                ResponseComponent.prototype.onClose = function () {
                    this.accordionOpen = false;
                };
                ResponseComponent.prototype.onLoadTab = function () {
                    this.$element.find(".CodeMirror").each(function (i, element) {
                        element.CodeMirror.refresh();
                    });
                };
                ResponseComponent.prototype.onConfigureResponse = function (event) {
                    this.onConfigure.emit(this.response);
                    event.stopPropagation();
                };
                ResponseComponent.prototype.onReExecuteResponse = function (event) {
                    this.onReExecute.emit(this.response);
                    this.accordion.accordion("open", 0);
                    event.stopPropagation();
                };
                ResponseComponent.prototype.getCodeMirrorMode = function (format) {
                    switch (format) {
                        case SPARQLFormats.csv:
                            return CodeMirrorComponent.Mode.CSV;
                        case SPARQLFormats.xml:
                            return CodeMirrorComponent.Mode.XML;
                        case SPARQLFormats.jsonLD:
                            return CodeMirrorComponent.Mode.JSONLD;
                        case SPARQLFormats.jsonRDF:
                            return CodeMirrorComponent.Mode.JSONDRDF;
                        case SPARQLFormats.n3:
                            return CodeMirrorComponent.Mode.N3;
                        case SPARQLFormats.rdfXML:
                            return CodeMirrorComponent.Mode.RDFXML;
                        case SPARQLFormats.tsv:
                            return CodeMirrorComponent.Mode.TSV;
                        case SPARQLFormats.turtle:
                            return CodeMirrorComponent.Mode.TURTLE;
                        case SPARQLFormats.boolean:
                            return CodeMirrorComponent.Mode.JAVASCRIPT;
                        default:
                            return null;
                    }
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], ResponseComponent.prototype, "outputformat", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', SPARQLClientResponse)
                ], ResponseComponent.prototype, "response", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], ResponseComponent.prototype, "prefixes", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], ResponseComponent.prototype, "onRemove", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], ResponseComponent.prototype, "onConfigure", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], ResponseComponent.prototype, "onReExecute", void 0);
                ResponseComponent = __decorate([
                    core_1.Component({
                        selector: "cp-sparql-response",
                        styles: [response_component_css_text_1.default],
                        directives: [CodeMirrorComponent.Class, resultset_table_component_1.ResultsetTableComponent],
                        template: response_component_html_1.default,
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], ResponseComponent);
                return ResponseComponent;
            }());
            exports_1("ResponseComponent", ResponseComponent);
            SPARQLResponseType = (function () {
                function SPARQLResponseType() {
                }
                SPARQLResponseType.success = "success";
                SPARQLResponseType.default = "default";
                SPARQLResponseType.error = "error";
                return SPARQLResponseType;
            }());
            exports_1("SPARQLResponseType", SPARQLResponseType);
            SPARQLFormats = (function () {
                function SPARQLFormats() {
                }
                SPARQLFormats.table = "table";
                SPARQLFormats.xml = "application/xml";
                SPARQLFormats.csv = "text/csv";
                SPARQLFormats.tsv = "text/tsv";
                SPARQLFormats.jsonLD = "application/ld+json";
                SPARQLFormats.turtle = "text/turtle";
                SPARQLFormats.jsonRDF = "application/rdf+json";
                SPARQLFormats.rdfXML = "application/rdf+xml";
                SPARQLFormats.n3 = "text/n3";
                SPARQLFormats.ntriples = "text/plain";
                SPARQLFormats.trix = "application/trix";
                SPARQLFormats.trig = "application/x-trig";
                SPARQLFormats.binary = "application/x-binary-rdf.";
                SPARQLFormats.nquads = "text/x-nquads";
                SPARQLFormats.rdfa = "application/xhtml+xml";
                SPARQLFormats.boolean = "boolean";
                SPARQLFormats.text = "text/plain";
                return SPARQLFormats;
            }());
            exports_1("SPARQLFormats", SPARQLFormats);
            SPARQLClientResponse = (function () {
                function SPARQLClientResponse() {
                    this.duration = null;
                    this.resultset = null;
                    this.query = null;
                    this.result = null;
                    this.isReExecuting = false;
                    this.data = null;
                }
                SPARQLClientResponse.prototype.setData = function (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data, null, 2);
                    }
                    this.data = data;
                };
                return SPARQLClientResponse;
            }());
            exports_1("SPARQLClientResponse", SPARQLClientResponse);
        }
    }
});

//# sourceMappingURL=response.component.js.map
