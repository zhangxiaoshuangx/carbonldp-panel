import { OnInit } from "@angular/core";
import * as App from "carbonldp/App";
import * as PersistedDocument from "carbonldp/PersistedDocument";
import { JobsService } from "../job/jobs.service";
import "semantic-ui/semantic";
export declare class BackupsComponent implements OnInit {
    backupJob: PersistedDocument.Class;
    jobsService: JobsService;
    appContext: App.Context;
    constructor(jobsService: JobsService);
    ngOnInit(): void;
}
export default BackupsComponent;
