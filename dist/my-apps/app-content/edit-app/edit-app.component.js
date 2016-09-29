System.register(["@angular/core", "carbonldp/Carbon", "carbonldp/HTTP", "carbonldp/RDF/URI", "../../app-context.service", "../app", "semantic-ui/semantic", "./edit-app.component.html!", "./edit-app.component.css!text"], function(exports_1, context_1) {
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
    var core_1, Carbon_1, HTTP, URI, app_context_service_1, App, edit_app_component_html_1, edit_app_component_css_text_1;
    var EditAppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Carbon_1_1) {
                Carbon_1 = Carbon_1_1;
            },
            function (HTTP_1) {
                HTTP = HTTP_1;
            },
            function (URI_1) {
                URI = URI_1;
            },
            function (app_context_service_1_1) {
                app_context_service_1 = app_context_service_1_1;
            },
            function (App_1) {
                App = App_1;
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
                function EditAppComponent(appContextService) {
                    this.submitting = false;
                    this.displaySuccessMessage = false;
                    this.editAppFormModel = {
                        name: "",
                        description: "",
                        allDomains: true,
                        domain: ""
                    };
                    this.allowedDomains = [];
                    this.appContextService = appContextService;
                }
                EditAppComponent.prototype.ngOnInit = function () {
                    var allowAllOrigins = false;
                    if (!!this.app.allowsOrigins && this.app.allowsOrigins.length > 0) {
                        allowAllOrigins = this.app.allowsOrigins[0]["id"] === Carbon_1.default.NS.CS.Class.AllOrigins;
                        if (!allowAllOrigins)
                            this.allowedDomains = this.app.allowsOrigins;
                    }
                    this.editAppFormModel.name = this.app.name;
                    this.editAppFormModel.description = this.app.description;
                    this.editAppFormModel.allDomains = allowAllOrigins;
                };
                EditAppComponent.prototype.addDomain = function (domain) {
                    if (domain.valid && !!domain.value) {
                        this.allowedDomains.push(domain.value);
                    }
                    // this.corsGroup.updateValueAndValidity();
                };
                EditAppComponent.prototype.removeDomain = function (option, allDomains) {
                    var idx = this.allowedDomains.indexOf(option);
                    if (idx >= 0) {
                        this.allowedDomains.splice(idx, 1);
                    }
                };
                EditAppComponent.prototype.canDisplayErrors = function () {
                    // return (! this.name.pristine && ! this.name.valid) || (! this.description.pristine && ! this.description.valid);
                };
                EditAppComponent.prototype.onSubmit = function (form, $event) {
                    var _this = this;
                    $event.preventDefault();
                    this.submitting = true;
                    this.errorMessage = null;
                    var name = form.value.name;
                    var description = form.value.description;
                    var allowsAllOrigins = form.value.allowAllOrigins;
                    var allowedDomains = this.allowedDomains;
                    if (!form.valid || (form.valid && (!allowsAllOrigins && allowedDomains.length === 0))) {
                        this.submitting = false;
                        return;
                    }
                    if (name)
                        this.app.name = name;
                    if (description)
                        this.app.description = description;
                    if (allowsAllOrigins) {
                        this.app.allowsOrigins = [Carbon_1.default.Pointer.Factory.create(Carbon_1.default.NS.CS.Class.AllOrigins)];
                    }
                    else {
                        this.app.allowsOrigins = allowedDomains.length > 0 ? allowedDomains : this.app.allowsOrigins;
                    }
                    this.app.saveAndRefresh().then(function (_a) {
                        var updatedApp = _a[0], response = _a[1];
                        _this.displaySuccessMessage = true;
                        var slug = URI.Util.getSlug(updatedApp.id);
                        return _this.appContextService.updateContext(slug);
                    }).catch(function (error) {
                        _this.errorMessage = {
                            title: error.name,
                            content: _this.getErrorMessage(error),
                            statusCode: "" + error.response.status,
                            statusMessage: error.response.request.statusText,
                            endpoint: error.response.request.responseURL,
                        };
                    }).then(function () {
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
                    }), 
                    __metadata('design:paramtypes', [app_context_service_1.AppContextService])
                ], EditAppComponent);
                return EditAppComponent;
            }());
            exports_1("EditAppComponent", EditAppComponent);
            exports_1("default",EditAppComponent);
        }
    }
});

//# sourceMappingURL=edit-app.component.js.map
