import { OnDestroy } from "@angular/core";
import * as App from "carbonldp/App";
import * as PersistedDocument from "carbonldp/PersistedDocument";
import { Message } from "carbon-panel/errors-area/error-message.component";
import { JobsService } from "../../job/jobs.service";
import "semantic-ui/semantic";
export declare class BackupExporterComponent implements OnDestroy {
    executingBackup: boolean;
    errorMessages: Message[];
    jobsService: JobsService;
    exportSuccess: boolean;
    monitorExecutionInterval: number;
    appContext: App.Context;
    backupJob: PersistedDocument.Class;
    constructor(jobsService: JobsService);
    onGenerateBackup(): void;
    monitorExecution(execution: PersistedDocument.Class): Promise<PersistedDocument.Class>;
    ngOnDestroy(): void;
    removeMessage(index: number): void;
    onCloseSuccess(): void;
}
export default BackupExporterComponent;
