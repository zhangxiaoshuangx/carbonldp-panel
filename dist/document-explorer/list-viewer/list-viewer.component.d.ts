import { ElementRef, EventEmitter, OnInit } from "@angular/core";
import "semantic-ui/semantic";
import * as RDFNode from "carbonldp/RDF/RDFNode";
export declare class ListViewerComponent implements OnInit {
    element: ElementRef;
    list: RDFNode.Class[];
    onGoToBNode: EventEmitter<string>;
    headers: string[];
    constructor(element: ElementRef);
    ngOnInit(): void;
    hasCommonHeaders(): boolean;
    hasHeader(value: string): boolean;
    getHeaders(): string[];
    goToBNode(id: string): void;
    isBNode(uri: string): boolean;
}
export default ListViewerComponent;
