System.register(["@angular/core", "codemirror", "codemirror/mode/css/css", "codemirror/mode/htmlmixed/htmlmixed", "codemirror/mode/javascript/javascript", "codemirror/mode/sparql/sparql", "codemirror/mode/xml/xml", "codemirror/mode/turtle/turtle", "codemirror/lib/codemirror.css!", "codemirror/theme/mbo.css!", "./code-mirror.component.css!text"], function(exports_1, context_1) {
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
    var core_1, codemirror_1, code_mirror_component_css_text_1;
    var Class, Mode;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (codemirror_1_1) {
                codemirror_1 = codemirror_1_1;
            },
            function (_1) {},
            function (_2) {},
            function (_3) {},
            function (_4) {},
            function (_5) {},
            function (_6) {},
            function (_7) {},
            function (_8) {},
            function (code_mirror_component_css_text_1_1) {
                code_mirror_component_css_text_1 = code_mirror_component_css_text_1_1;
            }],
        execute: function() {
            Class = (function () {
                function Class(element) {
                    this.mode = Mode.JAVASCRIPT;
                    this.readOnly = false;
                    this.noCursor = false;
                    this.showLineNumbers = true;
                    this.scroll = true;
                    this.value = "";
                    this.valueChange = new core_1.EventEmitter();
                    this.codeMirrorChange = new core_1.EventEmitter();
                    this.internallyChanged = false;
                    this.lastUpdates = [];
                    this.element = element;
                }
                Class.prototype.ngOnDestroy = function () {
                    this.element.nativeElement.innerHTML = this.codeMirror.getValue();
                };
                Class.prototype.ngAfterContentInit = function () {
                    var _this = this;
                    if (!this.value)
                        this.value = this.element.nativeElement.innerHTML;
                    if (!!this.value)
                        this.value = this.normalizeTabs(this.value);
                    else
                        this.value = "";
                    this.element.nativeElement.innerHTML = "";
                    this.codeMirror = codemirror_1.default(this.element.nativeElement, {
                        lineNumbers: this.showLineNumbers,
                        indentWithTabs: true,
                        smartIndent: false,
                        electricChars: false,
                        mode: this.mode,
                        theme: "mbo",
                        value: this.value,
                        readOnly: this.readOnly
                    });
                    this.codeMirrorChange.emit(this.codeMirror);
                    if (!this.scroll) {
                        this.element.nativeElement.children[0].style.height = "auto";
                    }
                    this.codeMirror.on("change", function (changeObject) {
                        if (_this.internallyChanged) {
                            _this.internallyChanged = false;
                            return;
                        }
                        var lastUpdate = _this.codeMirror.getValue();
                        if (lastUpdate === _this.value)
                            return;
                        _this.value = lastUpdate;
                        _this.lastUpdates.push(lastUpdate);
                        _this.valueChange.emit(lastUpdate);
                    });
                };
                Class.prototype.ngOnChanges = function (changeRecord) {
                    if (!this.codeMirror)
                        return;
                    if ("readOnly" in changeRecord) {
                        var change = changeRecord.readOnly;
                        this.setReadOnly(change.currentValue);
                    }
                    if ("noCursor" in changeRecord) {
                        var change = changeRecord.noCursor;
                        this.setNoCursor(change.currentValue);
                    }
                    if ("value" in changeRecord) {
                        if (this.lastUpdates.length > 0 && this.lastUpdates[0] === changeRecord.value.currentValue) {
                            this.lastUpdates.shift();
                        }
                        else {
                            this.internallyChanged = true;
                            this.lastUpdates = [];
                            this.codeMirror.setValue(changeRecord.value.currentValue);
                        }
                    }
                };
                Class.prototype.normalizeTabs = function (value) {
                    var lines = value.split(/\n/gm);
                    if (!lines[0].trim())
                        lines.shift();
                    if (!lines[lines.length - 1].trim())
                        lines.pop();
                    var containsSomething = lines.reduce(function (previous, line) { return previous || !!line.trim(); }, false);
                    if (!containsSomething)
                        return "";
                    var tabs = null;
                    var extraIndentation = null;
                    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
                        var line = lines_1[_i];
                        if (!line.trim())
                            continue;
                        if (tabs === null)
                            tabs = line.startsWith("\t");
                        var indentation = this.getIndentation(line, tabs);
                        if (extraIndentation === null || extraIndentation > indentation)
                            extraIndentation = indentation;
                    }
                    this.removeIndentation(lines, extraIndentation, tabs);
                    return lines.length ? lines.join("\n") : "";
                };
                Class.prototype.getIndentation = function (line, tabs) {
                    if (tabs === void 0) { tabs = true; }
                    var indentationChar = tabs ? "\t" : " ";
                    for (var i = 0, length = line.length; i < length; i++) {
                        if (line.charAt(i) !== indentationChar)
                            break;
                    }
                    return i;
                };
                Class.prototype.removeIndentation = function (lines, indentation, tabs) {
                    if (tabs === void 0) { tabs = true; }
                    for (var i = 0, length_1 = lines.length; i < length_1; i++) {
                        var line = lines[i];
                        if (!line.trim())
                            continue;
                        lines[i] = line.substring(indentation);
                    }
                    return lines;
                };
                Class.prototype.setReadOnly = function (readOnly) {
                    this.codeMirror.setOption("readOnly", readOnly);
                };
                Class.prototype.setNoCursor = function (noCursor) {
                    if (noCursor)
                        this.codeMirror.setOption("readOnly", "nocursor");
                    else
                        this.setReadOnly(this.readOnly);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], Class.prototype, "mode", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], Class.prototype, "readOnly", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], Class.prototype, "noCursor", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], Class.prototype, "showLineNumbers", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], Class.prototype, "scroll", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], Class.prototype, "value", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], Class.prototype, "valueChange", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', (typeof (_a = typeof codemirror_1.default !== 'undefined' && codemirror_1.default.Editor) === 'function' && _a) || Object)
                ], Class.prototype, "codeMirror", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], Class.prototype, "codeMirrorChange", void 0);
                Class = __decorate([
                    core_1.Component({
                        selector: "cp-code-mirror",
                        template: "<ng-content></ng-content>",
                        styles: [code_mirror_component_css_text_1.default],
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], Class);
                return Class;
                var _a;
            }());
            exports_1("Class", Class);
            Mode = (function () {
                function Mode() {
                }
                Object.defineProperty(Mode, "CSS", {
                    get: function () { return "text/css"; },
                    enumerable: true,
                    configurable: true
                });
                ;
                Object.defineProperty(Mode, "JAVASCRIPT", {
                    get: function () { return "text/javascript"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Mode, "JSONLD", {
                    get: function () { return "application/ld+json"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Mode, "JSONDRDF", {
                    get: function () { return "application/json"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Mode, "N3", {
                    get: function () { return "text/turtle"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Mode, "RDFXML", {
                    get: function () { return "application/xml"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Mode, "CSV", {
                    get: function () { return "text/plain"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Mode, "TSV", {
                    get: function () { return "text/plain"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Mode, "SPARQL", {
                    get: function () { return "application/sparql-query"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Mode, "XML", {
                    get: function () { return "application/xml"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Mode, "TURTLE", {
                    get: function () { return "text/turtle"; },
                    enumerable: true,
                    configurable: true
                });
                return Mode;
            }());
            exports_1("Mode", Mode);
            exports_1("default",Class);
        }
    }
});

//# sourceMappingURL=code-mirror.component.js.map
