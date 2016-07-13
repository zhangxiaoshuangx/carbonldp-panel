System.register(["@angular/core", "@angular/common", "angular2-carbonldp/services", "carbonldp/HTTP", "carbon-panel/custom-validators", "jquery", "semantic-ui/semantic", "./login.component.html!"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
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
    var core_1, common_1, services_1, HTTP, custom_validators_1, jquery_1, login_component_html_1;
    var LoginComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (services_1_1) {
                services_1 = services_1_1;
            },
            function (HTTP_1) {
                HTTP = HTTP_1;
            },
            function (custom_validators_1_1) {
                custom_validators_1 = custom_validators_1_1;
            },
            function (jquery_1_1) {
                jquery_1 = jquery_1_1;
            },
            function (_1) {},
            function (login_component_html_1_1) {
                login_component_html_1 = login_component_html_1_1;
            }],
        execute: function() {
            LoginComponent = (function () {
                function LoginComponent(element, formBuilder, authService) {
                    this.onLogin = new core_1.EventEmitter();
                    this.sending = false;
                    this.errorMessage = "";
                    this.remember = true;
                    this.element = element;
                    this.formBuilder = formBuilder;
                    this.authService = authService;
                }
                LoginComponent.prototype.ngOnInit = function () {
                    this.$element = jquery_1.default(this.element.nativeElement);
                    this.$loginForm = this.$element.find("form.loginForm");
                    this.$loginForm.find(".ui.checkbox").checkbox();
                    this.loginForm = this.formBuilder.group({
                        email: ["", common_1.Validators.compose([common_1.Validators.required, custom_validators_1.EmailValidator])],
                        password: ["", common_1.Validators.compose([common_1.Validators.required])],
                        rememberMe: ["", common_1.Validators.compose([])],
                    });
                    this.email = this.loginForm.controls["email"];
                    this.password = this.loginForm.controls["password"];
                    this.rememberMe = this.loginForm.controls["rememberMe"];
                };
                LoginComponent.prototype.onSubmit = function (data, $event) {
                    var _this = this;
                    $event.preventDefault();
                    this.sending = true;
                    this.errorMessage = "";
                    this.email.markAsTouched();
                    this.password.markAsTouched();
                    if (!this.loginForm.valid) {
                        this.shakeForm();
                        this.sending = false;
                        return;
                    }
                    var username = data.email;
                    var password = data.password;
                    var rememberMe = !!data.rememberMe;
                    this.authService.login(username, password, rememberMe).then(function (credentials) {
                        _this.sending = false;
                        _this.onLogin.emit(credentials);
                    }).catch(function (error) {
                        _this.sending = false;
                        _this.setErrorMessage(error);
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
                        template: login_component_html_1.default,
                        styles: [":host { display:block; } "],
                        directives: [common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES],
                    }),
                    __param(2, core_1.Inject(services_1.AuthService.Token)), 
                    __metadata('design:paramtypes', [core_1.ElementRef, common_1.FormBuilder, Object])
                ], LoginComponent);
                return LoginComponent;
            }());
            exports_1("LoginComponent", LoginComponent);
            exports_1("default",LoginComponent);
        }
    }
});

//# sourceMappingURL=login.component.js.map
