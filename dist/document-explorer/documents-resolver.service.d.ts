import Carbon from "carbonldp/Carbon";
import * as SDKContext from "carbonldp/SDKContext";
import * as RDFDocument from "carbonldp/RDF/Document";
export declare class DocumentsResolverService {
    carbon: Carbon;
    documents: Map<string, {
        document: RDFDocument.Class;
        ETag: string;
    }>;
    private parser;
    constructor(carbon: Carbon);
    get(uri: string, documentContext: SDKContext.Class): Promise<RDFDocument.Class>;
    getAll(): Promise<RDFDocument.Class[]>;
    update(uri: string, body: string, documentContext: SDKContext.Class): Promise<RDFDocument.Class>;
    private callUpdate(uri, body, eTag, documentContext);
}
export default DocumentsResolverService;
