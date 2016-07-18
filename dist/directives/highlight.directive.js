System.register(["@angular/core", "highlight.js", "highlight.js/styles/tomorrow-night.css!"], function(exports_1, context_1) {
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
    var core_1, highlight_js_1;
    var HighlightDirective;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (highlight_js_1_1) {
                highlight_js_1 = highlight_js_1_1;
            },
            function (_1) {}],
        execute: function() {
            HighlightDirective = (function () {
                function HighlightDirective(element) {
                    this.element = element;
                }
                HighlightDirective.prototype.ngAfterViewInit = function () {
                    var html = this.element.nativeElement.innerHTML ? this.element.nativeElement.innerHTML : "";
                    this.element.nativeElement.innerHTML = this.normalizeTabs(html);
                    highlight_js_1.default.configure({
                        tabReplace: "    ",
                    });
                    highlight_js_1.default.highlightBlock(this.element.nativeElement);
                };
                HighlightDirective.prototype.normalizeTabs = function (value) {
                    var lines = value.split(/\n/gm);
                    if (!lines[0].trim())
                        lines.shift();
                    if (lines.length > 0 && !lines[lines.length - 1].trim())
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
                HighlightDirective.prototype.getIndentation = function (line, tabs) {
                    if (tabs === void 0) { tabs = true; }
                    var indentationChar = tabs ? "\t" : " ";
                    for (var i = 0, length = line.length; i < length; i++) {
                        if (line.charAt(i) !== indentationChar)
                            break;
                    }
                    return i;
                };
                HighlightDirective.prototype.removeIndentation = function (lines, indentation, tabs) {
                    if (tabs === void 0) { tabs = true; }
                    for (var i = 0, length_1 = lines.length; i < length_1; i++) {
                        var line = lines[i];
                        if (!line.trim())
                            continue;
                        lines[i] = line.substring(indentation);
                    }
                    return lines;
                };
                HighlightDirective = __decorate([
                    core_1.Directive({
                        selector: "[cphighlight]",
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], HighlightDirective);
                return HighlightDirective;
            }());
            exports_1("HighlightDirective", HighlightDirective);
            exports_1("default",HighlightDirective);
        }
    }
});

//# sourceMappingURL=highlight.directive.js.map
