System.register(["@angular/core", "@angular/common/src/forms-deprecated", "carbonldp/HTTP", "angular2-carbonldp/services", "carbon-panel/custom-validators", "jquery", "semantic-ui/semantic", "./register.component.html!"], function(exports_1, context_1) {
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
    var core_1, forms_deprecated_1, HTTP, services_1, custom_validators_1, jquery_1, register_component_html_1;
    var RegisterComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forms_deprecated_1_1) {
                forms_deprecated_1 = forms_deprecated_1_1;
            },
            function (HTTP_1) {
                HTTP = HTTP_1;
            },
            function (services_1_1) {
                services_1 = services_1_1;
            },
            function (custom_validators_1_1) {
                custom_validators_1 = custom_validators_1_1;
            },
            function (jquery_1_1) {
                jquery_1 = jquery_1_1;
            },
            function (_1) {},
            function (register_component_html_1_1) {
                register_component_html_1 = register_component_html_1_1;
            }],
        execute: function() {
            RegisterComponent = (function () {
                function RegisterComponent(element, formBuilder, authService) {
                    this.onRegister = new core_1.EventEmitter();
                    this.sending = false;
                    this.controls = {};
                    this.errorMessage = "";
                    this.element = element;
                    this.formBuilder = formBuilder;
                    this.authService = authService;
                }
                RegisterComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.$element = jquery_1.default(this.element.nativeElement);
                    this.registerForm = this.formBuilder.group({
                        name: ["", forms_deprecated_1.Validators.compose([forms_deprecated_1.Validators.required])],
                        email: ["", forms_deprecated_1.Validators.compose([forms_deprecated_1.Validators.required, custom_validators_1.EmailValidator])],
                        password: ["", forms_deprecated_1.Validators.compose([forms_deprecated_1.Validators.required])],
                        profileId: ["", forms_deprecated_1.Validators.compose([])],
                    });
                    this.controls.name = this.registerForm.controls["name"];
                    this.controls.email = this.registerForm.controls["email"];
                    this.controls.password = this.registerForm.controls["password"];
                    this.controls.profileId = this.registerForm.controls["profileId"];
                    this.controls.repeatPassword = this.formBuilder.control("", forms_deprecated_1.Validators.compose([forms_deprecated_1.Validators.required, custom_validators_1.SameAsValidator(this.controls.password)]));
                    this.registerForm.addControl("repeatPassword", this.controls.repeatPassword);
                    var valueCopy = "";
                    this.controls.profileId.valueChanges.subscribe(function (value) {
                        valueCopy = _this.getSanitizedSlug(value);
                        if (value !== valueCopy)
                            _this.controls.profileId.updateValue(valueCopy);
                    });
                };
                RegisterComponent.prototype.onSubmit = function (data, $event) {
                    var _this = this;
                    $event.preventDefault();
                    this.sending = true;
                    this.errorMessage = "";
                    this.touchControls();
                    if (!this.registerForm.valid) {
                        this.shakeForm();
                        this.sending = false;
                        return;
                    }
                    var name = data.name;
                    var username = data.email;
                    var password = data.password;
                    var profileId = data.profileId;
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
                RegisterComponent.prototype.getSanitizedSlug = function (slug) {
                    return slug.toLowerCase().replace(/ - | -|- /g, "-").replace(/[^-\w ]+/g, "").replace(/ +/g, "-");
                };
                RegisterComponent.prototype.touchControls = function () {
                    for (var controlName in this.controls) {
                        if (!this.controls.hasOwnProperty(controlName))
                            continue;
                        var control = this.controls[controlName];
                        control.markAsTouched();
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
                        template: register_component_html_1.default,
                        styles: [],
                    }),
                    __param(2, core_1.Inject(services_1.AuthService.Token)), 
                    __metadata('design:paramtypes', [core_1.ElementRef, forms_deprecated_1.FormBuilder, Object])
                ], RegisterComponent);
                return RegisterComponent;
            }());
            exports_1("RegisterComponent", RegisterComponent);
            exports_1("default",RegisterComponent);
        }
    }
});

//# sourceMappingURL=register.component.js.map
