"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var CodeMirrorComponent = require("carbonldp-panel/code-mirror/code-mirror.component");
var jquery_1 = require("jquery");
require("semantic-ui/semantic");
var ResponseComponent = (function () {
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
            template: require("./response.component.html"),
            styles: [require("./response.component.css")],
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], ResponseComponent);
    return ResponseComponent;
}());
exports.ResponseComponent = ResponseComponent;
var SPARQLResponseType = (function () {
    function SPARQLResponseType() {
    }
    SPARQLResponseType.success = "success";
    SPARQLResponseType.default = "default";
    SPARQLResponseType.error = "error";
    return SPARQLResponseType;
}());
exports.SPARQLResponseType = SPARQLResponseType;
var SPARQLFormats = (function () {
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
exports.SPARQLFormats = SPARQLFormats;
var SPARQLClientResponse = (function () {
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
exports.SPARQLClientResponse = SPARQLClientResponse;

//# sourceMappingURL=response.component.js.map
