import { OnInit } from "@angular/core";
import * as App from "carbonldp/App";
import * as PersistedDocument from "carbonldp/PersistedDocument";
import { JobsService } from "../job/jobs.service";
import { BackupsListComponent } from "./bacukps-list/backups-list.component";
import "semantic-ui/semantic";
export declare class BackupsComponent implements OnInit {
    backupJob: PersistedDocument.Class;
    jobsService: JobsService;
    backupsListComponent: BackupsListComponent;
    appContext: App.Context;
    constructor(jobsService: JobsService);
    ngOnInit(): void;
    invokeRefreshBackupsList(): void;
}
export default BackupsComponent;
