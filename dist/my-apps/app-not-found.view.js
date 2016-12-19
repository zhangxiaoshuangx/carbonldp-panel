System.register(["@angular/core", "@angular/router", "./app-not-found.view.html!", "./app-not-found.view.css!text"], function(exports_1, context_1) {
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
    var core_1, router_1, app_not_found_view_html_1, app_not_found_view_css_text_1;
    var AppNotFoundView;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (app_not_found_view_html_1_1) {
                app_not_found_view_html_1 = app_not_found_view_html_1_1;
            },
            function (app_not_found_view_css_text_1_1) {
                app_not_found_view_css_text_1 = app_not_found_view_css_text_1_1;
            }],
        execute: function() {
            AppNotFoundView = (function () {
                function AppNotFoundView(router) {
                    this.router = router;
                }
                AppNotFoundView.prototype.ngOnInit = function () {
                    var _this = this;
                    this.timer = 5;
                    var countDown = setInterval(function () {
                        _this.timer--;
                        if (_this.timer === 0) {
                            _this.router.navigate(["/my-apps"]);
                            clearInterval(countDown);
                            return false;
                        }
                    }, 1000);
                };
                AppNotFoundView = __decorate([
                    core_1.Component({
                        selector: "cp-app-content",
                        template: app_not_found_view_html_1.default,
                        styles: [app_not_found_view_css_text_1.default],
                    }), 
                    __metadata('design:paramtypes', [router_1.Router])
                ], AppNotFoundView);
                return AppNotFoundView;
            }());
            exports_1("AppNotFoundView", AppNotFoundView);
        }
    }
});

//# sourceMappingURL=app-not-found.view.js.map
