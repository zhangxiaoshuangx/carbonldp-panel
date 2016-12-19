import { ElementRef, EventEmitter, AfterViewInit, OnInit } from "@angular/core";
import * as CodeMirrorComponent from "carbonldp-panel/code-mirror/code-mirror.component";
import "semantic-ui/semantic";
export declare class ResponseComponent implements AfterViewInit, OnInit {
    element: ElementRef;
    $element: JQuery;
    outputformat: string;
    response: SPARQLClientResponse;
    prefixes: {
        [prefix: string]: string;
    };
    onRemove: EventEmitter<SPARQLClientResponse>;
    onConfigure: EventEmitter<SPARQLClientResponse>;
    onReExecute: EventEmitter<SPARQLClientResponse>;
    sparqlFormats: SPARQLFormats;
    readonly codeMirrorMode: typeof CodeMirrorComponent.Mode;
    accordion: any;
    accordionOpen: boolean;
    menu: any;
    readonly responseType: typeof SPARQLResponseType;
    constructor(element: ElementRef);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    toggleAccordion(): void;
    openAccordion(): void;
    onRemoveResponse(event: any): void;
    onOpen(): void;
    onClose(): void;
    onLoadTab(): void;
    onConfigureResponse(event: any): void;
    onReExecuteResponse(event: any): void;
    getCodeMirrorMode(format: string): string;
}
export declare class SPARQLResponseType {
    static success: string;
    static default: string;
    static error: string;
}
export declare class SPARQLFormats {
    static table: string;
    static xml: string;
    static csv: string;
    static tsv: string;
    static jsonLD: string;
    static turtle: string;
    static jsonRDF: string;
    static rdfXML: string;
    static n3: string;
    static ntriples: string;
    static trix: string;
    static trig: string;
    static binary: string;
    static nquads: string;
    static rdfa: string;
    static boolean: string;
    static text: string;
}
export interface SPARQLQuery {
    endpoint: string;
    type: string;
    content: string;
    operation: string;
    format: string;
    name: string;
    id: number;
}
export declare class SPARQLClientResponse {
    duration: number;
    resultset: any;
    query: SPARQLQuery;
    result: string;
    isReExecuting: boolean;
    data: string;
    setData(data: any): void;
}
