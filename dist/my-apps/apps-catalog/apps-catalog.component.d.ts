/// <reference types="jquery" />
/// <reference types="jstree" />
import { ElementRef, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import Carbon from "carbonldp/Carbon";
import * as HTTP from "carbonldp/HTTP";
import { MyAppsSidebarService } from "./../my-apps-sidebar.service";
import * as App from "./../app-content/app";
import { Message } from "carbonldp-panel/messages-area/message.component";
import { AppContextService } from "./../app-context.service";
import "semantic-ui/semantic";
export declare class AppsCatalogComponent implements OnInit {
    apps: App.Class[];
    results: App.Class[];
    loading: boolean;
    tileView: boolean;
    searchBox: JQuery;
    errorMessage: string;
    warningMessage: string;
    askingApp: App.Class;
    deleteAppConfirmationModal: JQuery;
    deleting: boolean;
    deleteError: Message;
    private element;
    private $element;
    private router;
    private route;
    private carbon;
    private appContextService;
    private myAppsSidebarService;
    constructor(element: ElementRef, router: Router, route: ActivatedRoute, appContextService: AppContextService, carbon: Carbon, myAppsSidebarService: MyAppsSidebarService);
    ngOnInit(): void;
    activateGridView(): void;
    activateListView(): void;
    searchApp(term: string): void;
    askConfirmationToDeleteApp(selectedApp: App.Class): void;
    toggleDeleteConfirmationModal(): void;
    onApproveAppDeletion(approvedApp: App.Class): void;
    openApp(app: App.Class): void;
    deleteApp(app: App.Class): Promise<HTTP.Response.Class>;
    getErrorMessage(error: HTTP.Errors.Error): Message;
    closeErrorMessage(evt: any): void;
    initializeModal(): void;
    refreshApps(): void;
    fetchApps(): void;
    private loadApps();
}
export default AppsCatalogComponent;
