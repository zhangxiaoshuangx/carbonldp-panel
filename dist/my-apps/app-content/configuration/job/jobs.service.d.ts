import { Carbon } from "carbonldp/Carbon";
import * as App from "carbonldp/App";
import * as PersistedDocument from "carbonldp/PersistedDocument";
export declare class JobsService {
    carbon: Carbon;
    appContextsJobs: Map<string, Map<string, PersistedDocument.Class>>;
    constructor(carbon: Carbon);
    getJobOfType(type: string, appContext: App.Context): Promise<PersistedDocument.Class>;
    getAll(appContext: App.Context): Promise<PersistedDocument.Class[]>;
    createExportBackup(appContext: App.Context): Promise<PersistedDocument.Class>;
    createImportBackup(backupURI: string, appContext: App.Context): Promise<PersistedDocument.Class>;
    runJob(job: PersistedDocument.Class): Promise<PersistedDocument.Class>;
    checkJobExecution(jobExecution: PersistedDocument.Class): Promise<PersistedDocument.Class>;
}
