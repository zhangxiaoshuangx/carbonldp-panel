"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app_content_service_1 = require("./../../app-content/app-content.service");
var messages_area_service_1 = require("carbonldp-panel/messages-area/messages-area.service");
var SPARQLClientView = (function () {
    function SPARQLClientView(messagesAreaService, appContentService) {
        var _this = this;
        this.canDisplay = true;
        this.appContext = appContentService.activeApp.context;
        this.messagesAreaService = messagesAreaService;
        appContentService.onAppHasChanged.subscribe(function (app) {
            _this.appContext = appContentService.activeApp.context;
            _this.canDisplay = false;
            setTimeout(function () { _this.canDisplay = true; }, 0);
        });
    }
    SPARQLClientView.prototype.notifyErrorAreaService = function (error) {
        this.messagesAreaService.addMessage(error.title, error.content, error.type, error.statusCode, error.statusMessage, error.endpoint);
    };
    return SPARQLClientView;
}());
SPARQLClientView = __decorate([
    core_1.Component({
        selector: "cp-sparql-client-view",
        templateUrl: "./sparql-client.view.html",
        styles: [":host { display: block; }"],
    }),
    __metadata("design:paramtypes", [messages_area_service_1.MessagesAreaService, app_content_service_1.AppContentService])
], SPARQLClientView);
exports.SPARQLClientView = SPARQLClientView;
