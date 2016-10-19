import Carbon from "carbonldp/Carbon";
import * as HTTP from "carbonldp/HTTP";
import * as SDKContext from "carbonldp/SDKContext";
import * as RDFDocument from "carbonldp/RDF/Document";
import * as PersistedDocument from "carbonldp/PersistedDocument";
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
    createChild(context: SDKContext.Class, parentURI: string, content: any, childSlug?: string): Promise<[PersistedDocument.Class, HTTP.Response.Class]>;
    update(uri: string, body: string, documentContext: SDKContext.Class): Promise<RDFDocument.Class>;
    private callUpdate(uri, body, eTag, documentContext);
}
export default DocumentsResolverService;
