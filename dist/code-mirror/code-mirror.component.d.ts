import { ElementRef, EventEmitter, AfterContentInit, OnChanges, OnDestroy } from "@angular/core";
import CodeMirror from "codemirror";
import "codemirror/mode/css/css";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/sparql/sparql";
import "codemirror/mode/xml/xml";
import "codemirror/mode/turtle/turtle";
import "codemirror/lib/codemirror.css!";
import "codemirror/theme/mbo.css!";
export declare class Class implements AfterContentInit, OnChanges, OnDestroy {
    element: ElementRef;
    mode: string;
    readOnly: boolean;
    noCursor: boolean;
    showLineNumbers: boolean;
    scroll: boolean;
    value: string;
    valueChange: EventEmitter<string>;
    codeMirror: CodeMirror.Editor;
    codeMirrorChange: EventEmitter<CodeMirror.Editor>;
    private internallyChanged;
    private lastUpdates;
    constructor(element: ElementRef);
    ngOnDestroy(): void;
    ngAfterContentInit(): void;
    ngOnChanges(changeRecord: any): void;
    private normalizeTabs(value);
    private getIndentation(line, tabs?);
    private removeIndentation(lines, indentation, tabs?);
    private setReadOnly(readOnly);
    private setNoCursor(noCursor);
}
export declare class Mode {
    static CSS: string;
    static JAVASCRIPT: string;
    static JSONLD: string;
    static JSONDRDF: string;
    static N3: string;
    static RDFXML: string;
    static CSV: string;
    static TSV: string;
    static SPARQL: string;
    static XML: string;
    static TURTLE: string;
}
export default Class;
