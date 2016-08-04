import { ElementRef, EventEmitter, OnInit, AfterViewInit } from "@angular/core";
import Carbon from "carbonldp/Carbon";
import Context from "carbonldp/Context";
import * as SPARQL from "carbonldp/SPARQL";
import * as HTTP from "carbonldp/HTTP";
import { SPARQLClientResponse, SPARQLQuery } from "./response/response.component";
import * as CodeMirrorComponent from "carbon-panel/code-mirror/code-mirror.component";
import "semantic-ui/semantic";
export declare class SPARQLClientComponent implements OnInit, AfterViewInit {
    sparqlTypes: SPARQLTypes;
    sparqlQueryOperations: SPARQLQueryOperations;
    isQueryType: boolean;
    isSending: boolean;
    isSaving: boolean;
    isCarbonContext: boolean;
    responses: SPARQLClientResponse[];
    currentQuery: SPARQLQuery;
    askingQuery: SPARQLQuery;
    formatsAvailable: any;
    savedQueries: SPARQLQuery[];
    messages: any[];
    btnsGroupSaveQuery: JQuery;
    btnSaveQuery: JQuery;
    btnSave: JQuery;
    btnSaveAs: JQuery;
    sidebar: JQuery;
    replaceQueryConfirmationModal: JQuery;
    deleteQueryConfirmationModal: JQuery;
    regExpSelect: RegExp;
    regExpConstruct: RegExp;
    regExpAsk: RegExp;
    regExpDescribe: RegExp;
    regExpURL: RegExp;
    regExpInsert: RegExp;
    regExpDelete: RegExp;
    regExpClear: RegExp;
    regExpCreate: RegExp;
    regExpDrop: RegExp;
    regExpLoad: RegExp;
    context: Context;
    emitErrors: boolean;
    errorOccurs: EventEmitter<any>;
    private element;
    private prefixes;
    private $element;
    private carbon;
    private _sparql;
    private _endpoint;
    codeMirrorMode: typeof CodeMirrorComponent.Mode;
    sparql: string;
    endpoint: string;
    constructor(element: ElementRef, carbon: Carbon);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    onChangeQueryType($event: JQueryEventObject): void;
    /**
     * Updates the currentQuery and the available formats depending on the SPARQL Query Operation
     * Triggered whenever the user writes code inside the CodeMirror text area.
     */
    sparqlChanged(): void;
    /**
     * Updates the currentQuery endpoints according to the context in which the editor is working.
     * Triggered whenever the user writes the endpoint URI.
     */
    endpointChanged(): void;
    /**
     * Identifies which SPARL Query Operation will be called
     * @param query  String. The content of the Code Mirror plugin.
     * @returns      String. The name of the main SPARQL Query Operation.
     */
    getSPARQLOperation(query: string): string;
    onReExecute(originalResponse: SPARQLClientResponse): void;
    onExecute(): void;
    onErase(): void;
    execute(query: SPARQLQuery, activeResponse?: SPARQLClientResponse): Promise<SPARQLClientResponse>;
    executeQuery(query: SPARQLQuery): Promise<SPARQLClientResponse>;
    executeSELECT(query: SPARQLQuery): Promise<SPARQLClientResponse>;
    executeDESCRIBE(query: SPARQLQuery): Promise<SPARQLClientResponse>;
    executeCONSTRUCT(query: SPARQLQuery): Promise<SPARQLClientResponse>;
    executeASK(query: SPARQLQuery): Promise<SPARQLClientResponse>;
    executeUPDATE(query: SPARQLQuery): Promise<SPARQLClientResponse>;
    canExecute(): boolean;
    canSaveQuery(): boolean;
    canErase(): boolean;
    onEmptyStack(): void;
    onRemove(response: any): void;
    onConfigureResponse(response: SPARQLClientResponse): void;
    addResponse(response: SPARQLClientResponse): void;
    onClickSaveQuery(): void;
    onClickSaveExistingQuery(): void;
    onClickSavedQuery(selectedQuery: SPARQLQuery): void;
    askConfirmationToReplace(selectedQuery: SPARQLQuery): void;
    onClickRemoveSavedQuery(index: number): void;
    removeQuery(query: SPARQLQuery): void;
    loadQuery(query: SPARQLQuery): void;
    initializeSavedQueriesSidebar(): void;
    initializeModal(): void;
    toggleReplaceQueryConfirmationModal(): void;
    toggleDeleteQueryConfirmationModal(): void;
    onApproveQueryReplacement(approvedQuery: SPARQLQuery): void;
    onApproveQueryRemoval(approvedQuery: SPARQLQuery): void;
    getLocalSavedQueries(): SPARQLQuery[];
    updateLocalSavedQueries(): void;
    toggleSidebar(): void;
    hideSidebar(): void;
    closeMessage(evt: any): void;
    getMessage(error: any): Message;
    buildResponse(duration: number, resultset: SPARQL.RawResults.Class | string | Message, responseType: string, query: SPARQLQuery): SPARQLClientResponse;
    handleError(error: HTTP.Errors.Error, query: SPARQLQuery, beforeTimestamp: number): Promise<SPARQLClientResponse>;
}
export interface SPARQLQueryOperationFormat {
    name: string;
    value: string;
}
export interface SPARQLQueryOperation {
    name: string;
    formats: SPARQLQueryOperationFormat[];
}
export interface SPARQLQueryOperations {
    select: SPARQLQueryOperation;
    describe: SPARQLQueryOperation;
    construct: SPARQLQueryOperation;
    ask: SPARQLQueryOperation;
    insert: SPARQLQueryOperation;
    "delete": SPARQLQueryOperation;
    clear: SPARQLQueryOperation;
    create: SPARQLQueryOperation;
    drop: SPARQLQueryOperation;
    load: SPARQLQueryOperation;
}
export interface SPARQLTypes {
    query: string;
    update: string;
}
export interface Message {
    title: string;
    content: string;
    statusCode: string;
    statusMessage: string;
    endpoint: string;
}
export default SPARQLClientComponent;
