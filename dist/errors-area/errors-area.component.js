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
var core_1 = require("@angular/core");
var errors_area_service_1 = require("./errors-area.service");
require("semantic-ui/semantic");
var ErrorsAreaComponent = (function () {
    function ErrorsAreaComponent(errorsAreaService) {
        this.messages = [];
        this.errorsAreaService = errorsAreaService;
    }
    ErrorsAreaComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.errorsAreaService.addErrorEmitter.subscribe(function (message) {
            _this.messages.push(message);
        });
    };
    ErrorsAreaComponent.prototype.removeMessage = function (event, message, index) {
        this.messages.splice(index, 1);
    };
    ErrorsAreaComponent = __decorate([
        core_1.Component({
            selector: "cp-errors-area",
            templateUrl: "./errors-area.component.html",
            styleUrls: ["./errors-area.component.scss"],
        }), 
        __metadata('design:paramtypes', [errors_area_service_1.ErrorsAreaService])
    ], ErrorsAreaComponent);
    return ErrorsAreaComponent;
}());
exports.ErrorsAreaComponent = ErrorsAreaComponent;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ErrorsAreaComponent;

//# sourceMappingURL=errors-area.component.js.map
