System.register(["@angular/core", "./../../app-content/app-content.view", "semantic-ui/semantic", "./edit-app.view.html!"], function(exports_1, context_1) {
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
    var core_1, app_content_view_1, edit_app_view_html_1;
    var EditAppView;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (app_content_view_1_1) {
                app_content_view_1 = app_content_view_1_1;
            },
            function (_1) {},
            function (edit_app_view_html_1_1) {
                edit_app_view_html_1 = edit_app_view_html_1_1;
            }],
        execute: function() {
            EditAppView = (function () {
                function EditAppView(appContentView) {
                    this.app = appContentView.app;
                }
                EditAppView = __decorate([
                    core_1.Component({
                        selector: "cp-edit-app-view",
                        template: edit_app_view_html_1.default,
                        styles: [":host { display: block; }"],
                    }),
                    __param(0, core_1.Host()),
                    __param(0, core_1.Inject(core_1.forwardRef(function () { return app_content_view_1.AppContentView; }))), 
                    __metadata('design:paramtypes', [app_content_view_1.AppContentView])
                ], EditAppView);
                return EditAppView;
            }());
            exports_1("EditAppView", EditAppView);
            exports_1("default",EditAppView);
        }
    }
});

//# sourceMappingURL=edit-app.view.js.map
