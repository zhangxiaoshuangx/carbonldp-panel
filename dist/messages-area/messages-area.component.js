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
var messages_area_service_1 = require("./messages-area.service");
require("semantic-ui/semantic");
var MessagesAreaComponent = (function () {
    function MessagesAreaComponent(errorsAreaService) {
        this.messages = [];
        this.messagesAreaService = errorsAreaService;
    }
    MessagesAreaComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.messagesAreaService.addMessageEmitter.subscribe(function (message) {
            _this.messages.push(message);
        });
    };
    MessagesAreaComponent.prototype.removeMessage = function (index) {
        this.messages.splice(index, 1);
    };
    return MessagesAreaComponent;
}());
MessagesAreaComponent = __decorate([
    core_1.Component({
        selector: "cp-messages-area",
        templateUrl: "./messages-area.component.html",
        styleUrls: ["./messages-area.component.scss"],
    }),
    __metadata("design:paramtypes", [messages_area_service_1.MessagesAreaService])
], MessagesAreaComponent);
exports.MessagesAreaComponent = MessagesAreaComponent;
