import { Carbon } from "carbonldp/Carbon";
import * as HTTP from "carbonldp/HTTP";
import * as SDKContext from "carbonldp/SDKContext";
import * as PersistedDocument from "carbonldp/PersistedDocument";
import * as Pointer from "carbonldp/Pointer";
export declare class BackupsService {
    carbon: Carbon;
    constructor(carbon: Carbon);
    upload(file: Blob, appContext: SDKContext.Class): Promise<[Pointer.Class, HTTP.Response.Class]>;
    getAll(appContext: SDKContext.Class): Promise<[PersistedDocument.Class[], HTTP.Response.Class]>;
    getDownloadURL(documentURI: string): Promise<string>;
    delete(uri: string, appContext: SDKContext.Class): Promise<HTTP.Response.Class>;
    private convertToNonRDFSource(backupPointer);
    private extendSchemasForBackups();
}
