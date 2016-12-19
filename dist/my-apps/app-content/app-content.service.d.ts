import { EventEmitter } from '@angular/core';
import * as App from "./app";
export declare class AppContentService {
    private _activeapp;
    activeApp: App.Class;
    onAppHasChanged: EventEmitter<App.Class>;
    constructor();
}
