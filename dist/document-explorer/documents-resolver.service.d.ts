import { Carbon } from "carbonldp/Carbon";
import * as HTTP from "carbonldp/HTTP";
import * as SDKContext from "carbonldp/SDKContext";
import * as RDFDocument from "carbonldp/RDF/Document";
import * as PersistedDocument from "carbonldp/PersistedDocument";
import * as AccessPoint from "carbonldp/AccessPoint";
export declare class DocumentsResolverService {
    carbon: Carbon;
    documents: Map<string, {
        document: RDFDocument.Class;
        ETag: string;
    }>;
    private parser;
    constructor(carbon: Carbon);
    get(uri: string, documentContext: SDKContext.Class): Promise<RDFDocument.Class | null>;
    getAll(): Promise<RDFDocument.Class[]>;
    createChild(context: SDKContext.Class, parentURI: string, content: any, childSlug?: string): Promise<PersistedDocument.Class>;
    createAccessPoint(document: PersistedDocument.Class, accessPoint: AccessPoint.Class, slug?: string): Promise<PersistedDocument.Class>;
    delete(context: SDKContext.Class, documentURI: string): Promise<HTTP.Response.Class>;
    update(uri: string, body: string, documentContext: SDKContext.Class): Promise<RDFDocument.Class>;
    private callUpdate(uri, body, eTag, documentContext);
}
