System.register(["@angular/core", "carbonldp/Carbon", "carbonldp/App", "carbonldp/HTTP", "carbonldp/NS/CS", "./../app-context.service", "semantic-ui/semantic", "./create-app.component.html!"], function(exports_1, context_1) {
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
    var core_1, Carbon_1, CarbonApp, HTTP, CS, app_context_service_1, create_app_component_html_1;
    var CreateAppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Carbon_1_1) {
                Carbon_1 = Carbon_1_1;
            },
            function (CarbonApp_1) {
                CarbonApp = CarbonApp_1;
            },
            function (HTTP_1) {
                HTTP = HTTP_1;
            },
            function (CS_1) {
                CS = CS_1;
            },
            function (app_context_service_1_1) {
                app_context_service_1 = app_context_service_1_1;
            },
            function (_1) {},
            function (create_app_component_html_1_1) {
                create_app_component_html_1 = create_app_component_html_1_1;
            }],
        execute: function() {
            CreateAppComponent = (function () {
                function CreateAppComponent(carbon, appContextService) {
                    this.submitting = false;
                    this.displaySuccessMessage = false;
                    this.displayWarningMessage = false;
                    this._name = "";
                    this._slug = "";
                    this.persistedSlug = "";
                    this.persistedName = "";
                    // createAppForm:ControlGroup;
                    // formBuilder:FormBuilder;
                    // name:AbstractControl;
                    // slug:AbstractControl;
                    // description:AbstractControl;
                    this.createAppFormModel = {
                        name: "",
                        slug: "",
                        description: ""
                    };
                    this.carbon = carbon;
                    this.appContextService = appContextService;
                }
                CreateAppComponent.prototype.ngOnInit = function () {
                    this.slugInput = $("form > :input[name='slug']");
                };
                CreateAppComponent.prototype.slugLostControl = function (evt) {
                    if (typeof (evt.target) !== "undefined") {
                        if (!evt.target.value.match(/^[a-z0-9]+(?:-[a-z0-9]*)*(?:\/*)$/)) {
                            this.getSanitizedSlug(evt);
                        }
                    }
                };
                CreateAppComponent.prototype.getSanitizedSlug = function (evt) {
                    var slug;
                    if (typeof evt.target !== "undefined") {
                        slug = evt.target.value;
                        if (slug) {
                            slug = slug.toLowerCase().replace(/ - | -|- /g, "-").replace(/[^-\w ]+/g, "").replace(/ +/g, "-");
                            if (slug.charAt(slug.length - 1) !== "/")
                                slug += "/";
                            this.createAppFormModel.slug = slug;
                        }
                    }
                };
                CreateAppComponent.prototype.onSubmit = function (form, $event) {
                    $event.preventDefault();
                    this.submitting = true;
                    this.errorMessage = null;
                    this.displaySuccessMessage = false;
                    this.displayWarningMessage = false;
                    if (!form.valid) {
                        this.submitting = false;
                        return;
                    }
                    var name = form.value.name;
                    var slug = form.value.slug;
                    var description = form.value.description;
                    var appDocument = CarbonApp.Factory.create(name);
                    appDocument.description = description;
                    appDocument.allowsOrigins = [Carbon_1.default.Pointer.Factory.create(Carbon_1.default.NS.CS.Class.AllOrigins)];
                    this.createApp(slug, appDocument);
                };
                CreateAppComponent.prototype.createApp = function (slug, appDocument) {
                    var _this = this;
                    return this.carbon.apps.create(appDocument, slug).then(function (_a) {
                        var appPointer = _a[0], appCreationResponse = _a[1];
                        _this.submitting = false;
                        _this.persistedSlug = _this._slug;
                        _this.persistedName = _this._name;
                        return _this.carbon.apps.getContext(appPointer);
                    }).then(function (appContext) {
                        _this.persistedSlug = _this.appContextService.getSlug(appContext);
                        _this.persistedName = appContext.app.name;
                        var persistedAppDocument = appContext.app;
                        return persistedAppDocument.getACL();
                    }).then(function (_a) {
                        var acl = _a[0], response = _a[1];
                        return _this.grantAccess(acl);
                    }).catch(function (error) {
                        console.error(error);
                        if (error.response)
                            _this.errorMessage = _this.getHTTPErrorMessage(error, _this.getErrorMessage(error));
                        else {
                            _this.errorMessage = {
                                title: error.name,
                                content: JSON.stringify(error)
                            };
                        }
                        _this.submitting = false;
                    });
                };
                CreateAppComponent.prototype.grantAccess = function (acl) {
                    var _this = this;
                    var subject = this.carbon.resolve("roles/anonymous/"), subjectClass = CS.namespace + "PlatformRole", permissions = [CS.namespace + "Read"];
                    acl.grant(subject, subjectClass, permissions);
                    return acl.saveAndRefresh().then(function () {
                        _this.displaySuccessMessage = true;
                    }).catch(function (error) {
                        _this.displayWarningMessage = true;
                    }).then(function () {
                        return acl;
                    });
                };
                CreateAppComponent.prototype.getHTTPErrorMessage = function (error, content) {
                    return {
                        title: error.name,
                        content: content + (!!error.message ? (" Reason: " + error.message) : ""),
                        endpoint: error.response.request.responseURL,
                        statusCode: "" + error.response.request.status + " - RequestID: " + error.requestID,
                        statusMessage: error.response.request.statusText
                    };
                };
                CreateAppComponent.prototype.getErrorMessage = function (error) {
                    var friendlyMessage = "";
                    switch (true) {
                        case error instanceof HTTP.Errors.BadRequestError:
                            friendlyMessage = "";
                            break;
                        case error instanceof HTTP.Errors.ConflictError:
                            friendlyMessage = "There's already a resource with that slug. Error:" + error.response.status;
                            break;
                        case error instanceof HTTP.Errors.ForbiddenError:
                            friendlyMessage = "Forbidden Action.";
                            break;
                        case error instanceof HTTP.Errors.NotFoundError:
                            friendlyMessage = "Couldn't found the requested URL.";
                            break;
                        case error instanceof HTTP.Errors.RequestEntityTooLargeError:
                            friendlyMessage = "Request entity too large.";
                            break;
                        case error instanceof HTTP.Errors.UnauthorizedError:
                            friendlyMessage = "Unauthorized operation.";
                            break;
                        case error instanceof HTTP.Errors.InternalServerErrorError:
                            friendlyMessage = "An error occurred while trying to create the app. Please try again later. Error: " + error.response.status;
                            break;
                        case error instanceof HTTP.Errors.ServiceUnavailableError:
                            friendlyMessage = "Service currently unavailable.";
                            break;
                        case error instanceof HTTP.Errors.UnknownError:
                            friendlyMessage = "An error occurred while trying to create the app. Please try again later. Error: " + error.response.status;
                            break;
                        default:
                            friendlyMessage = "There was a problem processing the request. Error: " + error.response.status;
                            break;
                    }
                    return friendlyMessage;
                };
                CreateAppComponent.prototype.clearMessages = function (evt) {
                    this.displaySuccessMessage = false;
                    this.displayWarningMessage = false;
                    this.errorMessage = null;
                };
                CreateAppComponent = __decorate([
                    core_1.Component({
                        selector: "cp-create-app",
                        template: create_app_component_html_1.default,
                        styles: [":host { display: block; }"],
                    }), 
                    __metadata('design:paramtypes', [Carbon_1.default, app_context_service_1.AppContextService])
                ], CreateAppComponent);
                return CreateAppComponent;
            }());
            exports_1("CreateAppComponent", CreateAppComponent);
            exports_1("default",CreateAppComponent);
        }
    }
});

//# sourceMappingURL=create-app.component.js.map
