System.register(["@angular/core", "@angular/router", "rxjs/Rx", "carbonldp/Carbon", "carbonldp/HTTP", "./../my-apps-sidebar.service", "./../app-content/app", "./../app-context.service", "jquery", "semantic-ui/semantic", "./apps-catalog.component.html!"], function(exports_1, context_1) {
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
    var core_1, router_1, Rx_1, Carbon_1, HTTP, my_apps_sidebar_service_1, App, app_context_service_1, jquery_1, apps_catalog_component_html_1;
    var AppsCatalogComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            },
            function (Carbon_1_1) {
                Carbon_1 = Carbon_1_1;
            },
            function (HTTP_1) {
                HTTP = HTTP_1;
            },
            function (my_apps_sidebar_service_1_1) {
                my_apps_sidebar_service_1 = my_apps_sidebar_service_1_1;
            },
            function (App_1) {
                App = App_1;
            },
            function (app_context_service_1_1) {
                app_context_service_1 = app_context_service_1_1;
            },
            function (jquery_1_1) {
                jquery_1 = jquery_1_1;
            },
            function (_1) {},
            function (apps_catalog_component_html_1_1) {
                apps_catalog_component_html_1 = apps_catalog_component_html_1_1;
            }],
        execute: function() {
            AppsCatalogComponent = (function () {
                function AppsCatalogComponent(element, router, appContextService, carbon, myAppsSidebarService) {
                    this.apps = [];
                    this.results = [];
                    this.loading = false;
                    this.tileView = false;
                    this.errorMessage = "";
                    this.warningMessage = "";
                    this.deleting = false;
                    this.element = element;
                    this.appContextService = appContextService;
                    this.router = router;
                    this.carbon = carbon;
                    this.myAppsSidebarService = myAppsSidebarService;
                }
                AppsCatalogComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.$element = jquery_1.default(this.element.nativeElement);
                    this.deleteAppConfirmationModal = this.$element.find(".delete-app-confirmation.modal");
                    this.searchBox = this.$element.find("input.search");
                    var terms = Rx_1.Observable.fromEvent(this.searchBox, "input");
                    terms
                        .debounceTime(200)
                        .map(function (evt) {
                        return evt.target.value;
                    })
                        .distinctUntilChanged()
                        .subscribe(function (args) {
                        _this.searchApp(args);
                    });
                    this.fetchApps();
                    this.initializeModal();
                };
                AppsCatalogComponent.prototype.activateGridView = function () {
                    this.tileView = true;
                };
                AppsCatalogComponent.prototype.activateListView = function () {
                    this.tileView = false;
                };
                AppsCatalogComponent.prototype.searchApp = function (term) {
                    this.results = this.apps.filter(function (app) {
                        return app.name.toLowerCase().search(term.toLowerCase()) > -1 || app.slug.toLowerCase().search(term.toLowerCase()) > -1;
                    });
                    this.errorMessage = "";
                    if (this.results.length === 0 && term.length > 0) {
                        this.errorMessage = "No apps found.";
                    }
                };
                AppsCatalogComponent.prototype.askConfirmationToDeleteApp = function (selectedApp) {
                    this.askingApp = selectedApp;
                    this.toggleDeleteConfirmationModal();
                };
                AppsCatalogComponent.prototype.toggleDeleteConfirmationModal = function () {
                    this.deleteAppConfirmationModal.modal("toggle");
                    this.deleteError = null;
                };
                AppsCatalogComponent.prototype.onApproveAppDeletion = function (approvedApp) {
                    var _this = this;
                    if (this.deleting)
                        return;
                    this.deleting = true;
                    this.deleteError = null;
                    this.deleteApp(approvedApp).then(function (response) {
                        _this.toggleDeleteConfirmationModal();
                        _this.apps.splice(_this.apps.indexOf(approvedApp), 1);
                        _this.loadApps();
                    }).catch(function (error) {
                        _this.deleteError = _this.getErrorMessage(error);
                    }).then(function () {
                        _this.deleting = false;
                        _this.searchApp(_this.searchBox.val());
                    });
                };
                AppsCatalogComponent.prototype.openApp = function (app) {
                    this.myAppsSidebarService.addApp(app);
                    //TODO: fix routes
                    this.router.navigate(["App", { slug: app.slug }, "AppDashboard"]);
                };
                AppsCatalogComponent.prototype.deleteApp = function (app) {
                    return app.delete();
                };
                AppsCatalogComponent.prototype.getErrorMessage = function (error) {
                    var content = "";
                    switch (true) {
                        case error instanceof HTTP.Errors.ForbiddenError:
                            content = "Denied Access.";
                            break;
                        case error instanceof HTTP.Errors.UnauthorizedError:
                            content = "No access to the requested resource(s).";
                            break;
                        case error instanceof HTTP.Errors.BadGatewayError:
                            content = "An error occurred while trying to fetch apps. Please try again later. Error: " + error.response.status;
                            break;
                        case error instanceof HTTP.Errors.GatewayTimeoutError:
                            content = "An error occurred while trying to fetch apps. Please try again later. Error: " + error.response.status;
                            break;
                        case error instanceof HTTP.Errors.InternalServerErrorError:
                            content = "An error occurred while trying to fetch apps. Please try again later. Error: " + error.response.status;
                            break;
                        case error instanceof HTTP.Errors.UnknownError:
                            content = "An error occurred while trying to fetch apps. Please try again later. Error: " + error.response.status;
                            break;
                        case error instanceof HTTP.Errors.ServiceUnavailableError:
                            content = "Service currently unavailable.";
                            break;
                        default:
                            content = "There was a problem processing the request. Error: " + error.response.status;
                            break;
                    }
                    return {
                        title: error.name,
                        content: !!error.message ? error.message : content,
                        statusCode: "" + error.response.status,
                        statusMessage: error.response.request.statusText,
                        endpoint: "",
                    };
                };
                AppsCatalogComponent.prototype.closeErrorMessage = function (evt) {
                    jquery_1.default(evt.srcElement).closest(".ui.message").transition("fade");
                    this.deleteError = null;
                };
                AppsCatalogComponent.prototype.initializeModal = function () {
                    this.deleteAppConfirmationModal.modal({
                        closable: false,
                        blurring: true,
                        onApprove: function () { return false; },
                    });
                };
                AppsCatalogComponent.prototype.refreshApps = function () {
                    this.fetchApps();
                };
                AppsCatalogComponent.prototype.fetchApps = function () {
                    var _this = this;
                    this.loading = true;
                    this.loadApps().then(function (apps) {
                        _this.results = apps;
                        _this.loading = false;
                        if (_this.apps.length === 0)
                            _this.warningMessage = "There are currently no apps to show.";
                    }).catch(function (error) {
                        _this.errorMessage = _this.getErrorMessage(error).content;
                        _this.loading = false;
                    });
                };
                AppsCatalogComponent.prototype.loadApps = function () {
                    var _this = this;
                    return this.appContextService.getAll().then(function (appContexts) {
                        _this.apps = appContexts.map(App.Factory.createFrom);
                        return _this.apps;
                    });
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], AppsCatalogComponent.prototype, "apps", void 0);
                AppsCatalogComponent = __decorate([
                    core_1.Component({
                        selector: "cp-apps-catalog",
                        template: apps_catalog_component_html_1.default,
                        styles: [":host { display: block; }"],
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, router_1.Router, app_context_service_1.AppContextService, Carbon_1.default, my_apps_sidebar_service_1.MyAppsSidebarService])
                ], AppsCatalogComponent);
                return AppsCatalogComponent;
            }());
            exports_1("AppsCatalogComponent", AppsCatalogComponent);
            exports_1("default",AppsCatalogComponent);
        }
    }
});

//# sourceMappingURL=apps-catalog.component.js.map
