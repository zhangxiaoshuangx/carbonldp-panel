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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("@angular/core");
var services_1 = require("angular2-carbonldp/services");
var HTTP = require("carbonldp/HTTP");
var jquery_1 = require("jquery");
require("semantic-ui/semantic");
var LoginComponent = (function () {
    function LoginComponent(element, authService) {
        this.onLogin = new core_1.EventEmitter();
        this.sending = false;
        this.errorMessage = "";
        this.login = {
            email: "",
            password: "",
            rememberMe: false
        };
        this.element = element;
        this.authService = authService;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.$element = jquery_1.default(this.element.nativeElement);
        this.$loginForm = this.$element.find("form.login");
        this.$loginForm.find(".ui.checkbox").checkbox();
    };
    LoginComponent.prototype.onSubmit = function (data, $event) {
        var _this = this;
        $event.preventDefault();
        this.sending = true;
        this.errorMessage = "";
        var username = data.email;
        var password = data.password;
        var rememberMe = !!data.rememberMe;
        this.authService.login(username, password, rememberMe).then(function (credentials) {
            _this.sending = false;
            _this.onLogin.emit(credentials);
        }).catch(function (error) {
            _this.sending = false;
            _this.setErrorMessage(error);
            _this.shakeForm();
        });
    };
    LoginComponent.prototype.getDays = function (firstDate, lastDate) {
        // Discard the time and time-zone information
        var utc1 = Date.UTC(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate());
        var utc2 = Date.UTC(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate());
        var msPerDay = 1000 * 60 * 60 * 24;
        return Math.floor((utc2 - utc1) / msPerDay);
    };
    LoginComponent.prototype.setErrorMessage = function (error) {
        switch (true) {
            case error instanceof HTTP.Errors.ForbiddenError:
                this.errorMessage = "Denied Access.";
                break;
            case error instanceof HTTP.Errors.UnauthorizedError:
                this.errorMessage = "Wrong credentials.";
                break;
            case error instanceof HTTP.Errors.BadGatewayError:
                this.errorMessage = "An error occurred while trying to login. Please try again later. Error: " + error.response.status;
                break;
            case error instanceof HTTP.Errors.GatewayTimeoutError:
                this.errorMessage = "An error occurred while trying to login. Please try again later. Error: " + error.response.status;
                break;
            case error instanceof HTTP.Errors.InternalServerErrorError:
                this.errorMessage = "An error occurred while trying to login. Please try again later. Error: " + error.response.status;
                break;
            case error instanceof HTTP.Errors.UnknownError:
                this.errorMessage = "An error occurred while trying to login. Please try again later. Error: " + error.response.status;
                break;
            case error instanceof HTTP.Errors.ServiceUnavailableError:
                this.errorMessage = "Service currently unavailable.";
                break;
            default:
                this.errorMessage = "There was a problem processing the request. Error: " + error.response.status;
                break;
        }
    };
    LoginComponent.prototype.shakeForm = function () {
        var target = this.container ? jquery_1.default(this.container) : this.$element;
        if (!target)
            return;
        target.transition({
            animation: "shake",
        });
    };
    __decorate([
        core_1.Input("container"), 
        __metadata('design:type', Object)
    ], LoginComponent.prototype, "container", void 0);
    __decorate([
        core_1.Output("onLogin"), 
        __metadata('design:type', core_1.EventEmitter)
    ], LoginComponent.prototype, "onLogin", void 0);
    LoginComponent = __decorate([
        core_1.Component({
            selector: "cp-login",
            templateUrl: "./login.component.html",
            styles: [":host { display:block; } "],
        }),
        __param(1, core_1.Inject(services_1.AuthService.Token)), 
        __metadata('design:paramtypes', [core_1.ElementRef, Object])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LoginComponent;

//# sourceMappingURL=login.component.js.map
