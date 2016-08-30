System.register(["@angular/core", "./../../app-content/app-content.view", "semantic-ui/semantic", "./configuration.view.html!"], function(exports_1, context_1) {
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
    var core_1, app_content_view_1, configuration_view_html_1;
    var ConfigurationView;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (app_content_view_1_1) {
                app_content_view_1 = app_content_view_1_1;
            },
            function (_1) {},
            function (configuration_view_html_1_1) {
                configuration_view_html_1 = configuration_view_html_1_1;
            }],
        execute: function() {
            ConfigurationView = (function () {
                function ConfigurationView(appContentView) {
                    this.app = appContentView.app;
                }
                ConfigurationView = __decorate([
                    core_1.Component({
                        selector: "cp-configuration-view",
                        template: configuration_view_html_1.default,
                        styles: [":host { display: block; }"],
                    }),
                    __param(0, core_1.Host()),
                    __param(0, core_1.Inject(core_1.forwardRef(function () { return app_content_view_1.AppContentView; }))), 
                    __metadata('design:paramtypes', [app_content_view_1.AppContentView])
                ], ConfigurationView);
                return ConfigurationView;
            }());
            exports_1("ConfigurationView", ConfigurationView);
            exports_1("default",ConfigurationView);
        }
    }
});

//# sourceMappingURL=configuration.view.js.map
