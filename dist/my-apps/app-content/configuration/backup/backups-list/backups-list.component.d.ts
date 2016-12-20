/// <reference types="jquery" />
/// <reference types="jstree" />
import { ElementRef, EventEmitter, SimpleChange, AfterViewInit, OnChanges, OnDestroy } from "@angular/core";
import * as App from "carbonldp/App";
import * as Response from "carbonldp/HTTP/Response";
import * as PersistedDocument from "carbonldp/PersistedDocument";
import { BackupsService } from "../backups.service";
import { Message } from "./../../../../../errors-area/error-message.component";
import "semantic-ui/semantic";
export declare class BackupsListComponent implements AfterViewInit, OnChanges, OnDestroy {
    element: ElementRef;
    $element: JQuery;
    $deleteBackupConfirmationModal: JQuery;
    fetchBackupsListInterval: number;
    backupsService: BackupsService;
    backups: PersistedDocument.Class[];
    askingBackupToRemove: PersistedDocument.Class;
    loadingBackups: boolean;
    deletingBackup: boolean;
    errorMessages: Message[];
    refreshPeriod: number;
    deleteMessages: Message[];
    failedDownloadMessage: Message;
    backupJob: PersistedDocument.Class;
    appContext: App.Context;
    fetchBackupsList: EventEmitter<boolean>;
    constructor(element: ElementRef, backupsService: BackupsService);
    ngAfterViewInit(): void;
    ngOnChanges(changes: {
        [propName: string]: SimpleChange;
    }): void;
    ngOnDestroy(): void;
    initializeModals(): void;
    monitorBackups(): void;
    getBackups(): Promise<PersistedDocument.Class[]>;
    downloadBackup(uri: string, downLoadButton: HTMLButtonElement): void;
    closeFailedDownloadMessage(): void;
    askToDeleteBackup(askingBackupToRemove: PersistedDocument.Class): void;
    deleteBackup(backup: PersistedDocument.Class): Promise<Response.Class>;
    refreshList(): void;
    removeDeleteErrorMessage(index: number): void;
    closeDeleteModal(): void;
}
export default BackupsListComponent;
