System.register(["@angular/core", "@angular/common", "carbonldp/Carbon", "carbonldp/HTTP", "../app", "../../../errors-area/error-message.component", "semantic-ui/semantic", "./edit-app.component.html!", "./edit-app.component.css!text"], function(exports_1, context_1) {
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
    var core_1, common_1, Carbon_1, HTTP, App, error_message_component_1, edit_app_component_html_1, edit_app_component_css_text_1;
    var EditAppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (Carbon_1_1) {
                Carbon_1 = Carbon_1_1;
            },
            function (HTTP_1) {
                HTTP = HTTP_1;
            },
            function (App_1) {
                App = App_1;
            },
            function (error_message_component_1_1) {
                error_message_component_1 = error_message_component_1_1;
            },
            function (_1) {},
            function (edit_app_component_html_1_1) {
                edit_app_component_html_1 = edit_app_component_html_1_1;
            },
            function (edit_app_component_css_text_1_1) {
                edit_app_component_css_text_1 = edit_app_component_css_text_1_1;
            }],
        execute: function() {
            EditAppComponent = (function () {
                function EditAppComponent(formBuilder) {
                    this.submitting = false;
                    this.displaySuccessMessage = false;
                    this.allowedDomains = [];
                    this.domainStr = "";
                    this.formBuilder = formBuilder;
                }
                EditAppComponent.prototype.ngOnInit = function () {
                    var allowAllOrigins = false;
                    if (!!this.app.allowsOrigins && this.app.allowsOrigins.length > 0) {
                        allowAllOrigins = this.app.allowsOrigins[0]["id"] === Carbon_1.default.NS.CS.Class.AllOrigins;
                        if (!allowAllOrigins)
                            this.allowedDomains = this.app.allowsOrigins;
                    }
                    this.editAppForm = this.formBuilder.group({
                        name: [this.app.name, common_1.Validators.compose([common_1.Validators.required])],
                        description: [this.app.description, common_1.Validators.compose([common_1.Validators.required])],
                        cors: this.formBuilder.group({
                            allDomains: [allowAllOrigins],
                            domain: [this.domainStr],
                            allowedDomains: [this.allowedDomains],
                        }, { validator: common_1.Validators.compose([this.domainValidator, this.allowedDomainsValidator]) }),
                    });
                    this.name = this.editAppForm.controls["name"];
                    this.description = this.editAppForm.controls["description"];
                    this.corsGroup = this.editAppForm.controls["cors"];
                    this.allDomains = this.corsGroup.controls["allDomains"];
                    this.domain = this.corsGroup.controls["domain"];
                };
                EditAppComponent.prototype.domainValidator = function (corsGroup) {
                    var allDomains = corsGroup.controls["allDomains"];
                    var domain = corsGroup.controls["domain"];
                    if (allDomains.value || (!allDomains.value && !!domain.value && !!domain.value.match(/^http(s?):\/\/((\w+\.)?\w+\.\w+|((2[0-5]{2}|1[0-9]{2}|[0-9]{1,2})\.){3}(2[0-5]{2}|1[0-9]{2}|[0-9]{1,2}))(\/)?$/gm))) {
                        return null;
                    }
                    if (!!domain.value) {
                        return { "invalidURLAddress": true };
                    }
                };
                EditAppComponent.prototype.allowedDomainsValidator = function (corsGroup) {
                    if (!corsGroup.value["allDomains"] && corsGroup.value["allowedDomains"].length <= 0) {
                        return { "emptyAllowedAddresses": true };
                    }
                    return null;
                };
                EditAppComponent.prototype.addDomain = function (domain) {
                    if (this.domain.valid && !!domain)
                        this.allowedDomains.push(domain);
                    this.corsGroup.updateValueAndValidity();
                };
                EditAppComponent.prototype.removeDomain = function (option) {
                    var idx = this.allowedDomains.indexOf(option);
                    if (idx >= 0) {
                        this.allowedDomains.splice(idx, 1);
                        this.corsGroup.updateValueAndValidity();
                    }
                };
                EditAppComponent.prototype.canDisplayErrors = function () {
                    return (!this.name.pristine && !this.name.valid) || (!this.description.pristine && !this.description.valid);
                };
                EditAppComponent.prototype.onSubmit = function (data, $event) {
                    var _this = this;
                    $event.preventDefault();
                    this.submitting = true;
                    this.errorMessage = null;
                    this.name.markAsDirty(true);
                    this.description.markAsDirty(true);
                    if (!this.editAppForm.valid) {
                        this.submitting = false;
                        return;
                    }
                    var name = data.name;
                    var description = data.description;
                    var allowsAllOrigin = data.cors.allDomains;
                    var allowedDomains = data.cors.allowedDomains;
                    if (name)
                        this.app.name = name;
                    if (description)
                        this.app.description = description;
                    if (allowsAllOrigin) {
                        this.app.allowsOrigins = [Carbon_1.default.Pointer.Factory.create(Carbon_1.default.NS.CS.Class.AllOrigins)];
                    }
                    else {
                        this.app.allowsOrigins = allowedDomains.length > 0 ? allowedDomains : this.app.allowsOrigins;
                    }
                    this.app.save().then(function (_a) {
                        var updatedApp = _a[0], response = _a[1];
                        _this.displaySuccessMessage = true;
                        return _this.app.refresh();
                    }).catch(function (error) {
                        _this.errorMessage = {
                            title: error.name,
                            content: _this.getErrorMessage(error),
                            statusCode: "" + error.response.status,
                            statusMessage: error.response.request.statusText,
                            endpoint: error.response.request.responseURL,
                        };
                    }).then(function (_a) {
                        var updatedApp = _a[0], response = _a[1];
                        _this.submitting = false;
                    });
                };
                EditAppComponent.prototype.getErrorMessage = function (error) {
                    var tempMessage = "";
                    switch (true) {
                        case error instanceof HTTP.Errors.BadRequestError:
                            tempMessage = "";
                            break;
                        case error instanceof HTTP.Errors.ConflictError:
                            tempMessage = "There's already a resource with that slug. Error:" + error.response.status;
                            break;
                        case error instanceof HTTP.Errors.ForbiddenError:
                            tempMessage = "Forbidden Action.";
                            break;
                        case error instanceof HTTP.Errors.NotFoundError:
                            tempMessage = "Couldn't found the requested URL.";
                            break;
                        case error instanceof HTTP.Errors.RequestEntityTooLargeError:
                            tempMessage = "Request entity too large.";
                            break;
                        case error instanceof HTTP.Errors.UnauthorizedError:
                            tempMessage = "Unauthorized operation.";
                            break;
                        case error instanceof HTTP.Errors.InternalServerErrorError:
                            tempMessage = "An internal error occurred while trying to update the app. Please try again later. Error: " + error.response.status;
                            break;
                        case error instanceof HTTP.Errors.ServiceUnavailableError:
                            tempMessage = "Service currently unavailable.";
                            break;
                        case error instanceof HTTP.Errors.UnknownError:
                            tempMessage = "An error occurred while trying to update the app. Please try again later. Error: " + error.response.status;
                            break;
                        default:
                            tempMessage = "There was a problem processing the request. Error: " + error.response.status;
                            break;
                    }
                    return tempMessage;
                };
                EditAppComponent.prototype.clearMessages = function (evt) {
                    this.displaySuccessMessage = false;
                    this.errorMessage = null;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], EditAppComponent.prototype, "app", void 0);
                EditAppComponent = __decorate([
                    core_1.Component({
                        selector: "cp-edit-app",
                        template: edit_app_component_html_1.default,
                        styles: [edit_app_component_css_text_1.default],
                        directives: [error_message_component_1.ErrorMessageComponent],
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder])
                ], EditAppComponent);
                return EditAppComponent;
            }());
            exports_1("EditAppComponent", EditAppComponent);
            exports_1("default",EditAppComponent);
        }
    }
});

//# sourceMappingURL=edit-app.component.js.map
