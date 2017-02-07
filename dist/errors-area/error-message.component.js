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
var jquery_1 = require("jquery");
require("semantic-ui/semantic");
var ErrorMessageComponent = (function () {
    function ErrorMessageComponent(element) {
        this.closable = false;
        this.showStack = false;
        this.onClose = new core_1.EventEmitter();
        this.element = element;
        this.$element = jquery_1.default(this.element.nativeElement);
    }
    ErrorMessageComponent.prototype.ngOnChanges = function (changes) {
        if (!!changes["message"].currentValue && changes["message"].currentValue !== changes["message"].previousValue) {
            this.decomposeMessage();
        }
    };
    ErrorMessageComponent.prototype.ngAfterViewInit = function () {
        this.$element.find(".ui.stack.accordion").accordion();
    };
    ErrorMessageComponent.prototype.decomposeMessage = function () {
        this.title = this.message.title;
        this.content = this.message.content;
        this.statusCode = this.message.statusCode;
        this.statusMessage = this.message.statusMessage;
        this.endpoint = this.message.endpoint;
        this.errors = this.message.errors;
        this.stack = this.message.stack;
    };
    ErrorMessageComponent.prototype.close = function (event, messageDiv) {
        var _this = this;
        jquery_1.default(messageDiv).transition({
            animation: "fade",
            onComplete: function () { _this.onClose.emit(true); }
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ErrorMessageComponent.prototype, "title", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ErrorMessageComponent.prototype, "content", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ErrorMessageComponent.prototype, "statusCode", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ErrorMessageComponent.prototype, "statusMessage", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ErrorMessageComponent.prototype, "endpoint", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ErrorMessageComponent.prototype, "message", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ErrorMessageComponent.prototype, "errors", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ErrorMessageComponent.prototype, "closable", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ErrorMessageComponent.prototype, "stack", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ErrorMessageComponent.prototype, "showStack", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ErrorMessageComponent.prototype, "onClose", void 0);
    ErrorMessageComponent = __decorate([
        core_1.Component({
            selector: "cp-error-message",
            template: require("./error-message.component.html"),
            styles: [require("./error-message.component.css")],
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], ErrorMessageComponent);
    return ErrorMessageComponent;
}());
exports.ErrorMessageComponent = ErrorMessageComponent;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ErrorMessageComponent;

//# sourceMappingURL=error-message.component.js.map
