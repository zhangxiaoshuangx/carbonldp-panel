import * as App from "carbonldp/App";
import * as PersistedDocument from "carbonldp/PersistedDocument";
import { Message } from "carbon-panel/errors-area/error-message.component";
import { JobsService } from "../../job/jobs.service";
import "semantic-ui/semantic";
export declare class BackupExporterComponent {
    executingBackup: boolean;
    appContext: App.Context;
    backupJob: PersistedDocument.Class;
    errorMessages: Message[];
    jobsService: JobsService;
    exportSuccess: boolean;
    constructor(jobsService: JobsService);
    onGenerateBackup(): void;
    monitorExecution(execution: PersistedDocument.Class): Promise<PersistedDocument.Class>;
    removeMessage(index: number): void;
    onCloseSuccess(): void;
}
export default BackupExporterComponent;
