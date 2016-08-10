import { Component, Input, ViewChild, OnInit } from "@angular/core";

import * as App from "carbonldp/App";
import * as PersistedDocument from "carbonldp/PersistedDocument";

import { JobsService } from "../job/jobs.service";
import * as Job from "../job/job";

import { BackupImporterComponent } from "./backup-importer/backup-importer.component"
import { BackupExporterComponent } from "./backup-exporter/backup-exporter.component"
import { BackupsListComponent } from "./bacukps-list/backups-list.component"

import "semantic-ui/semantic";

import template from "./backups.component.html!";
import style from "./backups.component.css!text";

@Component( {
	selector: "cp-backup",
	template: template,
	styles: [ style ],
	directives: [ BackupExporterComponent, BackupImporterComponent, BackupsListComponent ],
} )

export class BackupsComponent implements OnInit {

	backupJob:PersistedDocument.Class;
	jobsService:JobsService;

	@ViewChild( BackupsListComponent ) backupsListComponent:BackupsListComponent;
	@Input() appContext:App.Context;

	constructor( jobsService:JobsService ) {
		this.jobsService = jobsService;
	}

	ngOnInit():void {
		this.jobsService.getJobOfType( Job.Type.EXPORT_BACKUP, this.appContext ).then( ( job:PersistedDocument.Class )=> {
			if( ! ! job ) this.backupJob = job;
			else this.jobsService.createExportBackup( this.appContext ).then( ( exportBackupJob:PersistedDocument.Class ) => {
				this.backupJob = exportBackupJob;
			} );
		} );
	}

	invokeRefreshBackupsList():void {
		this.backupsListComponent.fetchBackupsList.emit( true );
	}

}

export default BackupsComponent;
