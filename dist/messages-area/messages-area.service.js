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
var MessagesAreaService = (function () {
    function MessagesAreaService() {
        this.addMessageEmitter = new core_1.EventEmitter();
    }
    MessagesAreaService.prototype.addMessage = function (titleOrMessage, content, type, statusCode, statusMessage, endpoint, duration) {
        var message = {};
        if (typeof titleOrMessage === "string") {
            message.title = titleOrMessage;
            message.content = content;
            message.type = type;
            message.statusCode = statusCode;
            message.statusMessage = statusMessage;
            message.endpoint = endpoint;
            message.duration = duration;
        }
        else {
            message = titleOrMessage;
        }
        this.addMessageEmitter.emit(message);
    };
    return MessagesAreaService;
}());
MessagesAreaService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], MessagesAreaService);
exports.MessagesAreaService = MessagesAreaService;
