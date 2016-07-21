System.register(["@angular/core", "carbon-panel/my-apps/app-content/app-content.view", "carbon-panel/errors-area/errors-area.service", "carbon-panel/sparql-client/sparql-client.component", "semantic-ui/semantic", "./sparql-client.view.html!"], function(exports_1, context_1) {
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
    var core_1, app_content_view_1, errors_area_service_1, sparql_client_component_1, sparql_client_view_html_1;
    var SPARQLClientView;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (app_content_view_1_1) {
                app_content_view_1 = app_content_view_1_1;
            },
            function (errors_area_service_1_1) {
                errors_area_service_1 = errors_area_service_1_1;
            },
            function (sparql_client_component_1_1) {
                sparql_client_component_1 = sparql_client_component_1_1;
            },
            function (_1) {},
            function (sparql_client_view_html_1_1) {
                sparql_client_view_html_1 = sparql_client_view_html_1_1;
            }],
        execute: function() {
            SPARQLClientView = (function () {
                function SPARQLClientView(errorsAreaService, appContent) {
                    this.appContext = appContent.app.context;
                    this.errorsAreaService = errorsAreaService;
                }
                SPARQLClientView.prototype.notifyErrorAreaService = function (error) {
                    this.errorsAreaService.addError(error.title, error.content, error.statusCode, error.statusMessage, error.endpoint);
                };
                SPARQLClientView = __decorate([
                    core_1.Component({
                        selector: "cp-sparql-client-view",
                        template: sparql_client_view_html_1.default,
                        styles: [":host { display: block; }"],
                        directives: [sparql_client_component_1.SPARQLClientComponent],
                    }),
                    __param(1, core_1.Host()),
                    __param(1, core_1.Inject(core_1.forwardRef(function () { return app_content_view_1.AppContentView; }))), 
                    __metadata('design:paramtypes', [errors_area_service_1.ErrorsAreaService, app_content_view_1.AppContentView])
                ], SPARQLClientView);
                return SPARQLClientView;
            }());
            exports_1("SPARQLClientView", SPARQLClientView);
            exports_1("default",SPARQLClientView);
        }
    }
});

//# sourceMappingURL=sparql-client.view.js.map
