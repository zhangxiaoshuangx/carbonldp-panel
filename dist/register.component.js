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
var HTTP = require("carbonldp/HTTP");
var services_1 = require("angular2-carbonldp/services");
var $ = require("jquery");
require("semantic-ui/semantic");
var RegisterComponent = (function () {
    function RegisterComponent(element, authService) {
        this.onRegister = new core_1.EventEmitter();
        this.sending = false;
        this.register = {
            name: "",
            email: "",
            password: "",
            repeatPassword: "",
            profileId: ""
        };
        this.errorMessage = "";
        this.element = element;
        this.authService = authService;
    }
    RegisterComponent.prototype.ngOnInit = function () {
        this.$element = $(this.element.nativeElement);
    };
    RegisterComponent.prototype.onSubmit = function (form, $event) {
        var _this = this;
        $event.preventDefault();
        this.sending = true;
        this.errorMessage = "";
        if (!form.valid) {
            this.shakeForm();
            this.sending = false;
            return;
        }
        var name = form.controls.name.value;
        var username = form.controls.email.value;
        var password = form.controls.password.value;
        var profileId = form.controls.profileId.value;
        if (!profileId)
            profileId = void 0;
        this.authService.register(name, username, password, profileId).then(function () {
            _this.sending = false;
            _this.onRegister.emit(null);
        }).catch(function (error) {
            _this.sending = false;
            _this.setErrorMessage(error);
        });
    };
    RegisterComponent.prototype.sanitize = function (evt) {
        if (typeof evt.target !== "undefined") {
            var slug = evt.target.value;
            if (slug) {
                slug = slug.toLowerCase().replace(/ - | -|- /g, "-").replace(/[^-\w ]+/g, "").replace(/ +/g, "-");
                if (slug.charAt(slug.length - 1) !== "/")
                    slug += "/";
                this.register.profileId = slug;
            }
        }
    };
    RegisterComponent.prototype.shakeForm = function () {
        var target = this.$element;
        target.transition({
            animation: "shake",
        });
    };
    RegisterComponent.prototype.setErrorMessage = function (error) {
        if (typeof error.message !== "undefined")
            this.errorMessage = error.message;
        else
            switch (true) {
                case error instanceof HTTP.Errors.ConflictError:
                    this.errorMessage = "That email is already in use";
                    break;
                case error instanceof HTTP.Errors.ForbiddenError:
                    this.errorMessage = "Denied Access";
                    break;
                case error instanceof HTTP.Errors.UnauthorizedError:
                    this.errorMessage = "Wrong credentials";
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
                    this.errorMessage = "Service currently unavailable";
                    break;
                default:
                    if ("response" in error) {
                        this.errorMessage = "There was a problem processing the request. Error: " + error.response.status;
                    }
                    else {
                        this.errorMessage = "There was a problem processing the request";
                        console.error(error);
                    }
                    break;
            }
    };
    __decorate([
        core_1.Output("onRegister"), 
        __metadata('design:type', core_1.EventEmitter)
    ], RegisterComponent.prototype, "onRegister", void 0);
    RegisterComponent = __decorate([
        core_1.Component({
            selector: "cp-register",
            templateUrl: "./register.component.html",
            styles: [],
        }),
        __param(1, core_1.Inject(services_1.AuthService.Token)), 
        __metadata('design:paramtypes', [core_1.ElementRef, Object])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RegisterComponent;

//# sourceMappingURL=register.component.js.map
