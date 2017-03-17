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
var $ = require("jquery");
require("semantic-ui/semantic");
var MessageComponent = (function () {
    function MessageComponent(element) {
        this.type = Types.NORMAL;
        this.closable = false;
        this.showStack = false;
        this.onClose = new core_1.EventEmitter();
        this.element = element;
        this.$element = $(this.element.nativeElement);
    }
    MessageComponent.prototype.ngOnChanges = function (changes) {
        if (!!changes["message"].currentValue && changes["message"].currentValue !== changes["message"].previousValue) {
            this.decomposeMessage();
        }
    };
    MessageComponent.prototype.ngAfterViewInit = function () {
        this.$element.find(".ui.stack.accordion").accordion();
    };
    MessageComponent.prototype.decomposeMessage = function () {
        var _this = this;
        this.title = this.message.title;
        this.content = this.message.content;
        this.statusCode = this.message.statusCode;
        this.statusMessage = this.message.statusMessage;
        this.endpoint = this.message.endpoint;
        this.errors = this.message.errors;
        this.stack = this.message.stack;
        this.type = this.message.type;
        if (typeof this.message.duration !== "undefined" && typeof this.message.duration === "number") {
            setTimeout(function () { return _this.close(null, _this.messageElement.nativeElement); }, this.message.duration);
        }
    };
    MessageComponent.prototype.close = function (event, messageDiv) {
        var _this = this;
        $(messageDiv).transition({
            animation: "fade",
            onComplete: function () { _this.onClose.emit(true); }
        });
    };
    return MessageComponent;
}());
__decorate([
    core_1.ViewChild("messageElement"),
    __metadata("design:type", core_1.ElementRef)
], MessageComponent.prototype, "messageElement", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], MessageComponent.prototype, "type", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], MessageComponent.prototype, "title", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], MessageComponent.prototype, "content", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], MessageComponent.prototype, "statusCode", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], MessageComponent.prototype, "statusMessage", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], MessageComponent.prototype, "endpoint", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], MessageComponent.prototype, "message", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], MessageComponent.prototype, "errors", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], MessageComponent.prototype, "closable", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], MessageComponent.prototype, "stack", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], MessageComponent.prototype, "showStack", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], MessageComponent.prototype, "onClose", void 0);
MessageComponent = __decorate([
    core_1.Component({
        selector: "cp-message",
        templateUrl: "./message.component.html",
        styleUrls: ["./message.component.scss"],
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], MessageComponent);
exports.MessageComponent = MessageComponent;
var Types = (function () {
    function Types() {
    }
    return Types;
}());
Types.NORMAL = "";
Types.INFO = "info";
Types.WARNING = "warning";
Types.POSITIVE = "positive";
Types.SUCCESS = "success";
Types.NEGATIVE = "negative";
Types.ERROR = "error";
exports.Types = Types;
